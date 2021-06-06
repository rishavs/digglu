module Digglu

     def self.user_signin(ctx : HTTP::Server::Context)

        payload = User_signup_model.from_json(ctx.request.body.not_nil!.gets_to_end)

        # Cleanup data
        form_email        = payload.user_email.lstrip.rstrip.downcase
        form_rawpassword  = payload.user_password

        # Validate data
        reg = Regex.new("^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$")
        if !reg.matches?(form_email)
            raise BadRequestError.new()
        end
        if !(8 <= form_rawpassword.size <= 64)
            raise ValidationError.new()
        end

        # Get the password for the comparison
        query1 = "select USER_ID_REF, user_email, user_password 
            from auth_basic where user_email = $1"

        result1 = DATA.query_one? query1, 
            form_email, 
            as: {user_id: String, user_email: String, user_password: String}
        
        if !result1
            raise AuthenticationError.new("The Username or Password is wrong") 
        end

        if !Crypto::Bcrypt::Password.new(result1[:user_password]).verify(form_rawpassword) # => true
            puts "The password DOESN'T matches"
            raise AuthenticationError.new("The Username or Password is wrong 1") 
        end   

        puts "The password matches"

        # Get the account details
        query2 = "select unqid, user_nick, user_flair, user_thumb, user_role, user_level, user_stars,
            banned_till from users where unqid = $1"
            
        result2 = DATA.query_one? query2, 
            result1[:user_id], 
            as: {unqid: String, user_nick: String, user_flair: String, user_thumb: String,  user_role: String, user_level: String, user_stars: Int, banned_till: Time | Nil}
        
        puts result2
        p! result2

        if !result2            
            raise AuthenticationError.new("The Username or Password is wrong 2")  
        end

        # Check if user is banned
        if banned_time = result2[:banned_till]
            if (banned_time < Time.utc)
                raise AuthorizationError.new("User has been banned till #{result2[:banned_till].try &.to_s}")
            end
        end

        # Generate the session id
        sessionid = Random::Secure.urlsafe_base64(128).byte_slice(0, 128)

        # Insert session into session store
        # Allowing multiple entries for each user. unquote "where email = '#{email}'" clause otherwise
        # Max number of concurrent sessions per user = 5??
        query3 = "insert into sessions (unqid, user_id) 
            values ($1, $2)
            Returning unqid"

        result3 = DATA.scalar query3,
            sessionid, result2[:unqid]
        
        # Setting cookie with expiration time of 24 hrs
        usercookie = HTTP::Cookie.new("usertoken", sessionid, "/", Time.utc + 2.days)
        usercookie.http_only = true
        # usercookie.domain = "127.0.0.1"
        usercookie.secure = true
        usercookie.samesite = HTTP::Cookie::SameSite.new(0)


        res = {
            "status"    => "success",
            "message"   => "The user was sucessfully logged in",
            "data"      => {
                "auth_type"     => "basic",
                "user_email"    => result1[:user_email],
                "user_nick"     => result2[:user_nick],
                "user_thumb"    => result2[:user_thumb],
                "user_flair"    => result2[:user_flair],
                "user_role"     => result2[:user_role],
                "user_level"    => result2[:user_level],
                "user_stars"    => result2[:user_stars],
            }
        }
        puts res
        ctx.response.headers["Set-Cookie"] = usercookie.to_set_cookie_header 
        ctx.response.print(res.to_json)
    end
end
