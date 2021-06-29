module Digglu
    class AuthenticationError   < Exception
    end
    class AuthorizationError    < Exception
    end
    class BadRequestError       < Exception
    end
    class BadGatewayError       < Exception
    end
    class DataConflictError     < Exception
    end
    class ForbiddenError        < Exception
    end
    class NotFoundError         < Exception
    end
    class ValidationError       < Exception
    end
    
    # class ErrorHandler
    #     include HTTP::Handler
    
    #     def call(context)
    #         begin
    #             call_next(context)

    #         rescue ex : AuthenticationError
    #             Log.error(exception: ex) { ex.message.to_s }
    #             context.response.status_code = 401
    #             # usercookie = HTTP::Cookie.new("sessiontoken", "none", "/", Time.utc + 12.hours)
    #             # context.response.headers["Set-Cookie"] = usercookie.to_set_cookie_header 
    #             res = {
    #                 "status" => 401,
    #                 "message" => ex.message.to_s
    #             }
    #             context.response.print(res.to_json)

    #         rescue ex : AuthorizationError
    #             Log.error(exception: ex) { ex.message.to_s }
    #             context.response.status_code = 403
    #             res = {
    #                 "status" => 403,
    #                 "message" => ex.message.to_s
    #             }
    #             context.response.print(res.to_json)

    #         rescue ex : BadRequestError | KeyError | NilAssertionError | JSON::Error
    #             Log.error(exception: ex) { ex.message.to_s }
    #             context.response.status_code = 400
    #             res = {
    #                 "status" => 400,
    #                 "message" => "Bad Request. Please check the input strings."
    #             }
    #             context.response.print(res.to_json)

    #         rescue ex : BadGatewayError
    #             Log.error(exception: ex) { ex.message.to_s }
    #             context.response.status_code = 502
    #             res = {
    #                 "status" => 502,
    #                 "message" => ex.message.to_s
    #             }
    #             context.response.print(res.to_json)

    #         rescue ex : NotFoundError
    #             Log.error(exception: ex) { ex.message.to_s }
    #             context.response.status_code = 404
    #             res = {
    #                 "status" => 404,
    #                 "message" => ex.message.to_s
    #             }
    #             context.response.print(res.to_json)

    #         rescue ex : ValidationError
    #             Log.error(exception: ex) { ex.message.to_s }
    #             context.response.status_code = 422
    #             res = {
    #                 "status" => 422,
    #                 "message" => "Input Validation Failed"
    #             }
    #             context.response.print(res.to_json)

    #         rescue ex : Exception
    #             # For some errors we have to parse the err message
    #             case ex.message.to_s
    #             when "no rows"
    #                 context.response.status_code = 401
    #                 errCode = 401
    #                 errMsg = "The Email or Password is wrong!"
    #             when "User is not logged in"
    #                 context.response.status_code = 401
    #                 errCode = 401
    #                 errMsg = "The Email or Password is wrong!"
    #             when "User has been banned!"
    #                 context.response.status_code = 403
    #                 errCode = 403
    #                 errMsg = "User has been banned!"
    #             else
    #                 context.response.status_code = 500
    #                 errCode = 500
    #                 errMsg = ex.message.to_s
    #             end

    #             Log.error(exception: ex) { ex.message.to_s }
    #             res = {
    #                 "status" => errCode,
    #                 "message" => errMsg
    #             }
    #             context.response.print(res.to_json)

    #         end
    #     end
    # end
end