module Digglu

    struct Authstore

    end

    class Authhandler
        include HTTP::Handler
      
        def call(ctx)
            if ctx.request.path.starts_with?("/api/v1/")
                ctx.response.content_type                                   = "application/json"
                ctx.response.headers["Access-Control-Request-Headers"]      = "Content-Type, application/json"
                ctx.response.headers["Access-Control-Allow-Origin"]         = "http://127.0.0.1:8080"
                ctx.response.headers["Access-Control-Allow-Credentials"]    = "true"
                ctx.response.headers["Access-Control-Allow-Methods"]        = "POST, GET, OPTIONS"
                ctx.response.headers["Access-Control-Allow-Content-Type"]   = "application/json"
                ctx.response.headers["Access-Control-Allow-Headers"]        = "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
            else
                ctx.response.content_type = "text/html; charset=UTF-8"
            end
            call_next(ctx)
        end
    end

end