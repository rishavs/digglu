const m = require("mithril")

import backend from "./../services/backend.js";

let state = {
    uname: "",
    pass: ""
}

const actions ={
    setUname: (v) => {state.uname = v},
    setPass: (v) => {state.pass = v},

    handleSubmit : async () => {
        console.log("Attempting to log in...")
        await backend.login(state.uname, state.pass)
        m.route.set("/")
    },
}

const Login = {

	view: () => {
		return (

			<div class="columns is-centered pageEntry">
              	<article class="card is-rounded">
                	<div class="card-content">
                		<form >
	                  		<h1 class="title">Login</h1>
	                  		<p class="control has-icon">
	                    		<input class="input" type="email" placeholder="Email" autocomplete="on" oninput= {m.withAttr("value", actions.setUname)} value= {state.uname}/>
	                    		<i class="fa fa-envelope"></i>
	                  		</p>
	                  		<p class="control has-icon">
	                    		<input class="input" type="password" placeholder="Password" autocomplete="on" oninput= {m.withAttr("value", actions.setPass)} value= {state.pass} />
	                    		<i class="fa fa-lock"></i>
	                  		</p>
	                  		<p class="control">
	                    		<label class="checkbox">
	                      			<input type="checkbox" />
	                      			Remember me
	                    		</label>
	                  		</p>
	                  		<p class="control">
	                    		<button type="submit" class="button is-primary is-medium is-fullwidth" onclick={actions.handleSubmit}>
	                      			<i class="fa fa-user"></i>
	                      			Login
	                    		</button>
	              			</p>
              			</form>
                	</div>
              	</article>
            </div>
		)
	}
};

export default Login;
