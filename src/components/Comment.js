const m = require("mithril")

import "nprogress/nprogress.css";
import NProgress from "nprogress";

import backend from "./../services/backend.js";

const Comment = {
    oninit: () => {

    },
    
    actions: {
        toggle_comment_reply: (id) => {
            var component = document.getElementById("reply_for_id:" + id)
            if (component.style.display === 'none') {
                component.style.display = 'block';

                // this bit is mainly for a smoother transition
                document.getElementById("textarea_for_id:" + id).scrollIntoView({behavior:"smooth", block:"center", inline:"center"})
                document.getElementById("textarea_for_id:" + id).focus();
            } else {
                component.style.display = 'none';
            }
        },
        handle_submit: async (parent_comment) => {
            NProgress.start();
            
            let comment_data = {}
            comment_data.content =      document.getElementById("textarea_for_id:" + parent_comment.id ).value;
            comment_data.author =       await firebase.auth().currentUser.uid;
            comment_data.level =        parent_comment.level + 1
            comment_data.post_id =      m.route.param().id
            comment_data.parent_id =    parent_comment.id

            console.log("And the new child is:")
            console.log(comment_data)
    
            let new_id = await backend.add_new_comment(comment_data);
            if (new_id) {
                console.log("Comment was added successfully")
                document.getElementById("reply_for_id:" + parent_comment.id).style.display = 'none'
            }
            else {
                "New Comment reference not received"
            }
            m.redraw()
            NProgress.done();

            // this is to stop the page refresh
            return false
        },
    },
    view: (vnode) =>
        <div class="comment" comment_id={vnode.attrs.comment.id}>
            <a class="avatar">
                <img src="http://via.placeholder.com/50x50.png" />
            </a>
            <div class="content">
                <a class="author">{vnode.attrs.comment.author}</a>
                <div class="metadata">
                    <span class="date">Today at 5:42PM</span>
                </div>
                <div class="text">
                    <p> ID: <span>{vnode.attrs.comment.id}</span></p>
                    <p> PARENT_ID: <span>{vnode.attrs.comment.parent_id}</span></p>
                    <p> Children num: <span>{vnode.attrs.comment.children.length}</span></p>
                    <p> Content: <span>{vnode.attrs.comment.content}</span></p>
                </div>
                <div class="actions">
                    <a class="reply">(250) <i class="thumbs up icon"></i></a>
                    <a class="reply" onclick={() => vnode.state.actions.toggle_comment_reply(vnode.attrs.comment.id )}>(2110) <i class="reply icon"></i></a>
                </div>
                <form class="ui reply form" id={"reply_for_id:" + vnode.attrs.comment.id} style="display:none" onsubmit={() => vnode.state.actions.handle_submit(vnode.attrs.comment)} >
                    <div class="field">
                        <textarea
                            id={"textarea_for_id:" + vnode.attrs.comment.id}
                            class="textarea"
                            placeholder="Content"
                        >
                        </textarea>
                    </div>
                    <button class="ui primary submit labeled icon button" >
                        <i class="icon edit"></i> Add Reply
                    </button>
                    <br/>
                    <br/>

                </form>
                {vnode.attrs.comment.children.map(com_child => <Comment comment={com_child} />)}
            </div>
        </div>
}

export default Comment;
