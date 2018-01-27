const m = require("mithril")
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

import backend from "./../services/backend.js";

const PostRead = {
    data: {},
    
    oninit: async ({state}) => {
        NProgress.start();
        Object.assign(state, {
            data: await backend.get_current_post(m.route.param().id),
            }
        )
        console.log(state.data)
        m.redraw()
        NProgress.done();
    },
    
    view: ({state}) => 
        m("article", {class:"pageEntry"}, [
            m("h1", "Post Details"),
            m("p", [
                !state.data.id
                ?
                "Loading..."
                :
                m("div", {class: 'container'}, 
                    m("h1", "READ POST"),
                    m("h2", state.data.title),
                    m("h2", state.data.content)
                )
            ])
        ])
};

export default PostRead;