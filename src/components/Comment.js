const m = require("mithril")

const Comment = {
    view: () =>
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
                    {data.content}
                </div>
                <div class="actions">
                    <a class="reply">(250) <i class="thumbs up icon"></i></a>
                    <a class="reply">(2110) <i class="reply icon"></i></a>
                </div>
            </div>
        </div>
}

export default Comment;
