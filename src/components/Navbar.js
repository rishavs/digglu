import LogoURL from '../../img/logo.png';
import backend from "./../services/backend.js";

const m = require("mithril")

export default {
    view: () => {
        return (
        	<nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
        		<div class="container">
        			<div class="navbar-brand">
        				<a class="navbar-item" href='/' oncreate={m.route.link}>
        					<img src={LogoURL} alt="alt text" height='30' width='110' />
        				</a>
        			</div>

        			<div class='navbar-menu'>
        				<div class='navbar-start'>
                            <a href="/about" class="navbar-item" oncreate={m.route.link}> About</a>
                            { !firebase.auth().currentUser
                            ?
                            <a href="/login" class="navbar-item" oncreate={m.route.link}> Login</a>
                            :
                            <a href="/logout" class="navbar-item" oncreate={m.route.link}> Logout</a>
                            }
        				</div>

        				<div class='navbar-end'>

        				</div>

        			</div>
        		</div>
        	</nav>
    	)
	}
}
