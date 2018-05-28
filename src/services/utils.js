var utils = {
    list_to_tree: async (list) => {

        var ID_KEY = 'id';
        var PARENT_KEY = 'parent_id';
        var CHILDREN_KEY = 'children';
    
        var tree = [],
            childrenOf = {};
        var item, id, parentId;
    
        for (var i = 0, length = list.length; i < length; i++) {
            item = list[i];
            id = item[ID_KEY];
            parentId = item[PARENT_KEY] || 0;
            // every item may have children
            childrenOf[id] = childrenOf[id] || [];
            // init its children
            item[CHILDREN_KEY] = childrenOf[id];
            if (parentId != 0) {
                // init its parent's children object
                childrenOf[parentId] = childrenOf[parentId] || [];
                // push it into its parent's children object
                childrenOf[parentId].push(item);
            } else {
                tree.push(item);
            }
        };
    
        return tree;
    }

}

export default utils