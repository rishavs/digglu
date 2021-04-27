module Digglu
    class Formdata
        def self.get_params(body : IO)
            # HTTP::Params.parse(body.gets_to_end)
            JSON.parse(body)
        end
        def self.get_params(body : Nil)
            # HTTP::Params.parse("")
            JSON.parse("")
        end
    end
end