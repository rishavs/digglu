const m = require("mithril")

import backend from "./../services/backend.js";

const PostRead = {
    data: {},
    
    oninit: async ({state}) => {
      Object.assign(state, {
        data: await backend.get_current_post(m.route.param().id),
        }
      )
      console.log(state.data)
      m.redraw()
    },
    
    view: ({state}) => 
        m("article", [
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