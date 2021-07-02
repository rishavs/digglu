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
    Goals
        - faster query as sessions db doesnt needs to be queried for more than once every n days
        - jwt is only usable for n hours, so if its stolen it wouldn't cause as much issues
        - sessions are long running and if the user keeps using the system, they don't need to relogin indefinitely
        - if the user doesn't do anything auth related for 7 days, they will need to relogin
        - key idea; using a session id as a refresh token

    - Register
        - user sends email & password using form
        - if the email is already used, server sends back error
        - (email verification TBA later)
        - server stores email & encrypted password in db
        - server starts the login process
    - Login
        - user sends email & password using form
        - if password doesn't matches, send back error
        - server creates a sessionid for the that email with P=14 days expiry time and saves in db 
        - server creates an encrypted jwt containing some of the user details and the sessionid, with Q=4 hours expiry time
        - server creates a cookie containing the jwt and P=14 days expiry time

    - Auth check for guarded apis
        - user makes any api call which needs auth
        - if no cookie
            - redirect users to /login
        - server extracts the jwt from the cookie, and the user details and sessionid from the jwt
        - if jwt is not authentic
            - return error
        - query db for user details using sessionid
        - if sessionid doesn't exists
            - delete cookie and redirect to /login
        - if sessionid has expired
            - delete sessionid
            - delete cookie and redirect to /login
        - if jwt has expired
            - generate new sessionid with updated time. replace old sessionid in db
            - generate new jwt with updated time. 
            - set new cookie with new jwt, in the http context
        - continue with requested api function
        - user details are used in authenticated api

    - Logout
        - get the session id from the jwt
        - delete the session id from db
        - delete the cookie
        - redirect to /login


Purely Session based Auth strategy:
    Goals
        - Using only sessions
        - if user is using site frequently, their session goes on infinitely
        - if user doesn't uses site for some days, they have to relogin into the site
        - Refresh sessions every n hours
        - update sessionid frequently so that anyone who has stolen the cookie can only use it for limited time

    - Register
        - user sends email & password using form
        - if the email is already used, server sends back error
        - (email verification TBA later)
        - server stores email & encrypted password in db
        - server starts the login process
    - Login
        - user sends email & password using form
        - if password doesn't matches, send back error
        - server creates a sessionid for the that email with n=4 hours expiry time and saves in db 
        - server creates a cookie containing the sessionid and x=21 days expiry time

    - Auth check for guarded apis
        - user makes any api call which needs auth
        - if no cookie
            - redirect users to /login
        - if no sessionid in the db
            - the cookie is deleted and user is redirected to /login
        - if sessionid has expired
            - generate new sessionid with new +21 days expiry. 
            - set cookie with updated sessionid with its own updated expiry date
            - continue with requested api function
        - server gets the user details using the sessionid
        - user details are used in authenticated api

    - Logout
        - get the session id from the cookie
        - delete the session id from db
        - delete the cookie
        - redirect to /login

OIDC strat;
    - add provider sdk to page
    - on user click with signin button, get idtoken
    - send idtoken to server and validate
    - if token valid, using the userid for the provider, check
        - if account doesn't exists for this user. create one. goto next step.
        - if account exists, create a session and add session id in a cookie
    - do all auth query checks using session id 
    - if session cookie doesn't exists, relogin user
    
    Note: OIDC only replaces the need for a password. It doesn't provides any authz capabilities. Sessions/jwt are still needed for authz.



"DO
$$
BEGIN
    IF 
        (select exists(select user_id from sessions where unqid = '#{session_id}' and user_id = '#{session_user}'))
    THEN
        IF 
            (select banned_till from users where unqid = '#{session_user}') > now() 
        THEN
            RAISE EXCEPTION 'User has been banned!';
        ELSE 
            IF (
                Select ( SELECT array_agg(DISTINCT name) FROM allowed_tags) @> ARRAY#{tags_list}) 
            THEN
                insert into posts (unqid, title, link, content, user_id, user_nick, user_flair, 
                tags, tags_details, likes, likes_details) 
                    SELECT '#{unqid}', '#{title}', '#{link}', '#{content}', 
                    '#{session_user}', user_nick, user_flair, 
                    '#{tags_obj.to_json}', '#{tags_details_obj.to_json}', '1', '#{likes_obj.to_json}'
                    from users where unqid = '#{session_user}';
            ELSE
                RAISE EXCEPTION 'Fake tags detected!';
            END IF;
        END IF;
    ELSE
        RAISE EXCEPTION 'User is not logged in';
    END IF;
END
$$;"

Services - Routes:

    getHomepagePosts
        getHomePagePostsForAnon
        getHomePagePostsForUser
        getHomePagePostsLikedByUser
    getDetailsAndTagsForPost
        getDetailsAndTagsForPostByAnon
        getLikedCommentsForUser
    getCommentsForPost
    likePostOrComment
        likePost
        likeComment
    authMethods
        login
        logout
        signup
        whoami
    misc
        createPost
        updatePost
        deletePost
        createComment
        updateComment
        deletePost
        addTagToPost
        upvoteTagForPost
        downvoteTagForPost
        flagPost
        flagComment
        reportPost
        reportComment