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
        m.redraw()
        NProgress.done();
    },
    
    view: ({state}) => 
        (
        <article class="pageEntry"> 
        {!state.data.author ?
            <h1> Loading.... </h1>
        :
            <div> 
                <h1> Post Details for : {state.data.id} </h1>
                <h1> author : {state.data.author} </h1>
                <h3> title : {state.data.title} </h3>
                <h3> content : {state.data.content} </h3>
                <div class="control">
                    
                    <a href={'/' + m.route.param().id + '/edit'} oncreate={m.route.link}> Edit</a>
                </div>
            </div>
        }
        </article>
    )
};

export default PostRead;