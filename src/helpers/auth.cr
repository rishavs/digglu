module Digglu

    def self.verify_authn(ctx : HTTP::Server::Context)

        # get session id and userid from cookies
        if !ctx.request.cookies.has_key?("usertoken") || ctx.request.cookies["usertoken"].value == "none"
            raise AuthenticationError.new("User is not logged in")
        end

        token = ctx.request.cookies["usertoken"].value

        # begin
        #     # get session id and userid from token
        #     if !ctx.request.cookies.has_key?("usertoken") || ctx.request.cookies["usertoken"].value == "none"
        #         raise AuthenticationError.new("User is not logged in")
        #     end
        
        #     token = ctx.request.cookies["usertoken"].value
        #     payload, header = JWT.decode(token, ENV["SECRET_JWT"], JWT::Algorithm::HS256)
        #     session_user    = payload["user_id"].to_s
        #     session_id      = payload["unqid"].to_s

        #     # DB operations
        #     # first check if session exists
        #     # then check is user is banned
        #     is_auth_query = "select(exists(select * from sessions where unqid = $1 and user_id = $2))"
        #     is_auth = DATA.scalar( is_auth_query, session_id, session_user).as(Bool)
        #     if !is_auth
        #         raise AuthenticationError.new("User is not logged in")
        #     end

        #     user_query = "select unqid, user_nick, user_flair from users where unqid = $1
        #         and (banned_till IS NULL or banned_till < now());"
        #     user = DATA.query_one? user_query, session_user,
        #         as: {unqid: String, user_nick: String, user_flair: String}
        #     if !user
        #         raise AuthorizationError.new("User has been banned")
        #     end
        # end
        # return user

    end

end