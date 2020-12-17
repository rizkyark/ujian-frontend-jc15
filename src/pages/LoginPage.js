import Axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, Input } from "reactstrap";
import { api_url } from "../helpers/api_url";
import { loginAct, fetchCartAct } from "../redux/actions";

class LoginPage extends Component {
	state = {
		loginInfo: {
			email: "",
			password: "",
		},
	};

	onchangeInput = (e) => {
		this.setState({
			loginInfo: { ...this.state.loginInfo, [e.target.id]: e.target.value },
		});
	};
	clickLogin = () => {

		var regex = /^(?=.*\d)(?=.*[a-z]).{6,}$/;
		const { email, password } = this.state.loginInfo;

		if (email.match(regex) && password.match(regex)) {
			Axios.get(`${api_url}/users?email=${email}&password=${password}`)
				.then((res) => {
					if (res.data.length === 1) {
						this.props.loginAct(res.data[0]);
						localStorage.setItem("id", res.data[0].id);
						this.props.fetchCartAct(res.data[0].id);
					} else if (res.data.length === 0) {
						Axios.post(`${api_url}/users`, { email: email, password: password })
							.then((res) => {
								this.props.loginAct(res.data);
								localStorage.setItem("id", res.data.id);
								console.log(res.data);
								this.props.fetchCartAct(res.data.id);
							})
							.catch((err) => {
								console.log(err);
							});
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			alert("email & password minimal 6 karakter dan mengandung angka ");
		}
	};
	render() {
		const { userID } = this.props;
		if (userID !== 0) {
			return <Redirect to="/" />;
		}
		return (
			<div style={{
				display: "flex",
				justifyContent: "center",
				flexDirection: "column",
				alignItems: "center",
				minHeight: "60vh"
			}}>
				<h2>KYAR.</h2>
				<h6>Please Register or Login</h6>
				<div>
					<Input
						size="40"
						placeholder="email"
						type="email"
						id="email"
						onChange={this.onchangeInput}
					/>
				</div>
				<div>
					<Input
						size="40"
						placeholder="password"
						type="password"
						id="password"
						onChange={this.onchangeInput}
					/>
				</div>
				<div>
					<Button style={{width:"340px"}} className="my-2" onClick={this.clickLogin}>Login</Button>
				</div>
			</div>
		);
	}
}
const mapStatetoPros = (state) => {
	return {
		userID: state.user.id,
		emailUser: state.user.email,
	};
};

export default connect(mapStatetoPros, { loginAct, fetchCartAct })(
	LoginPage
);
