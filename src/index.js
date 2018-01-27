const m = require("mithril")


import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Logout from './pages/Logout'
import PostRead from './pages/PostRead'


m.route.prefix('#')

m.route(document.body, '/', {
    '/' : {
        render: () => m(Layout, m(Home))
    },
    '/about' : {
        render: () => m(Layout, m(About))
    },
    '/login' : {
        render: () => m(Layout, m(Login))
    },
    '/logout' : {
        render: () => m(Layout, m(Logout))
    },
    '/:id': {
        render: () => m(Layout, m(PostRead))
    },    
})