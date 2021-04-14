let Searchbar = {
    render: async function () {
        let view =  /*html*/`
             <nav class="bg-primary-light">
                <div class="mx-16 flex items-center justify-between h-16">

                    <!-- Logo -->
                    <img class="h-10" src="/logo.png" alt="Site logo" />

                    <!-- Search textbox -->
                    <form action="/search" class="w-1/2 relative">
                        <input type="search" placeholder="&nbsp &nbsp Press Ctrl + / to focus here."
                            class="p-2 text-gray-700 w-full bg-secondary-light rounded placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:bg-background-light">
                        <button type="submit"
                            class="bg-primary-light text-white rounded font-lg absolute top-0 right-0 bottom-0 mt-1 mr-1 mb-1 px-4 font-semibold hover:bg-primary-light focus:outline-none focus:shadow-outline">
                            Search
                        </button>
                    </form>
                    ${ window.localStorage['_user_email']
                    ?
                    /*html*/`
                    <a href="#"
                            class="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white hover:bg-secondary-light focus:outline-none focus:text-white focus:bg-gray-700">
                            User logged in Stuff
                        </a>
                    `
                    :
                    /*html*/`
                    <div>
                        <!-- Login button -->
                        <a href="#"
                            class="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white hover:bg-secondary-light focus:outline-none focus:text-white focus:bg-gray-700">
                            Login
                        </a>

                        <!-- Signup Button -->
                        <button
                            class="text-white rounded font-lg h-10 px-8 font-semibold bg-danger-light hover:bg-primary-light focus:outline-none focus:shadow-outline">
                            Signup
                        </button>
                    </div>`
                    }
                </div>

            </nav>

        `
        return view
    },
    control: async function () { }

}

export default Searchbar;