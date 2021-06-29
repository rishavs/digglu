module Digglu

    def self.signout(ctx : HTTP::Server::Context)
        begin
            
            token = ctx.request.cookies["sessiontoken"].value

            # Clear session store
            query = "delete from sessions 
                where unqid = $1
                Returning user_id"

            result = DATA.scalar(query, 
                token).as(String)

        rescue ex
            Log.error(exception: ex) { ex.message }
            res =  {
                "status"     => "error",
                "message"    => "502 Orcs have laid siege to the server. Please try again after some time",
            }
            ctx.response.status_code  = 502

        else
            Log.info {"User with email " + result + " was successfully signed out"}
            # clear cookies on browser
            res = {
                "status"    => "success",
                "message"   => "The user was sucessfully logged out"
            }

            usercookie = HTTP::Cookie.new("sessiontoken", "none", "/", Time.utc)
            ctx.response.headers["Set-Cookie"] = usercookie.to_set_cookie_header 
            ctx.response.status_code  = 202
        end

        ctx.response.print(res.to_json)

    end    
end
