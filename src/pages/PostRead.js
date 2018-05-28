const m = require("mithril");

import "nprogress/nprogress.css";
import NProgress from "nprogress";

import Tag from './../components/Tag'
import PostContent from './../components/PostContent'

import backend from "./../services/backend.js";

let post_data = {}
let comments_data = {}

const PostRead = {
    oninit: async ({ state }) => {
        NProgress.start();
        post_data = await backend.get_current_post(m.route.param().id)
        m.redraw();
        comments_data = await backend.get_all_comments(m.route.param().id)
        console.log(comments_data)
        m.redraw();
        NProgress.done();
    },
    onremove: () => {
        // reset flags
        post_data = {}
        comments_data = {}
    },
    view: ({ state }) =>
        <div class="ui main container ">

            {!post_data.author ?
                <div class="main">
                    <h2> Loading.... </h2>
                </div>
                :
                <div class="main">

                    <PostContent postData={post_data} />

                    <h3 class="ui dividing header">Tags</h3>
                    {Object.keys(post_data.tags).map((tag, val) =>
                        <Tag tagName={tag} tagScore={post_data.tags[tag]} />
                    )}

                    <h3 class="ui dividing header">Comments</h3>
                    {!comments_data.length > 0 ?
                        <h1> No comments </h1>
                        :
                        <div class="ui threaded comments" style="max-width: 100%">
                            {comments_data.map(comment =>
                                <div class="comment">
                                    <a class="avatar">
                                        <img src="http://via.placeholder.com/50x50.png" />
                                    </a>
                                    <div class="content">
                                        <a class="author">{comment.author}</a>
                                        <div class="metadata">
                                            <span class="date">Today at 5:42PM</span>
                                        </div>
                                        <div class="text">
                                            {comment.content}
                                        </div>
                                        <div class="actions">
                                            <a class="reply">(250) <i class="thumbs up icon"></i></a>
                                            <a class="reply">(2110) <i class="reply icon"></i></a>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    }
                </div>
            }
        </div>
}

export default PostRead;
