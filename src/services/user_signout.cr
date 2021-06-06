module Digglu

    def self.user_signout(ctx : HTTP::Server::Context)

        token = ctx.request.cookies["usertoken"].value

        # Clear session store
        query = "delete from sessions 
            where unqid = $1
            Returning FOUND"

        result = DATA.exec(query, 
            token)

        puts result
        pp! result

        # clear cookies on browser
        res = {
            "status"    => "success",
            "message"   => "The user was sucessfully logged out"
        }

        pp! res

        usercookie = HTTP::Cookie.new("usertoken", "none", "/", Time.utc + 12.hours)
        ctx.response.headers["Set-Cookie"] = usercookie.to_set_cookie_header 
        ctx.response.print(res.to_json)

    end    
end
