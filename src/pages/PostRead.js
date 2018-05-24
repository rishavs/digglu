const m = require("mithril");
import "nprogress/nprogress.css";
import NProgress from "nprogress";

import Tag from './../components/Tag'

import backend from "./../services/backend.js";

const PostRead = {
    data: {},

    oninit: async ({ state }) => {
        NProgress.start();
        Object.assign(state, {
            data: await backend.get_current_post(m.route.param().id)
        });
        m.redraw();
        NProgress.done();
    },

    view: ({ state }) =>
        <div class="ui main container ">

            {!state.data.author
                ? <div class="main">
                    <h2> Loading.... </h2>
                </div>
                :
                <div class="main">

                    <h1>{state.data.title}</h1>
                    <div class="ui items">
                        <div class="item">
                            <div class="ui medium image">
                                <img src={state.data.thumb} />
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
                                                <div class="rating right">
                                                    <i class="star icon"></i>
                                                    5 Faves
                                                </div>
                                            </div>

                                            <div class="text">
                                                {state.data.content}
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
                                                    <div class="ui button">
                                                        <i class="reply icon"></i> Reply
                                                </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>



                    <h3 class="ui dividing header">Tags</h3>

                        {Object.keys(state.data.tags).map((tag, val) =>
                            <Tag tagName={tag} tagScore={state.data.tags[tag]} />

                        )}


                    <h3 class="ui dividing header">Comments</h3>

                    <div class="ui threaded comments" style="max-width: 100%">

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
                                    {state.data.content}
                                </div>
                                <div class="actions">
                                    <a class="reply">(250) <i class="thumbs up icon"></i></a>
                                    <a class="reply">(2110) <i class="reply icon"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="comment">
                            <a class="avatar">
                                <img src="http://via.placeholder.com/50x50.png" />
                            </a>
                            <div class="content">
                                <a class="author">Elliot Fu</a>
                                <div class="metadata">
                                    <span class="date">Yesterday at 12:30AM</span>
                                </div>
                                <div class="text">
                                    {state.data.content}
                                </div>
                                <div class="actions">
                                    <a class="reply">(250) <i class="thumbs up icon"></i></a>
                                    <a class="reply">(2110) <i class="reply icon"></i></a>
                                </div>
                            </div>
                            <div class="comments">
                                <div class="comment">
                                    <a class="avatar">
                                        <img src="http://via.placeholder.com/50x50.png" />
                                    </a>
                                    <div class="content">
                                        <a class="author">Jenny Hess</a>
                                        <div class="metadata">
                                            <span class="date">Just now</span>
                                        </div>
                                        <div class="text">
                                            {state.data.content}
                                        </div>
                                        <div class="actions">
                                            <a class="reply">(250) <i class="thumbs up icon"></i></a>
                                            <a class="reply">(2110) <i class="reply icon"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="comment">
                            <a class="avatar">
                                <img src="http://via.placeholder.com/50x50.png" />
                            </a>
                            <div class="content">
                                <a class="author">Joe Henderson</a>
                                <div class="metadata">
                                    <span class="date">5 days ago</span>
                                </div>
                                <div class="text">
                                    Dude, this is awesome. Thanks so much
                                </div>
                                <div class="actions">
                                    <a class="reply">(250) <i class="thumbs up icon"></i></a>
                                    <a class="reply">(2110) <i class="reply icon"></i></a>
                                </div>
                            </div>
                        </div>
                        <form class="ui reply form">
                            <div class="field">
                                <textarea></textarea>
                            </div>
                            <div class="ui blue labeled submit icon button">
                                <i class="icon edit"></i> Add Reply
                            </div>
                        </form>
                    </div>
                </div>}
        </div>
};

export default PostRead;
