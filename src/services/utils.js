var utils = {
    nestify_comments: async (commentList) => {
        const commentMap = {};

        // move all the comments into a map of id => comment
        commentList.forEach(comment => commentMap[comment.id] = comment);

        // iterate over the comments again and correctly nest the children
        commentList.forEach(comment => {
            if (comment.parent_id !== null) {
                const parent = commentMap[comment.parent_id];
                parent.children = (parent.children || []).push(comment);
            }
        });

        // filter the list to return a list of correctly nested comments
        return commentList.filter(comment => {
            return comment.parent_id === null;
        });
    },
    flatToHierarchy: async (flat) => {

        var roots = [] // things without parent
    
        // make them accessible by guid on this map
        var all = {}
    
        flat.forEach(function(item) {
          all[item.id] = item
        })
    
        // connect childrens to its parent, and split roots apart
        Object.keys(all).forEach(function (id) {
            var item = all[id]
            if (item.parent_id === null) {
                roots.push(item)
            } else if (item.parent_id in all) {
                var p = all[item.parent_id]
                if (!('Children' in p)) {
                    p.Children = []
                }
                p.Children.push(item)
            }
        })
    
        // done!
        return roots
    }

}

export default utils