const m = require("mithril")

const Comment = {
    actions: {
        toggle_comment_reply: (id) => {
            var component = document.getElementById("reply_for_id:" + id)
            if (component.style.display === 'none') {
                component.style.display = 'block';
            } else {
                component.style.display = 'none';
            }
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
                <form class="ui reply form" id={"reply_for_id:" + vnode.attrs.comment.id} style="display:none">
                    <div class="field">
                        <textarea></textarea>
                    </div>
                    <div class="ui primary submit labeled icon button">
                        <i class="icon edit"></i> Add Reply
                    </div>
                </form>
                {vnode.attrs.comment.children.map(com_child => <Comment comment={com_child} />)}
            </div>
        </div>
}

export default Comment;
