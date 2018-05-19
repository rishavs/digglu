const m = require("mithril");
import "nprogress/nprogress.css";
import NProgress from "nprogress";

import backend from "./../services/backend.js";

// List of tags that i previously pulled from my backend
let tagStore = [];

let data = {
    title: "",
    link: "",
    thumb: "",
    content: "",
    tags: ["cat", "dog"]
};

$(document).ready(function() {
    $('.ui.normal.dropdown')
    .dropdown({
        maxSelections: 10
    });
});

const actions = {
    setPostTitle: v => {
        data.title = v;
    },
    setPostLink: v => {
        data.link = v;
    },
    setPostThumb: v => {
        data.thumb = v;
    },
    setPostContent: v => {
        data.content = v;
    },

    handleSubmit: async () => {
        NProgress.start();
        data.author = await firebase.auth().currentUser.uid;
        let new_id = await backend.add_new_post(data);
        m.route.set("/" + new_id);
        NProgress.done();
    }
};

const PostNew = {

    oninit: async () => {
        NProgress.start();
        tagStore = await backend.get_all_tags();
        console.log(tagStore);
        m.redraw()
        NProgress.done();
    },

    view: () =>
        <div class="ui main container">
            <form class="ui form">
                <div class="field">
                    <label class="label">Title</label>

                    <input
                        class="input"
                        type="text"
                        placeholder="Title"
                        oninput={m.withAttr("value", actions.setPostTitle)}
                    />

                </div>

                <div class="field">
                    <label class="label">Link</label>

                    <input
                        class="input"
                        type="text"
                        placeholder="Link"
                        oninput={m.withAttr("value", actions.setPostLink)}
                    />

                </div>

                <div class="field">
                    <label class="label">Tags/Select</label>
                    <div class="ui fluid multiple search normal selection dropdown">
                        <input type="hidden" name="country" />
                        <i class="dropdown icon"></i>
                        <div class="default text">Select Country</div>
                            {
                            tagStore.length > 0 
                            ?
                            <div class="menu">
                                {tagStore.map(tag => <div class="item" data-value={tag}>{tag}</div>)}
                            </div>
                            : 
                            <div class="menu">
                                <div class="item" data-value="af"><i class="af flag"></i>Afghanistan</div>
                            </div>    
                            }

                    </div>

                </div>





                <div class="field">
                    <label class="label">Content</label>

                    <textarea
                        class="textarea"
                        placeholder="Content"
                        oninput={m.withAttr(
                            "value",
                            actions.setPostContent
                        )}
                    />

                </div>
                <button class="ui button" onclick={actions.handleSubmit}>Submit</button>
            </form>
        </div>
};

export default PostNew;
