const m = require("mithril")


const actions = {
    upvote_tag: (tName) => {
        console.log(tName + "upvoted")
    },
    downvote_tag: () => {
        console.log("downvoted")
    },
    click_tag: () => {
        m.route.set("/tag");
    },
}

const Tag = {
    view: (vnode) => {
        return (
            <div class="ui basic icon buttons" style=" margin:2px ;">
                <button class="ui button" onclick={() => actions.click_tag(vnode.attrs.tagName)}>
                    {vnode.attrs.tagName + " (" + vnode.attrs.tagScore + ")"}
                </button>

                {firebase.auth().currentUser ?

                    <div >
                        <button class="ui button" onclick={() => actions.upvote_tag(vnode.attrs.tagName)}>
                            <i class="thumbs up icon"></i>
                        </button>
                        <button class="ui button" onclick={() => actions.downvote_tag(vnode.attrs.tagName)}>
                            <i class="thumbs down icon"></i>
                        </button>
                    </div>

                    : null

                }
            </div>
        )
    }
}

export default Tag;
