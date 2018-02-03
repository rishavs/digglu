const m = require("mithril")
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

import backend from "./../services/backend.js";

let state = {
        title: "",
        link: "",
        thumb: "",
        content: ""
}

const actions ={
    setPostTitle: (v)   => {state.title = v},
    setPostLink: (v)    => {state.link = v},
    setPostThumb: (v)   => {state.thumb = v},
    setPostContent: (v) => {state.content = v},

    handleSubmit : async () => {
        NProgress.start();
        // console.log("Attempting to log in...")
        state.author = await firebase.auth().currentUser.uid
        let new_id = await backend.add_new_post(state)
        m.route.set("/" + new_id)
        NProgress.done();
    },
}

const PostNew = {

    oninit: async ({state}) => {
        NProgress.start();
        NProgress.done();
    },
    
    view: ({state}) => (
        <article class="pageEntry">
            <form>
                <div class="field">
                    <label class="label">Title</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Title" oninput= {m.withAttr("value", actions.setPostTitle)} />
                    </div>
                </div>            

                <div class="field">
                    <label class="label">Link</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Link" oninput= {m.withAttr("value", actions.setPostLink)}/>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Content</label>
                    <div class="control">
                        <textarea class="textarea" placeholder="Content" oninput= {m.withAttr("value", actions.setPostContent)} ></textarea>
                    </div>
                </div>

                <div class="field is-grouped">
                    <div class="control">
                        <button class="button is-primary" onclick={actions.handleSubmit}>Submit</button>
                    </div>
                    <div class="control">
                        <button class="button is-text">Cancel</button>
                    </div>
                </div>
            </form>
        </article>
    )

};

export default PostNew;