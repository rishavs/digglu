require "http/server"
require "http/client"
require "dotenv"
require "pg"
require "crypto/bcrypt/password"
require "uuid"
require "json"
require "log"
require "jwt"

require "./helpers/*"
require "./services/*"
# require "./error_handler"

# TODO: Write documentation for `Noir`
module Digglu
    VERSION = "0.1.0"



    Dotenv.load
    DATA = DB.open ENV["DATABASE_URL2"]

    cnn_time = DATA.scalar "SELECT NOW()"
    puts "Connected to DB at: #{cnn_time}"
    services = {
        "GET:/dummy"                    => ->dummy(HTTP::Server::Context),
        "POST:/api/v1/user/signup"      => ->signup(HTTP::Server::Context),
        "POST:/api/v1/user/signin"      => ->signin(HTTP::Server::Context),
        "POST:/api/v1/user/signout"     => ->signout(HTTP::Server::Context),
    }

    server = HTTP::Server.new([
        # Digglu::ErrorHandler.new,
        HTTP::LogHandler.new,
        HTTP::CompressHandler.new,

    ]) do |ctx|

        pp! tokens  = ctx.request.cookies
        # pp! payload = ctx.request.body ? ctx.request.body.try &.gets_to_end : nil
        pp! headers = ctx.request.headers
        # pp ctx.request.method
        # pp ctx.request.path
        # pp ctx.request.query
        # pp ctx.request.query_params
        # pp ctx.request.resource
        # pp ctx
        puts "------------------------------------------------"

        ctx.response.content_type                                   = "application/json"
        ctx.response.headers["Access-Control-Request-Headers"]      = "Content-Type, application/json"
        ctx.response.headers["Access-Control-Allow-Origin"]         = "https://localhost:8080"
        ctx.response.headers["Access-Control-Allow-Credentials"]    = "true"
        ctx.response.headers["Access-Control-Allow-Methods"]        = "POST, GET, OPTIONS"
        ctx.response.headers["Access-Control-Allow-Content-Type"]   = "application/json"
        ctx.response.headers["Access-Control-Allow-Headers"]        = "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"

        # response.setHeader("Access-Control-Max-Age", "3600");

        if ctx.request.method.downcase == "options"
            ctx.response.status_code = 200
        else
            service = ctx.request.method + ":" + ctx.request.path
            if services.has_key?(service) 
                services[service].call ctx
            else
                ctx.response.respond_with_status(404, "Wrong api url. Remember to remove this later. Willya?")
            end
        end
    end

    address = server.bind_tcp ENV["SERVERHOST"], ENV["SERVERPORT"].to_i32
    puts "Server listening on http://#{address}"
    puts "------------------------------------------------"
    server.listen
end
