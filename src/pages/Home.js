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
			<div class="columns is-0 pageEntry">
                { 
                state.data.length === 0
                ?
                "Loading..."
                :
                state.data.map( post => (
                	<Card post={post}/>
                )) }
			</div>
    	)
	}

};

export default Home;