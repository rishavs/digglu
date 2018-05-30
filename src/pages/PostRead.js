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
        comments_map = await Utils.list_to_tree(comments_data)
        m.redraw();

        NProgress.done();
    },
    onremove: () => {
        // reset flags
        post_data = {}
        comments_map = {}
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
                        <h4> Doesn't looks like anything to me... </h4>
                        :
                        <div class="ui threaded comments" >
                            {comments_map.map(comment => <Comment comment={comment}/> )}
                        </div>
                    }
                </div>
            }
        </div>
}

export default PostRead;
