var backend = {

    get_all_posts: async () => {
        console.log('Getting all posts')
        try {
            const ref = firebase.firestore().collection('posts')
            const response = await ref.get()
            const items = []
            response.forEach((doc) => {
                const item = {
                    'id': doc.id,
                    'title': doc.data().title,
                    'content': doc.data().content,
                    'author': doc.data().author,
                    'thumb': doc.data().thumb
                }
                items.push(item)
            })
            console.log('Fetched ' + items.length + ' items')
            return items
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