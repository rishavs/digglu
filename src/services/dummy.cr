
module Digglu

    def self.dummy(ctx)
        p! ctx.request.query_params
        
        if ctx.request.query_params["id"]? && ctx.request.query_params["name"]?
            ctx.response.respond_with_status(200, "Signing up - " + ctx.request.query_params["id"] + ", " + ctx.request.query_params["name"])
        else
            ctx.response.respond_with_status(400, "Missing id?")
        end



    end
    
end



# module Noir::Services
#     class Register
#         class Req
#             include JSON::Serializable

#             property user_email :   String
#             property password :     String
#             property user_nick :    String | Nil
#             property user_flair :   String | Nil
#         end

#         def initialize(ctx : HTTP::Server::Context)
#             begin
#                 if body = ctx.request.body
#                     req = Req.from_json(body.try &.gets_to_end)
#                 else
#                     raise KeyError.new("The payload is missing")
#                 end

#                 # Cleanup data
#                 user_email      = req.user_email.lstrip.rstrip
#                 user_nick       = req.user_nick ? req.user_nick.try &.downcase.lstrip.rstrip : "Nony Mouse"
#                 user_flair      = req.user_flair ? req.user_flair.try &.lstrip.rstrip : "is a shy lil mousey"
#                 rawpassword     = req.password
                
#                 # Validation checks
#                 Validate.if_length(user_email, "user_email", 3, 32)
#                 Validate.if_length(rawpassword, "password", 3, 32)
#                 # Validate.if_unique(email, "email", "users")

#                 # Generate some data
#                 unqid = UUID.random.to_s
#                 password = Crypto::Bcrypt::Password.create(rawpassword).to_s
#                 user_thumb = "https://robohash.org/set_set4/128x128/#{unqid}.jpeg"
#                 # DB operations
#                 query =  "insert into users (unqid, user_nick, user_flair, user_email, user_thumb, password) 
#                     values ($1, $2, $3, $4, $5, $6)
#                     Returning unqid"
#                 result = DATA.scalar query,
#                     unqid, user_nick, user_flair, user_email, user_thumb, password

#                 res = {
#                     "status"    => "success",
#                     "message"   => "The user was sucessfully registered",
#                     "data"      => {
#                         "unqid"         => result.to_s,
#                         "user_email"    => user_email,
#                         "user_nick"     => user_nick,
#                         "user_thumb"    => user_thumb,
#                         "user_flair"    => user_flair
#                     }
#                 }
#                 ctx.response.print(res.to_json)
#             end

#         end
#     end
# end

