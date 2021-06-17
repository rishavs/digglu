Temp attributes for posts
    - 🍼🐣 New
    - 🗲 Trending - high rate of being liked
    - 🗪 Discourse - High comment count
    - ❤️ Well loved - High likes count
    - 🔥 Hot - High score value
    - ⛏️ Well Dug

    api urls list;
    POST /api/v1/user/register
    POST /api/v1/user/login
    POST /api/v1/user/logout

    GET /api/v1/post/:action/:id
    POST /api/v1/post/show/:id
    POST /api/v1/post/edit/:id
    POST /api/v1/post/delete/:id

    /api/v1/posts/:category/:filter


like Hash(String, Proc(HTTP::Server::Context, Nil)), then service.call context

def foo(str); 
    puts "foo" + str; 
end; 

functions = {"f" => ->foo(String)}; 
functions["f"].call "bar"


NGinx;
http { gzip on; } server { listen 443 ssl; listen [::]:443 ssl; server_name nightly.link; location / { proxy_pass http://localhost:3098; } }
http { gzip on; server { listen 443 ssl; listen [::]:443 ssl; server_name nightly.link; location / { proxy_pass http://localhost:3098; } }

Auth strategy:
    - Register
        - user sends email & password using form
        - if the email is already used, server sends back error
        - 
        - server stores email & encrypted password in db
        - server cr
    - Login
        - user
    - Refresh
    - Logout

