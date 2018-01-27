const m = require("mithril")

import backend from "./../services/backend.js";

const Logout = {
    oninit: async () => {
        await backend.logout()
        m.route.set("/")
    },
    view: () => {
        return (
            <h1> Logging Out... </h1>
        )
    }
}

export default Logout;
