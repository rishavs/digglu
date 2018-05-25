const m = require("mithril")
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

const NotFound404 = {
    oninit: () => {
        NProgress.start();
        NProgress.done();
    },
    view: () =>

        <main class="ui main container pageEntry">
            <div class="ui huge statistic">
                <div class="value">
                    404
                </div>
                <div class="label">
                    Page not found :(
                </div>
            </div>
        </main>

}

export default NotFound404;
