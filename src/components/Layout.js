const m = require("mithril")

import Navbar from './Navbar.js'

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