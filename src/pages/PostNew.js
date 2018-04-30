const m = require("mithril");
import "nprogress/nprogress.css";
import NProgress from "nprogress";

import backend from "./../services/backend.js";

// List of tags that i previously pulled from my backend
let tagStore = [];
// Output list of tags for which the badge/buttons will be created below the input
let tagOutput = [];
// List of filtered strings from tagStore which match whats written in the input. This is used to populate the drop down
let tagFilter = [];
// Temp holding of the input text
let tagInput = "";

let data = {
    title: "",
    link: "",
    thumb: "",
    content: "",
    tags: ["cat", "dog"]
};

const actions = {
    setPostTitle: v => {
        data.title = v;
    },
    setPostLink: v => {
        data.link = v;
    },
    setPostThumb: v => {
        data.thumb = v;
    },
    setPostContent: v => {
        data.content = v;
    },

    addTagToDropDown: val => {
        tagInput = val;
        if (tagInput.length > 2) {
            tagFilter = tagStore.filter(item => {
                return item.includes(tagInput);
            });
            console.log("Found match with : " + tagFilter);
        }
    },

    addTagToList: val => {
        tagFilter = [];
        tagInput = "";
        console.log("Adding element to tags : " + val);
        tagOutput.push(val);
        console.log("Updated tags list : " + tagOutput);
    },

    removeTag: val => {
        // function to remove a tag by clicking on the cross button
        tagOutput.splice(tagOutput.indexOf(val), 1);
        console.log("Updated tags list : " + tagOutput);
    },

    handleSubmit: async () => {
        NProgress.start();
        data.author = await firebase.auth().currentUser.uid;
        let new_id = await backend.add_new_post(data);
        m.route.set("/" + new_id);
        NProgress.done();
    }
};

const PostNew = {
    oninit: async () => {
        NProgress.start();
        tagStore = await backend.get_all_tags();
        console.log(tagStore);
        NProgress.done();
    },

    view: () =>
        <article class="pageEntry">
            <form>
                <div class="field">
                    <label class="label">Title</label>
                    <div class="control">
                        <input
                            class="input"
                            type="text"
                            placeholder="Title"
                            oninput={m.withAttr("value", actions.setPostTitle)}
                        />
                    </div>
                </div>

                <div class="field">
                    <label class="label">Link</label>
                    <div class="control">
                        <input
                            class="input"
                            type="text"
                            placeholder="Link"
                            oninput={m.withAttr("value", actions.setPostLink)}
                        />
                    </div>
                </div>

                <div class="field">
                    <label class="label">Tags</label>
                    <div class="control">
                        <input
                            class="input"
                            type="text"
                            oninput={m.withAttr(
                                "value",
                                actions.addTagToDropDown
                            )}
                            value={tagInput}
                        />
                    </div>
                    <div
                        class={
                            "dropdown " +
                            (tagFilter.length != 0 && tagInput.length > 2
                                ? "is-active"
                                : "")
                        }
                    >
                        <div
                            class="dropdown-menu"
                            id="dropdown-menu"
                            role="menu"
                        >
                            <div class="dropdown-content">
                                {tagFilter.length > 0
                                    ? tagFilter.map(item =>
                                            <a
                                                href=""
                                                class="dropdown-item"
                                                onclick={function(e) {
                                                    e.preventDefault();
                                                    actions.addTagToList(item);
                                                }}
                                            >
                                                {item}
                                          </a>
                                      )
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field is-grouped is-grouped-multiline">
                    {tagOutput.map(item =>
                        <div class="control">
                            <div class="tags has-addons">
                                <a class="tag is-link">
                                    {item}
                                </a>
                                <a
                                    class="tag is-delete"
                                    onclick={function() {
                                        actions.removeTag(item);
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div class="field">
                    <label class="label">Content</label>
                    <div class="control">
                        <textarea
                            class="textarea"
                            placeholder="Content"
                            oninput={m.withAttr(
                                "value",
                                actions.setPostContent
                            )}
                        />
                    </div>
                </div>

                <div class="field is-grouped">
                    <div class="control">
                        <button
                            class="button is-primary"
                            onclick={actions.handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                    <div class="control">
                        <button class="button is-text">Cancel</button>
                    </div>
                </div>
            </form>
        </article>
};

export default PostNew;
