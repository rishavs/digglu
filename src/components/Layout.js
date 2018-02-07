const m = require("mithril")

import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = {
    view: (vnode) =>  {
        return (
        	<main>
            	<Navbar />
	        	  <section class="section">                  
                    <div class="columns">

                        <div class="column is-2">
                            <Sidebar />
                        </div>

                        <div class="column is-10">
                            <section class="section">
                                {vnode.children}
                            </section>
                        </div>
                        
                    </div>


                  </section>
            </main>
        )
    }
}

export default Layout;