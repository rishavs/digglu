const m = require("mithril")
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

const About = {
    oninit: () => {
        NProgress.start();
        NProgress.done();
    },
    view: () => 

        <main class="pageEntry">
            <h1>Hello world</h1>
            <h1>Hello world</h1>
            <h1>Hello world</h1>
            <h1>Hello world</h1>
            <h1>Hello world</h1>
            <h1>Hello world</h1>
            <h1>Hello world</h1>
            <h1>Hello world</h1>
        </main>

}

export default About;
