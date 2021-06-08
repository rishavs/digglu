module Digglu

     def self.user_signin(ctx : HTTP::Server::Context)
        begin

            payload = User_signup_model.from_json(ctx.request.body.not_nil!.gets_to_end)

            # Cleanup data
            email        = payload.user_email.downcase
            rawpassword  = payload.user_password
            
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

            # Generate the session id
            sessionid = Random::Secure.urlsafe_base64(128).delete('-').delete('_').byte_slice(0, 128)

            # Insert session into session store
            query2 = "insert into sessions (unqid, user_id) 
                values ($1, $2)
                Returning unqid"

            result2 = DATA.scalar query2,
                sessionid, result1[:unqid]
        
        rescue ex : DB::NoResultsError
            Log.notice { ex.message.to_s }
            res =  {
                "status"     => "error",
                "message"    => "The Username or Password is wrong",
            }
            ctx.response.status_code  = 401

        rescue ex : Digglu::AuthenticationError
            Log.notice { ex.message.to_s }
            res =  {
                "status"     => "error",
                "message"    => "The Username or Password is wrong",
            }
            ctx.response.status_code  = 401

        rescue ex : Digglu::AuthorizationError
            Log.notice { ex.message.to_s }
            res =  {
                "status"     => "error",
                "message"    => ex.message.to_s,
            }
            ctx.response.status_code  = 403
        rescue ex
            Log.error(exception: ex) { ex.message }
            res =  {
                "status"     => "error",
                "message"    => "502 Orcs have laid siege to the server. Please try again after some time",
            }
            ctx.response.status_code  = 502

        else
            Log.info {"User with email " + email + " was successfully signed in"}
            res = {
                "status"    => "success",
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

            # Setting cookie with expiration time of 24 hrs
            usercookie = HTTP::Cookie.new("sessiontoken", sessionid, "/", Time.utc + 2.days)
            usercookie.http_only = true
            # usercookie.domain = "127.0.0.1"
            usercookie.secure = true
            usercookie.samesite = HTTP::Cookie::SameSite.new(0)
            
            ctx.response.headers["Set-Cookie"] = usercookie.to_set_cookie_header 
            ctx.response.status_code  = 202
        end

        ctx.response.print(res.to_json)

    end
end
