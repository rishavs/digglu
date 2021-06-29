module Digglu

    def self.google_signin(ctx : HTTP::Server::Context)
        begin
            
            pp! tokens  = ctx.request.cookies
            pp! payload = ctx.request.body.not_nil!.gets_to_end
            pp! ctx.request.headers
            pp ctx

        rescue ex
            Log.error(exception: ex) { ex.message }
        else
            Log.info {"No errors found"}
        end

        ctx.response.respond_with_status(503, "Whatever")

    end    
end
