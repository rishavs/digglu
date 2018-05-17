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
                    <div class="ui comments">
                        <div class="comment">
                            <div class="content">
                                <div class="ui items">
                                    <div class="item">
                                        <div class="ui mini image">
                                            <img src="http://via.placeholder.com/350x400.png" />
                                        </div>
                                        <div class="content">
                                            <a class="author">Matt</a>
                                            <div class="metadata">
                                                <span class="date">Today at 5:42PM</span>
                                            </div>
                                            <div class="extra">
                                                Detective Extraordinaire
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <img class="ui medium left floated image" src={state.data.thumb}/>
                    <h1> {state.data.title} </h1>

                    <p>{state.data.content}</p>
                    <div class="row">
                        <div class="ui left labeled button" tabindex="0">
                            <a class="ui basic right pointing label"> 2,048 </a>
                            <div class="ui button">
                                <i class="heart icon"></i> Like
                            </div>
                        </div>

                        <div class="ui left labeled button" tabindex="0">
                            <a class="ui basic right pointing label"> 2,049 </a>
                            <div class="ui basic button">
                                <i class="reply icon"></i> Reply
                            </div>
                        </div>
                        <button class="ui  icon button">
                            <i class="ellipsis vertical icon"></i>
                        </button>
                    </div>
                    <h3 class="ui dividing header">Tags</h3>
                    <div class="row">

                        <div class="ui label">
                            Dogs 

                            <div class="detail">       512                      
                                <a href="#"><i class="thumbs up icon"></i> </a>
                                <a href="#"><i class="delete icon"></i> </a>
                            </div>

                        </div>
                    </div>
                    <h3 class="ui dividing header">Comments</h3>
                    
                    
                </div>
                }
            </article>
        )
};

export default PostRead;