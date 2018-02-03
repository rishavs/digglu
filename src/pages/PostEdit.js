const m = require("mithril")
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

import backend from "./../services/backend.js";

const PostEdit = {
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
    
    view: ({state}) => (
        <article class="pageEntry">
            {!state.data.author ?
            <h1> Loading... </h1>
            :
            <form>
                <div class="field">
                    <label class="label">Title</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Title" value={state.data.title}/>
                    </div>
                </div>            

                <div class="field">
                    <label class="label">Link</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Link" value={state.data.link} />
                    </div>
                </div>
     
                <div class="field">
                    <label class="label">Content</label>
                    <div class="control">
                        <textarea class="textarea" placeholder="Content" value={state.data.content}></textarea>
                    </div>
                </div>

                <div class="field is-grouped">
                    <div class="control">
                        <button class="button is-primary">Submit</button>
                    </div>
                    <div class="control">
                        <button class="button is-text">Cancel</button>
                    </div>
                </div>
            </form>
            }
        </article>
    )

};

export default PostEdit;