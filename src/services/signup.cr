module Digglu

    def self.signup (ctx : HTTP::Server::Context)
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
            # In this case we need to send back a message in the response
            when "duplicate key value violates unique constraint \"users_email_key\""
                Log.notice(exception: ex) { ex.message }
                res =  {
                    "message"    => "Non unique email entered",
                }
                ctx.response.status_code  = 406   
                ctx.response.print(res.to_json)
            else
                Log.error(exception: ex) { ex.message }
                ctx.response.status_code  = 502
            end

        else
            Log.info { "New account with email " + email + " was successfully created" }
            ctx.response.status_code  = 202
        end

    end
end

