let signin_user = async (email, password) => {
    const payload = {
        "email": email,
        "password": password,
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
        const response = await fetch(`http://localhost:3000/api/v1/user/signin`, options)
        const json = await response.json();
        console.log(json)
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}
let Signin = {
    onlyAllow: 'anon',
    state: {},
    load: async function () { },
    render: async function () {
        return /*html*/ `
            <section class="section pageEntry col-span-3 bg-primary-light rounded shadow-md">
                <div class="py-16 px-16 space-y-4">
                    <h2 class="text-center text-3xl font-extrabold text-gray-200">
                        Signin to Digglu
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

                    <button type="button" id="signin_submit_btn" class="p-2 w-1/3 bg-danger-light text-lg font-bold text-gray-200"> Signin </button>
                </div>
            </section>
        `
    },
    // All the code related to DOM interactions and controls go in here.
    // This is a separate call as these can be registered only after the DOM has been painted
    control: async function () {
        document.getElementById("signin_submit_btn").addEventListener("click", async () => {
            let email       = document.getElementById("email_input").value;
            let pass        = document.getElementById("pass_input").value;
            let flash       = document.getElementById("flashbar");
            let flash_txt   = document.getElementById("flashbar_text");
            let store       = window.localStorage

            if (email == '' | pass == '') {
                alert(`The fields cannot be empty`)
            } else {
                // Start the progress on button click
                // const progressBar = document.getElementById('progress-bar');
                // progressBar.style.transition = 'width 1.5s';
                // progressBar.style.visibility = 'visible';
                // progressBar.style.width = `60%`;

                let result = await signin_user(email, pass)
                if (result.status == 'success') {

                    store.setItem('auth_type',  result.data.auth_type)
                    store.setItem('email',      result.data.email)
                    store.setItem('nick',       result.data.nick)
                    store.setItem('flair',      result.data.flair)
                    store.setItem('thumb',      result.data.thumb)
                    store.setItem('role',       result.data.role)
                    store.setItem('level',      result.data.level)
                    store.setItem('stars',      result.data.stars)

                    // TODO - if user has a back histroy, do window.history.back()
                    // window.location = '/'
                } else if (result.status == 401) {
                    flash.classList.toggle('hidden')
                    flash_txt.innerText = `${result.message}`
                } else {
                    console.log(`Signin Failed: ${result.errorMessage}`)
                }

                // alert(`User with email ${email.value} was successfully submitted!`)
            }
        })
    }
}

export default Signin;