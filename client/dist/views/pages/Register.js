let create_user = async (email, password) => {
    const payload = {
        "user_email"    : email,
        "user_password" : password,
    };
    const options = {
        method: 'POST',
        // mode: 'no-cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip'
        },
        body: JSON.stringify(payload)
    };
    try {
        const response = await fetch(`http://localhost:3000/api/v1/user/signup`, options)
        console.log(response.status)
        const json = await response.json()
        console.log(json)
        return json
    } catch (err) {
        console.log('ERROR RETURED: ', err)
    }
}

let Register = {
    onlyAllow: 'anon',
    state: {},
    load: async function () {}, 
    render: async function () {
        return /*html*/ `
            <section class="section pageEntry col-span-3 bg-primary-light rounded shadow-md">
                <div class="px-4 py-16 px-16 space-y-6">
                    <h2 class="text-center text-3xl font-extrabold text-gray-200">
                        Create your new Digglu account
                    </h2>

                    <input type="email" id="email_input" placeholder="&nbsp &nbsp Enter your Email Address"
                        class="p-2 text-gray-700 w-full bg-secondary-light rounded placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:bg-background-light"/>

                    <input type="password" id="pass_input" placeholder="&nbsp &nbsp Enter a Password"
                        class="p-2 text-gray-700 w-full bg-secondary-light rounded placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:bg-background-light"/>

                    <input type="password" id="repeat_pass_input" placeholder="&nbsp &nbsp Re-enter the Password"
                        class="p-2 text-gray-700 w-full bg-secondary-light rounded placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:bg-background-light"/>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input id="remember_me" name="remember_me" type="checkbox" class="h-4 w-4 text-white ">
                            <label for="remember_me" class="ml-2 block text-sm text-gray-100">
                            Remember me
                            </label>
                        </div>

                        <div class="text-sm">
                            <a href="#" class="font-medium text-gray-200 underline">
                            Forgot your password?
                            </a>
                        </div>
                    </div>

                    <button type="submit" id="register_submit_btn" class="p-2 w-1/3 bg-danger-light text-lg font-bold text-gray-200"> Register </button>
                    <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-rose-600 hover:bg-rose-500 focus:border-rose-700 active:bg-rose-700 transition ease-in-out duration-150 cursor-not-allowed" disabled="">
                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing
                    </button>
                </div>
            </section>
        `
    },
    // All the code related to DOM interactions and controls go in here.
    // This is a separate call as these can be registered only after the DOM has been painted
    control: async function () {
        document.getElementById("register_submit_btn").addEventListener ("click", async () => {
            let email       = document.getElementById("email_input").value;
            let pass        = document.getElementById("pass_input").value;
            let repeatPass  = document.getElementById("repeat_pass_input").value;
            let flash       = document.getElementById("flashbar");
            let flash_txt   = document.getElementById("flashbar_text");
            if (pass != repeatPass) {
                // alert (`The passwords dont match`)
                flash.classList.toggle('hidden')
                flash_txt.innerText = `The Passwords don't match`
            } else if (email =='' | pass == '' | repeatPass == '') {
                flash.classList.toggle('hidden')
                flash_txt.innerText = `The fields cannot be empty`
            } else {
                let result = await create_user(email, pass)
                if (result.status == 'success') {
                // if (result.success == true) {
                    alert (`User with emailid ${email} was successfully created`)
                } else {
                    alert (`Failed: ${result.message}`)
                    flash.classList.toggle('hidden')
                    flash_txt.innerText = `${result.message}`
                }

                // alert(`User with email ${email.value} was successfully submitted!`)
            }    
        })
    }
}

export default Register;