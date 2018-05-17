const m = require("mithril")

const Card = {
    view: (vnode) => {
        return (
            <div class="ui card">
                <a class="image" href={vnode.attrs.post.link} >
                    <img src={vnode.attrs.post.thumb} style=" height: 200px; object-fit: cover ;" />
                </a>
                <div class="inverted content" style={{ background:'black', opacity: '0.75',position: 'absolute', bottom: 0, width: '100%', height: 'auto' }}>
                    <a class="header" href={'/' + vnode.attrs.post.id} oncreate={m.route.link}>{vnode.attrs.post.title}</a>
                    <div class="meta">
                        <a>Last Seen 2 days ago</a>
                    </div>
                </div>
            </div>

        )
    }
}

export default Card;
