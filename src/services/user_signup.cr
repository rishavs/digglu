module Digglu

    struct User_signup_model
        include JSON::Serializable
        property user_email     : String
        property user_password  : String
    end

    def self.user_signup(ctx : HTTP::Server::Context)

            payload = User_signup_model.from_json(ctx.request.body.not_nil!.gets_to_end)

            # Cleanup data
            email        = payload.user_email.lstrip.rstrip.downcase
            rawpassword  = payload.user_password

            # Validate data
            reg = Regex.new("^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$")
            if !reg.matches?(email)
                raise BadRequestError.new()
            end
            if !(8 <= rawpassword.size <= 64)
                raise ValidationError.new()
            end

            # Generate some data
            unqid = UUID.random.to_s
            encpass = Crypto::Bcrypt::Password.create(rawpassword, cost: 10)
            thumb = "https://robohash.org/set_set4/128x128/#{unqid}.jpeg"
            
            # DB operations
            query1 =  "insert into users (unqid, user_thumb) 
                values ($1, $2)
                Returning unqid"
            result1 = DATA.scalar query1,
                unqid, thumb

            query2 =  "insert into AUTH_BASIC (user_id_ref, user_email, user_password) 
                values ($1, $2, $3)
                Returning user_id_ref"
            result2 = DATA.scalar query2,
                result1.to_s, email, encpass

            Log.info { "User with email " + result2.to_s + "was successfully created" }
            res = {
                "status"    => "success",
                "message"   => "The user was sucessfully registered",
                "data"      => {
                    "unqid"         => result2.to_s,
                }
            }
            # pp res.to_json
            # ctx.response.status = "OK"
            ctx.response.print(res.to_json)
        # end


    end
    
end
