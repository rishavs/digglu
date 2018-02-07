const m = require("mithril")

const Sidebar = {
    view: (vnode) => {
        return (
            <div class="is-narrow-mobile is-fullheight section is-hidden-mobile">
                <p class="menu-label is-hidden-touch">Sidebar</p>
                <ul class="menu-list">
                    <li>
                        <a href='/' oncreate={m.route.link} >
                            <span class="icon">
                                <i class="fa fa-home" />
                            </span>{" "}
                            Home
                        </a>
                    </li>
                    <li>
                        <a href='/about' oncreate={m.route.link}>
                            <span class="icon">
                                <i class="fa fa-info" />
                            </span>{" "}
                            About
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Sidebar;
