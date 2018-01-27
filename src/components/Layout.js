const m = require("mithril")
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

import Navbar from './Navbar'

const Layout = {
    view: (vnode) =>  {
        return (
        	<main>
            	<Navbar />
	        	<div class='container is-fluid'>
	        	  <section class="section">{vnode.children}</section>
            	</div>
            </main>
        )
    }
}

export default Layout;