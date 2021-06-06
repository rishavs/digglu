let login_user = async (email, password) => {
    const payload = {
        "user_email": email,
        "user_password": password,
    }
    const options = {
        method: 'POST',
        credentials: 'include',
        // mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip'
        },
        body: JSON.stringify(payload)
    };
    try {
        const response = await fetch(`http://127.0.0.1:3000/api/v1/user/signin`, options)
        const json = await response.json();
        console.log(json)
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}
let Login = {
    onlyAllow: 'anon',
    state: {},
    load: async function () { },
    render: async function () {
        return /*html*/ `
            <section class="section pageEntry col-span-3 bg-primary-light rounded shadow-md">
                <div class="px-4 py-16 px-16 space-y-6">
                    <h2 class="text-center text-3xl font-extrabold text-gray-200">
                        Login to Digglu
                    </h2>
                    <input type="email" id="email_input" placeholder="&nbsp &nbsp Enter your Email Address"
                        class="p-2 text-gray-700 w-full bg-secondary-light rounded placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:bg-background-light"/>

                    <input type="password" id="pass_input" placeholder="&nbsp &nbsp Enter a Password"
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

                    <button type="button" id="login_submit_btn" class="p-2 w-1/3 bg-danger-light text-lg font-bold text-gray-200"> Signin </button>
                </div>
            </section>
        `
    },
    // All the code related to DOM interactions and controls go in here.
    // This is a separate call as these can be registered only after the DOM has been painted
    control: async function () {
        document.getElementById("login_submit_btn").addEventListener("click", async () => {
            let email = document.getElementById("email_input").value;
            let pass = document.getElementById("pass_input").value;
            let flash       = document.getElementById("flashbar");
            let flash_txt   = document.getElementById("flashbar_text");
            let store = window.localStorage

            if (email == '' | pass == '') {
                alert(`The fields cannot be empty`)
            } else {
                // Start the progress on button click
                // const progressBar = document.getElementById('progress-bar');
                // progressBar.style.transition = 'width 1.5s';
                // progressBar.style.visibility = 'visible';
                // progressBar.style.width = `60%`;

                let result = await login_user(email, pass)
                if (result.status == 'success') {

                    store.setItem('_auth_type', result.data.auth_type)
                    store.setItem('_user_email', result.data.user_email)
                    store.setItem('_user_nick', result.data.user_nick)
                    store.setItem('_user_flair', result.data.user_flair)
                    store.setItem('_user_thumb', result.data.user_thumb)
                    store.setItem('_user_role', result.data.user_role)
                    store.setItem('_user_level', result.data.user_level)
                    store.setItem('_user_stars', result.data.user_stars)

                    // TODO - if user has a back histroy, do window.history.back()
                    window.location = '/'
                } else if (result.status == 401) {
                    flash.classList.toggle('hidden')
                    flash_txt.innerText = `${result.message}`
                } else {
                    console.log(`Login Failed: ${result.errorMessage}`)
                }

                // alert(`User with email ${email.value} was successfully submitted!`)
            }
        })
    }
}

export default Login;