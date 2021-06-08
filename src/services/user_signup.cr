module Digglu

    struct User_signup_model
        include JSON::Serializable
        property user_email     : String
        property user_password  : String
    end

    def self.user_signup (ctx : HTTP::Server::Context)
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
    
            # Generate some data
            userid  = UUID.random.to_s
            encpass = Crypto::Bcrypt::Password.create(rawpassword, cost: 10)
            thumb   = "https://robohash.org/set_set4/128x128/#{userid}.jpeg"
            
            # DB operations
            query   =  "insert into users (unqid, thumb, email, password) 
                    values ($1, $2, $3, $4)
                    Returning unqid"
            result  = DATA.scalar query,
                userid, thumb, email, encpass
    
        rescue ex
            case ex.message.to_s
            when "duplicate key value violates unique constraint \"users_email_key\""
                Log.notice(exception: ex) { ex.message }
                res =  {
                    "status"     => "error",
                    "message"    => "Non unique email entered",
                }
                # ctx.response.respond_with_status(401, res.to_json)
                ctx.response.status_code  = 406
            else
                Log.error(exception: ex) { ex.message }
                res =  {
                    "status"     => "error",
                    "message"    => "502 Orcs have laid siege to the server. Please try again after some time",
                }
                ctx.response.status_code  = 502
            end

        else
            Log.info { "New accounbt with email " + email + " was successfully created" }
            res = {
                "status"    => "success",
                "message"   => "User account was sucessfully registered",
                "data"      => {
                    "unqid" =>  result.to_s,
                }
            }
            ctx.response.status_code  = 202
        end

        ctx.response.print(res.to_json)
    end
end

