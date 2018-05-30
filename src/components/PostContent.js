const m = require("mithril")

import "nprogress/nprogress.css";
import NProgress from "nprogress";

import backend from "./../services/backend.js";
import utils from "./../services/utils.js";


const actions = {

    like_post: () => {
        //ensure user is logged in to use this action
        utils.redirect_to_login_if_not_loggedin()

    },
    toggle_post_reply: () => {
        //ensure user is logged in to use this action
        utils.redirect_to_login_if_not_loggedin()

        var component = document.getElementById("reply_for_post")
        if (component.style.display === 'none') {
            component.style.display = 'block';
        } else {
            component.style.display = 'none';
        }
    },
    handle_submit: async () => {
        NProgress.start();
        
        //ensure user is logged in to use this action
        utils.redirect_to_login_if_not_loggedin()

        let comment_data = {}
        comment_data.content = document.getElementById("textarea_for_post_reply").value;
        comment_data.author = firebase.auth().currentUser.uid;
        comment_data.level = 0
        comment_data.post_id = m.route.param().id
        comment_data.parent_id = m.route.param().id

        let new_id = await backend.add_new_comment(comment_data);
        if (new_id) {
            console.log("Comment was added successfully")
            document.getElementById("textarea_for_post_reply").style.display = 'none'
        }
        else {
            "New Comment reference not received"
        }
        m.redraw()
        NProgress.done();

        // this is to stop the page refresh
        return false
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
                                    <div class="date"> <i class="clock icon"></i> 2 days ago</div>
                                    <div class="rating">
                                        <i class="star icon"></i>
                                        5 Faves
                                    </div>
                                </div>

                                <div class="text">
                                    {vnode.attrs.postData.content}
                                </div>


                            </div>
                        </div>
                    </div>

                </div>

            </div>



        </div>,
        <div class="actions">
            <button class="ui right labeled icon small basic button" onclick={actions.like_post}>
                <i class="thumbs up icon"></i>
                1024
            </button>
            <button class="ui right labeled icon small basic button" onclick={() => actions.toggle_post_reply('reply_for_post')}>
                <i class="reply icon"></i>
                2048
            </button>
            <button class="ui icon small button" >
                <i class="ellipsis vertical icon"></i>
            </button>

        </div>,
        <form class="ui reply form" id="reply_for_post" style="display:none" onsubmit={actions.handle_submit}>
            <br />

            <div class="field">
                <textarea
                    id="textarea_for_post_reply"
                    class="textarea"
                    placeholder="Content"
                >
                </textarea>
            </div>
            <div class="ui blue labeled submit icon button" onclick={actions.handle_submit}>
                <i class="icon edit"></i> Add Reply
            </div>
        </form>


    ]


}

export default PostContent;
