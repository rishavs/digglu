module Digglu

    def self.validate_as_email(email : String)
        reg = Regex.new("^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$")
        res = reg.matches?(email) && (8 <= email.size <= 64) ? true : false
    end

    def self.validate_as_password(pass : String)
        res = (8 <= pass.size <= 64) ? true : false
    end
       
    # class Validate
    #     def self.if_unique(itemval, itemname, dbtable)
    #         unq_count = (DATA.scalar "select count(*) from #{dbtable} where #{itemname} = $1", itemval).as(Int)
    #         # pp unq_count.to_i
    #         if unq_count.to_i != 0
    #             raise ValidationError.new("The #{itemname} '#{itemval}' already exists.")
    #         end
    #     end
    #     def self.if_length(itemval, itemname, min, max)
    #         itemsize = itemval.size
    #         if !(min <= itemsize <= max)
    #             raise ValidationError.new("The #{itemname} (#{itemsize} chars) should be between #{min} and #{max} chars long.")
    #         end
    #     end
    #     def self.if_arr_length(arrval, arrname, min, max)
    #         arrsize = arrval.size
    #         if !(min <= arrsize <= max)
    #             raise ValidationError.new("The list: #{arrname} (#{arrsize}) should have between #{min} and #{max} items.")
    #         end
    #     end
    #     def self.if_exists(itemval, itemname, dbtable)
    #         unq_count = (DATA.scalar "select count(*) from #{dbtable} where #{itemname} = $1", itemval).as(Int)
    #         # pp unq_count.to_i
    #         if unq_count.to_i == 0
    #             raise ValidationError.new("The #{itemname} '#{itemval}' doesn't exists.")
    #         end
    #     end
    #     def self.if_loggedin(userHash)
    #         if userHash["loggedin"] != "true" || userHash["unqid"] == "none"
    #             raise ValidationError.new("Unable to fetch user details. Are you sure you are logged in?")
    #         end
    #     end
    # end
end