const m = require("mithril")

import "nprogress/nprogress.css";
import NProgress from "nprogress";

import backend from "./../services/backend.js";

let comment_data = {}

const actions = {
    toggle_post_reply: () => {
        var component = document.getElementById("reply_for_post")
        if (component.style.display === 'none') {
            component.style.display = 'block';
        } else {
            component.style.display = 'none';
        }
    },
    setPostReply: v => {
        comment_data.content = v;
    },
    handle_submit: async () => {
        NProgress.start();

        // console.log(comment_data.content)
        comment_data.author = await firebase.auth().currentUser.uid;
        comment_data.level = 0
        comment_data.post_id = m.route.param().id
        comment_data.parent_id = m.route.param().id

        let new_id = await backend.add_new_comment(comment_data);
        if (new_id) {
            console.log("Comment was added successfully")
        }
        else {
            "New Comment reference not received"
        }
        m.redraw()
        NProgress.done();
    },
}

const PostContent = {
    comment_data: {},
    onremove: () => {

    },
    view: (vnode) => [
        <h1>{vnode.attrs.postData.title}</h1>,
        <div class="ui items">
            <div class="item">
                <div class="ui medium image">
                    <img src={vnode.attrs.postData.thumb} />
                </div>

                <div class="content">

                    <div class="ui comments" style="max-width: 100%">
                        <div class="comment">
                            <a class="avatar">
                                <img src="http://via.placeholder.com/50x50.png" />
                            </a>
                            <div class="content">

                                <a class="author">Matt</a>

                                <div class="metadata">
                                    <div class="date">2 days ago</div>
                                    <div class="rating">
                                        <i class="star icon"></i>
                                        5 Faves
                                    </div>
                                </div>

                                <div class="text">
                                    {vnode.attrs.postData.content}
                                </div>

                                <div class="actions">
                                    <div class="ui left labeled button" tabindex="0">
                                        <a class="ui basic right pointing label"> 2,048 </a>
                                        <div class="ui blue button">
                                            <i class="heart icon"></i> Like
                                        </div>
                                    </div>
                                    <div class="ui left labeled button" tabindex="0">
                                        <a class="ui basic right pointing label"> 2,049 </a>
                                        <div class="ui button" onclick={() => actions.toggle_post_reply('reply_for_post')}>
                                            <i class="reply icon"></i> Reply
                                                </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <div class="ui reply form" id="reply_for_post" style="display:none">
                <div class="field">
                    <textarea
                        class="textarea"
                        placeholder="Content"
                        oninput={m.withAttr("value", actions.setPostReply)}
                    >
                    </textarea>
                </div>
                <div class="ui blue labeled submit icon button" onclick={actions.handle_submit}>
                    <i class="icon edit"></i> Add Reply
                </div>
            </div>

        </div>
            



        ]
    

}

export default PostContent;
