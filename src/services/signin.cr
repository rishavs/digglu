module Digglu

     def self.signin(ctx : HTTP::Server::Context)
        begin

            payload = User_signx_model.from_json(ctx.request.body.not_nil!.gets_to_end)

            # Cleanup data
            email        = payload.email.downcase
            rawpassword  = payload.password
            
            # Validate data
            if !validate_as_email(email) || 
                !validate_as_password(rawpassword)
                raise Exception.new("Input data validation failed")
            end

            # Get the password for the comparison
            query1 = "select unqid, email, password, nick, flair, thumb, role, level, stars,
                banned_till
                from users where email = $1"

            result1 = DATA.query_one query1, 
                email, 
                as: {unqid: String, email: String, password: String, nick: String, flair: String, thumb: String, role: String, level: String, stars: Int, banned_till: Time | Nil}
            
            if !Crypto::Bcrypt::Password.new(result1[:password]).verify(rawpassword)
                raise AuthenticationError.new("Wrong password used in the login attempt with email " + email )
            end   

            # Check if user is banned
            if result1[:banned_till].try &.>= Time.utc
                raise AuthorizationError.new("Signin not allowed as user with email #{email} has been banned till #{result1[:banned_till].try &.to_s}")
            end

            # Generate the session id. We will randomize the length as well
            sessionid_length    = Random::Secure.rand(128..256)
            sessionid           = Random::Secure.urlsafe_base64(sessionid_length).delete('-').delete('_').byte_slice(0, 256)

            # Insert session into session store
            query2 = "insert into sessions (unqid, user_id, expires_at) 
                values ($1, $2, $3)
                Returning unqid"

            result2 = DATA.scalar query2,
                sessionid, result1[:unqid], Time.utc + ENV["SESSION_EXPIRY_IN_DAYS"].to_i64.days
        
        rescue ex : DB::NoResultsError | Digglu::AuthenticationError
            Log.notice { ex.message.to_s }
            ctx.response.status_code  = 401

        rescue ex : Digglu::AuthorizationError
            # Ban notice. Needs message to be sent to client
            Log.notice { ex.message.to_s }
            res =  {
                "message"    => ex.message.to_s,
            }
            ctx.response.status_code  = 403
            ctx.response.print(res.to_json)

        rescue ex
            Log.error(exception: ex) { ex.message }
            ctx.response.status_code  = 502

        else
            Log.info {"User with email " + email + " was successfully signed in"}
            res = {
                "message"   => "The user was sucessfully signed in",
                "data"      => {
                    "auth_type" => "basic",
                    "email"     => result1[:email],
                    "nick"      => result1[:nick],
                    "thumb"     => result1[:thumb],
                    "flair"     => result1[:flair],
                    "role"      => result1[:role],
                    "level"     => result1[:level],
                    "stars"     => result1[:stars],
                }
            }
            payload = {
                "auth_type"     => "basic",
                "email"         => result1[:email],
                "user_id"       => result1[:unqid],
                "session_id"    => sessionid,
                "iat"           => Time.utc.to_unix,
                "exp"           => (Time.utc + ENV["JWT_EXPIRY_IN_HOURS"].to_i32.hours).to_unix,
            }

            token = JWT.encode(payload, ENV["SECRET_JWT"], JWT::Algorithm::HS256)

            # Setting cookie with expiration time of 24 hrs
            usercookie = HTTP::Cookie.new("sessiontoken", token, "/", Time.utc + ENV["AUTHCOOKIE_EXPIRY_IN_DAYS"].to_i64.days)
            usercookie.http_only = true
            # usercookie.domain = "127.0.0.1"
            usercookie.secure = true
            usercookie.samesite = HTTP::Cookie::SameSite.new(0)
            
            ctx.response.headers["Set-Cookie"] = usercookie.to_set_cookie_header 
            ctx.response.status_code  = 202
            ctx.response.print(res.to_json)

        end

    end
end
