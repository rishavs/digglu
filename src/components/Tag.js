const m = require("mithril")

const Tag = {
    view: (vnode) => {
        return (
            <div class="ui label">
                {vnode.attrs.tagName}
                <div class="detail">
                    {vnode.attrs.tagScore}
                    <a href="#">
                        <i class="thumbs up icon" />
                    </a>
                    <a href="#">
                        <i class="delete icon" />
                    </a>
                </div>
            </div>

        )
    }
}

export default Tag;
