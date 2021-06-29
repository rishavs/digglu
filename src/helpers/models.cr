module Digglu

    struct User_signx_model
        include JSON::Serializable
        property email     : String
        property password  : String
    end

    struct User_details_model
        include JSON::Serializable
        property user_email     : String
        property user_password  : String
    end

    def self.validate_as_email(email : String)
        reg = Regex.new("^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$")
        res = reg.matches?(email) && (8 <= email.size <= 64) ? true : false
    end

    def self.validate_as_password(pass : String)
        res = (8 <= pass.size <= 64) ? true : false
    end

end