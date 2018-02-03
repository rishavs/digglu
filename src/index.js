const m = require("mithril")


import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Logout from './pages/Logout'
import PostNew from './pages/PostNew'
import PostRead from './pages/PostRead'
import PostEdit from './pages/PostEdit'


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
    '/new': {
        render: () => m(Layout, m(PostNew))
    },      
    '/:id': {
        render: () => m(Layout, m(PostRead))
    },     
    '/:id/edit': {
        render: () => m(Layout, m(PostEdit))
    },    
})