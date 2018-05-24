import LogoURL from '../../img/logo.png';
import backend from "./../services/backend.js";

const m = require("mithril")

export default {
	view: () => {
		return (

			<div class="ui fixed menu">
				<div class="ui container">
					<a href="/" class="header item" oncreate={m.route.link}>
						<img class="logo" src={LogoURL} />
        			</a>
					<div class=" menu" style="width: 100%;">
						<div class="ui item" style="width: 100%;">
							<div class="ui action input">
								<input type="text" placeholder="Search..." />
								<select class="ui compact selection dropdown">
									<option value="all">All</option>
									<option selected="" value="articles">Posts</option>
									<option value="products">Tags</option>
								</select>
								<div class="ui blue basic button">Search</div>
							</div>
						</div>
					</div>

					{!firebase.auth().currentUser ?
						<div class="item">
							<a href="/login" class="ui blue button" oncreate={m.route.link}>Login</a>
						</div>
						:
						<div class="right menu">
							<div class="item">
								<a href="/p/new" class="ui blue button" oncreate={m.route.link}>New Post</a>
							</div>
							<div class="ui simple dropdown item">
								<i class="bullhorn big icon"></i> <i class="dropdown icon"></i>
								<div class="menu">
									<a class="item" href="#">Message 1</a>
									<a class="item" href="#">Message 2</a>
									<div class="divider"></div>

									<a class="item" href="#">Something</a>
								</div>
							</div>

							<div class="ui simple dropdown item">
								<i class="user circle big icon"></i> <i class="dropdown icon"></i>
								<div class="menu">
									<a class="item" href="#">Profile</a>
									<a class="item" href="#">Settings</a>
									<div class="divider"></div>
									<a href="/logout" class="item" oncreate={m.route.link}>Logout</a>
								</div>
							</div>

						</div>
					}
				</div>
			</div>
		)
	}
}
