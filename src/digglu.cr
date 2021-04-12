require "http/server"
require "http/client"
require "dotenv"
require "pg"
require "crypto/bcrypt/password"
require "uuid"
require "jwt"
require "json"
require "digest"
require "helmet"

require "./services/*"
# require "./error_handler"

# TODO: Write documentation for `Noir`
module Digglu
  VERSION = "0.1.0"

  SERVERPORT = 3000
  SERVERHOST = "0.0.0.0"

  Dotenv.load
  # DATA = DB.open ENV["DATABASE_URL"]

  # cnn_time = DATA.scalar "SELECT NOW()"
  # puts "Connected to DB at: #{cnn_time}"

  server = HTTP::Server.new([
    HTTP::ErrorHandler.new,
    HTTP::LogHandler.new,
    HTTP::CompressHandler.new,
    # Digglu::ErrorHandler.new,
    Helmet::DNSPrefetchControllerHandler.new,
    Helmet::FrameGuardHandler.new,
    Helmet::InternetExplorerNoOpenHandler.new,
    Helmet::NoSniffHandler.new,
    Helmet::StrictTransportSecurityHandler.new(7.day),
    Helmet::XSSFilterHandler.new,
  ]) do |ctx|
    pp ctx.request.method
    pp ctx.request.path
    pp ctx.request.query
    pp ctx.request.query_params
    pp ctx.request.resource

    ctx.response.content_type = "application/json"
    ctx.response.headers["Access-Control-Allow-Origin"] = "http://localhost:8080"
    ctx.response.headers["Access-Control-Allow-Credentials"] = "true"
    ctx.response.headers["Access-Control-Allow-Methods"] = "POST, GET"
    ctx.response.headers["Access-Control-Allow-Content-Type"] = "application/json"
    ctx.response.headers["Access-Control-Allow-Headers"] = "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"

    # response.setHeader("Access-Control-Max-Age", "3600");

    case {ctx.request.method, ctx.request.path}
    when {"OPTIONS", _} then ctx.response.respond_with_status(200, "Here are the options")
    when {"GET", "/api/v1/posts/all"}
      ctx.response.respond_with_status(200, "So you want all posts, eh?")
      if ctx.request.query_params["sortby"]?
        ctx.response.respond_with_status(200, "Here are all posts sorted by " + ctx.request.query_params["sortby"])
      else
        ctx.response.respond_with_status(400, "Missing sorting? Maybe i'll default to Magic?")
      end
    when {"GET", "/api/v1/post"}
      if ctx.request.query_params["id"]?
        ctx.response.respond_with_status(200, "This is the content of the post with id - " + ctx.request.query_params["id"])
      else
        ctx.response.respond_with_status(400, "Missing id?")
      end
    when {"POST", "/api/v1/signup"} then handle_signup(ctx)
    else
      ctx.response.respond_with_status(404, "Now move along, will ya?")
    end

    # GET api/posts/all
    # GET api/post?id=1
  end

  address = server.bind_tcp SERVERPORT
  puts "Server listening on http://#{address}"
  puts "------------------------------------------------"
  server.listen
end
