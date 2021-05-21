let Searchbar = {
    render: async function () {
        let view =  /*html*/`
             <nav id="searchbar_component" class="bg-primary-light">
                <div class="mx-16 flex items-center justify-between h-16">

                    <!-- Logo -->
                    <a href="#"> 
                        <img class="h-10" src="/logo.png" alt="Site logo" />
                    </a>
                    <!-- Search textbox -->
                    <form action="/search" class="w-1/2 relative">
                        <input type="search" placeholder="&nbsp &nbsp Press Ctrl + / to focus here."
                            class="p-2 text-gray-700 w-full bg-secondary-light rounded placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:bg-background-light">
                        <button type="submit"
                            class="bg-primary-light text-white rounded font-lg absolute top-0 right-0 bottom-0 mt-1 mr-1 mb-1 px-4 font-semibold hover:bg-primary-light focus:outline-none focus:shadow-outline">
                            Search
                        </button>
                    </form>

                    ${window.localStorage['_user_email']
                ?
                    /*html*/`
                    <div class="flex">
                        <a href="#" class="static right-0 px-4 py-1 mr-4 rounded-md text-sm font-medium text-white hover:text-white hover:bg-secondary-light focus:outline-none focus:text-white focus:bg-gray-700 ">                         
                             <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-300 pt-2" viewBox="0 0 20 20" fill="none"  stroke="currentColor">
                            <path fill-rule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clip-rule="evenodd" />
                            </svg>
                            <!-- <div class = "absolute h-96 w-96 border border-red-500"></div> -->
                        </a>

                        <!-- <div x-show="open" x-transition:enter="transition ease-out duration-100" x-transition:enter-start="transform opacity-0 scale-95" x-transition:enter-end="transform opacity-100 scale-100" x-transition:leave="transition ease-in duration-75" x-transition:leave-start="transform opacity-100 scale-100" x-transition:leave-end="transform opacity-0 scale-95" class="absolute w-60 px-5 py-3 dark:bg-gray-800 bg-white rounded-lg shadow border dark:border-transparent mt-5">
                            <ul class="space-y-3 dark:text-white">
                                <li class="font-medium">
                                <a href="#" class="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700">
                                    <div class="mr-3">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                    </div>
                                    No Messages
                                </a>
                                </li>
                            </ul>
                        </div> -->
                        
                        <a href="#"
                                class="px-1 py-1 rounded-md text-sm font-medium text-white hover:text-white hover:bg-secondary-light focus:outline-none focus:text-white focus:bg-gray-700">
                                    <img class="w-10 h-10 inline border border-gray-600 rounded-md" src="avatar.jpg" />
                                    <span class="px-2"> Hi ${window.localStorage['_user_nick']}</span>

                        </a>
                    </div>
                    `
                :
                    /*html*/`
                    <div>
                        <!-- Login button -->
                        <a href="/#/login"
                            class="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white hover:bg-secondary-light">
                            Login
                        </a> &nbsp

                        <!-- Signup Button -->
                        <a href="/#/register"
                            class="text-white rounded font-lg px-6 py-2 font-semibold bg-pink-400 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Register
                        </a>
                    </div>`
            }
                </div>

            </nav>

        `
        return view
    },
    control: async function () {
        // searchbar_component.addEventListener("load", async () => {
        //     eva.replace()
        //     alert("SSS")
        // });
    }

}

export default Searchbar;