const m = require("mithril")
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

import backend from "./../services/backend.js";

const PostRead = {
    data: {},

    oninit: async ({ state }) => {
        NProgress.start();
        Object.assign(state, {
            data: await backend.get_current_post(m.route.param().id),
        }
        )
        m.redraw()
        NProgress.done();
    },

    view: ({ state }) =>
        (
            <article class="ui container">
                <br/>
                {!state.data.author ?
                    <div class="main">
                        <h2> Loading.... </h2>
                    </div>
                    :
                <div class="main">
                    <div class="ui items">
                        <div class="item">
                            <div class="ui medium image">
                                <img src={state.data.thumb} />
                            </div>

                            <div class="content">

                                <a class="header">{state.data.title}</a>
                                <div class="ui comments">                      
                                    <div class="comment">
                                        <a class="avatar">
                                            <img src="http://via.placeholder.com/50x50.png"/>
                                        </a>
                                        <div class="content">
                                            <a class="author">Matt</a>
                                            <div class="metadata">
                                                <span class="date">Today at 5:42PM</span>
                                            </div>
                                            <div class="text">
                                                <p>{state.data.content}</p>
                                            </div>
                                            <br />
                                            <div class="actions">
                                                <div class="ui left labeled button" tabindex="0">
                                                    <a class="ui basic right pointing label"> 2,048 </a>
                                                    <div class="ui button">
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

                                <br />

                            </div>

                        </div>

                    </div>

                    Tags: &nbsp
                    <div class="ui label">
                        <div class="ui mini circular blue label">22</div>
                        IMAX
                
                        <a href="#"><i class="thumbs up icon"></i> </a>
                        <a href="#"><i class="delete icon"></i> </a>
                    </div>

                    <h3 class="ui dividing header">Comments</h3>

 
                </div>
                }
            </article>
        )
};

export default PostRead;