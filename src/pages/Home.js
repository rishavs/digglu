const m = require("mithril")
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

import Card from './../components/Card'

import backend from "./../services/backend.js";



const Home = {
    data: [],
    
    oninit: async ({state}) => {
        NProgress.start();
        Object.assign(state, {
            data: await backend.get_all_posts(),
        })
        m.redraw()
        NProgress.done();
    },
    
    view: ({state}) => {
    	return (
            <article>
                <section class="section">
                <section class="section">
                    <div class="columns is-multiline is-variable is-1 ">
                        {state.data.length === 0
                            ? "Loading..."
                            : state.data.map(post => <Card post={post} />)}
                    </div>
                </section>
                </section>
            </article>
    	)
	}

};

export default Home;