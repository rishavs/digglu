const m = require("mithril")

const Comment = {
    view: (vnode) =>
        <div class="comment">
            <a class="avatar">
                <img src="http://via.placeholder.com/50x50.png" />
            </a>
            <div class="content">
                <a class="author">Matt</a>
                <div class="metadata">
                    <span class="date">Today at 5:42PM</span>
                </div>
                <div class="text">
                    <p> ID: <span>{vnode.attrs.comment.id}</span></p>
                    <p> PARENT_ID: <span>{vnode.attrs.comment.parent_id}</span></p>
                    <p> Children num: <span>{vnode.attrs.comment.children.length}</span></p>
                    <p> Content: <span>{vnode.attrs.comment.content}</span></p>
                    {/* {vnode.attrs.comment.content} */}
                </div>
                <div class="actions">
                    <a class="reply">(250) <i class="thumbs up icon"></i></a>
                    <a class="reply">(2110) <i class="reply icon"></i></a>
                </div>
                {vnode.attrs.comment.children.map(com_child => <Comment comment={com_child}/> )}
            </div>
        </div>
}

export default Comment;
