var backend = {

    get_all_posts: async () => {
        console.log('Getting all posts')
        try {
            const ref = firebase.firestore().collection('posts')
            const response = await ref.get()
            let items = []
            response.forEach((doc) => {
                const item = {
                    'id':       doc.id,
                    'title':    doc.data().title,
                    'content':  doc.data().content,
                    'author':   doc.data().author,
                    'thumb':    doc.data().thumb,
                    'link':     doc.data().link,
                    'tags':     doc.data().tags
                }
                items.push(item)
            })
            console.log('Fetched ' + items.length + ' items')
            return items
        } catch (err) {
            console.log('Error getting documents', err)
        }
    },
    add_new_post: async(post) => {
    	console.log('Saving post as user: ' + post.author)
    	try {
    		post.thumb = await backend.get_thumbnail(post.link)
        	const postRef = firebase.firestore().collection('posts')
        	const response = await postRef.add(post)
        	console.log("Document written with ID: ", response.id);
        	return response.id
    	} catch (err) {
            console.log('Error getting documents', err)
        }
    },

    get_current_post: async (id) => {
        console.log('Getting post ' + id)
        try {
            const ref = firebase.firestore().collection('posts').doc(id)
            const response = await ref.get()
            console.log('Document data:', response.data())
            return response.data()
        } catch (err) {
            console.log('Error getting documents', err)
        }
    },

    get_all_tags: async () => {
        console.log('Getting all tags... ')
        let items = []
        try {
            const ref = firebase.firestore().collection('tags')
            const response = await ref.get()
            // console.log(response)

            response.forEach((doc) => {
                items.push(doc.id)
            })
            console.log('Fetched ' + items.length + ' tags')
            // console.log(items)
            return items
        } catch (err) {
            console.log('Error getting documents', err)
        }
    },
    
    get_thumbnail: async (url) => {
        console.log('Getting thumbnail for url ' + url)
	    try {
		    const response = await fetch("http://api.proc.link/oembed?url=" + url)
		    const json = await response.json();

	        console.log("Received thumbnail:", json.thumbnail_url)
    		return json.thumbnail_url
	    }
	    catch (err) {
	        console.log('Error getting documents', err);
	    }
    },

    login: async (email, pass) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, pass);
            console.log("Logged In!");
        } catch (error) {
            console.log(error.toString())
        }

    },

    logout: async () => {
        try {
            await firebase.auth().signOut();
            console.log("Logged Out!");
        } catch (error) {
            console.log(error.toString());
        }
    },

}

export default backend