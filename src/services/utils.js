const m = require("mithril")

var utils = {

    //this simple function is there to ensure login checks on all buttons
    redirect_to_login_if_not_loggedin : () => {
        if (!firebase.auth().currentUser) {
            m.route.set("/login")
        }
    },
    
    list_to_tree: async (docs) => {
    
        var tree = [],
            childrenOf = {};
        var item, id, parentId;
    
        docs.forEach((item) => {

            id = item.id;
            parentId = item.data().parent_id || 0;
            // every item may have children
            childrenOf[id] = childrenOf[id] || [];
            // init its children
            item.children = childrenOf[id];
            if (parentId != 0) {
                // init its parent's children object
                childrenOf[parentId] = childrenOf[parentId] || [];
                // push it into its parent's children object
                childrenOf[parentId].push(item);
            } else {
                tree.push(item);
            }
        })
    
        return tree;
    }

}

export default utils