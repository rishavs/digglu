const m = require("mithril")


import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
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
    '/:id': {
        render: () => m(Layout, m(PostRead))
    },    
})