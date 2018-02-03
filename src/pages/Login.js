const m = require("mithril")
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

import backend from "./../services/backend.js";

let state = {
    uname: "",
    pass: ""
}

const actions ={
    setUname: (v) => {state.uname = v},
    setPass: (v) => {state.pass = v},

    handleSubmit : async () => {
    	NProgress.start();
        console.log("Attempting to log in...")
        await backend.login(state.uname, state.pass)
        m.route.set("/")
        NProgress.done();
    },
}

const Login = {
    oninit: () => {
        NProgress.start();
        NProgress.done();
    },

	view: () => {
		return (

			<div class="columns is-centered pageEntry">
              	<article class="card is-rounded">
                	<div class="card-content">
                		<form >
	                  		<h1 class="title">Login</h1>
          		            <div class="field">
				                <label class="label">Email</label>
				                <div class="control has-icons-left has-icons-right">
				                    <input class="input is-danger" type="email" placeholder="Email" autocomplete="on" oninput= {m.withAttr("value", actions.setUname)} value= {state.uname}/>
				                    <span class="icon is-small is-left">
				                      <i class="fa fa-envelope"></i>
				                    </span>
				                    <span class="icon is-small is-right">
				                      <i class="fa fa-exclamation-triangle"></i>
				                    </span>
				                </div>
				                <p class="help is-danger">This email is invalid</p>
				            </div>

	                        <div class="field">
				                <label class="label">Password</label>
				                <div class="control">
				                    <input class="input" type="password" placeholder="Password" autocomplete="on" oninput= {m.withAttr("value", actions.setPass)} value= {state.pass} />
				                </div>
				            </div>

            				<div class="field">
                				<div class="control">
            	             		<button type="submit" class="button is-primary is-medium is-fullwidth" onclick={actions.handleSubmit}>
	                      			<i class="fa fa-user"></i>
	                      			Login
	                    			</button>
                				</div>
				           </div>

              			</form>
                	</div>
              	</article>
            </div>
		)
	}
};

export default Login;
