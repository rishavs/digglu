const m = require("mithril")

const Card = {
    view: (vnode) => {
        return (
            <div class="column is-3">
                <div class="card">
                    <div class="card-image">
                      <figure class="image is-4by3">
                            <a href={'/' + vnode.attrs.post.id} oncreate={m.route.link}>
                                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="alt text" height='30' width='110' />
                            </a>
                      </figure>
                    </div>

                    <div class="content">
                        {vnode.attrs.post.title}
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default Card;
