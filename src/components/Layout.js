const m = require("mithril")

import Navbar from './Navbar.js'

const Layout = {
    // oninit: () => {
    //     firebase.auth().onAuthStateChanged(function (user) {
    //         if (user) {
    //             console.log('AUTH CHECK: Signed in user!')
    //             // store.dispatch('autoLogin', user).then(console.log(store.getters.getUser.email))
    //         } else {
    //             console.log('AUTH CHECK: No user!')
    //             // store.dispatch('autoLogout').then(console.log(store.getters.getUser))
    //         }
    //     })
    // },
    // oninit: function(vnode) {
    //     console.log("initialized")
    // },
    // oncreate: function(vnode) {
    //     console.log("DOM created")
    // },
    // onupdate: function(vnode) {
    //     console.log("DOM updated")
    //     vnode.dom.classList.add("pageExit")
    //     return new Promise(function(resolve) {
    //         setTimeout(resolve, 500)
    //     })
    // },
    // onremove: function(vnode) {
    //     console.log("removing DOM element")
    // },
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