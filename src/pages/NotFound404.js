const m = require("mithril")
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

const NotFound404 = {
    oninit: () => {
        NProgress.start();
        NProgress.done();
    },
    view: () => 

        <main class="pageEntry">
            <h1>404</h1>
            <h2>Page not found!</h2>
        </main>

}

export default NotFound404;
