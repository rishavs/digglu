const m = require("mithril");

import "nprogress/nprogress.css";
import NProgress from "nprogress";

import Tag from './../components/Tag'

import Comment from './../components/Comment'
import PostContent from './../components/PostContent'

import backend from "./../services/backend.js";
import Utils from "./../services/utils.js";

let post_data = {}
let comments_data = {}
let comments_map = {}

const PostRead = {
    oninit: async ({ state }) => {
        NProgress.start();
        post_data = await backend.get_current_post(m.route.param().id)
        m.redraw();

        comments_data = await backend.get_all_comments(m.route.param().id)
        console.log(comments_data)
        console.log("Converting to tree structure")

        comments_map = await Utils.list_to_tree(comments_data)
        console.log(comments_map)

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
                    {!comments_map.length > 0 ?
                        <h1> No comments </h1>
                        :
                        <div class="ui threaded comments" style="max-width: 100%">
                            {/* {comments_map.map(comment => console.log(comment) )} */}
                            {comments_map.map(comment => <Comment comment={comment}/> )}
                        </div>
                    }
                </div>
            }
        </div>
}

export default PostRead;
