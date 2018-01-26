var backend = {

	get_all_posts : async () => {

		console.log("Getting all posts")
		const query = {
			"structuredQuery": {
				"from": [{"collectionId": "posts"}]
			}
		}
		
		try {
	        const response = await fetch("https://firestore.googleapis.com/v1beta1/projects/digglu-id/databases/(default)/documents/:runQuery", {
					    method: 'post',
					    body: JSON.stringify(query)
					  })
			const json = await response.json();
			console.log(response.status, response.statusText)
			// console.log(json)
	        const items = [];

	        json.forEach(doc => {
	        	const item = {
	        		'id' 		: doc.document.fields.id.stringValue,
	        		'title' 	: doc.document.fields.title.stringValue,
	        		'content' 	: doc.document.fields.content.stringValue,
	        		'author' 	: doc.document.fields.author.stringValue
	        	}
	            items.push(item);
			})
			// console.log(items)
	        console.log("Fetched " + items.length + " items")
	    	return items
	    }
	    catch (err) {
	        console.log('Error getting documents', err);
	    }
	},

    get_current_post: async (id) => {
        console.log('Getting post ' + id)
        try {
            const response = await fetch("https://firestore.googleapis.com/v1beta1/projects/digglu-id/databases/(default)/documents/posts/" + id)
			const json = await response.json();

			console.log(response.status, response.statusText)
            // console.log('Document data:', json)
            
            const item = {
            	'id' 		: json.fields.id.stringValue,
            	'title' 	: json.fields.title.stringValue,
            	'thumb' 	: json.fields.thumb.stringValue,
            	'author' 	: json.fields.author.stringValue,
            	'link' 		: json.fields.link.stringValue,
            	'content' 	: json.fields.content.stringValue,
            };
			// console.log('Returning Data : ', item)

            return item
        } catch (err) {
            console.log('Error getting documents', err)
        }
    },    

    login: async (id) => {
        console.log('Getting post ' + id)
        try {
            const response = await fetch("https://firestore.googleapis.com/v1beta1/projects/digglu-id/databases/(default)/documents/posts/" + id)
			const json = await response.json();

			console.log(response.status, response.statusText)
            // console.log('Document data:', json)
            
            const item = {
            	'id' 		: json.fields.id.stringValue,
            	'title' 	: json.fields.title.stringValue,
            	'thumb' 	: json.fields.thumb.stringValue,
            	'author' 	: json.fields.author.stringValue,
            	'link' 		: json.fields.link.stringValue,
            	'content' 	: json.fields.content.stringValue,
            };
			// console.log('Returning Data : ', item)

            return item
        } catch (err) {
            console.log('Error getting documents', err)
        }
    },

}

export default backend