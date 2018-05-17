const m = require("mithril")

import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = {
    view: (vnode) =>  {
        return (
        	<main>
            	<Navbar />

                {vnode.children}

            </main>
        )
    }
}

export default Layout;