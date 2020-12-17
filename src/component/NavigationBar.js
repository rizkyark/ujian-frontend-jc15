import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	NavbarText,
} from "reactstrap";
import { logoutAct } from "../redux/actions";
import "./navbar.css";

class NavBar extends Component {
	state = { isOpen: false };

	toggle = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};
	logout = () => {
		const { logoutAct } = this.props;
		logoutAct();
		localStorage.removeItem("id");
	};
	renderNavBarLoggedIn = () => {
		const { userID } = this.props;
		if (userID !== 0) {
			return (
				<DropdownMenu right>
					<Link to="/">
						<DropdownItem onClick={this.logout}>Logout</DropdownItem>
					</Link>
					<Link to="/cart" className="notification">
						<DropdownItem>Cart </DropdownItem>
						<span className="badge">{this.props.cart.length}</span>
					</Link>

					<DropdownItem divider />
					<Link to="/history">
						<DropdownItem>History</DropdownItem>
					</Link>
				</DropdownMenu>
			);
			// }
		} else {
			return (
				<DropdownMenu right style={{backgroundColor:"333333"}}>
					<Link to="/login">
						<DropdownItem style={{backgroundColor:"333333"}}>Login</DropdownItem>
					</Link>
					<DropdownItem divider />
				</DropdownMenu>
			);
		}
	};

	render() {
		const { userEmail } = this.props;
		return (
      <div>
        <Navbar
          className="navbar"
          style={{ backgroundColor: "#333333", color: "#D6D6D6" }}
          light
          expand="md"
        >
          <NavbarBrand
            className="ml-3"
            style={{ color: "#D6D6D6", display: "flex", alignItems: "center" }}
            href="/"
          >
            KYAR.
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <UncontrolledDropdown nav inNavbar >
                <DropdownToggle nav caret style={{color:"white"}}>
                  Menu
                </DropdownToggle>
                {this.renderNavBarLoggedIn()}
              </UncontrolledDropdown>
            </Nav>
            <NavbarText style={{color:"white"}}>{userEmail !== "" ? userEmail : ""}</NavbarText>
          </Collapse>
        </Navbar>
      </div>
    );
	}
}
const mapStatetoProps = (state) => {
	return {
		userID: state.user.id,
		userRole: state.user.role,
		userEmail: state.user.email,
		cart: state.cart.cart,
	};
};

export default connect(mapStatetoProps, { logoutAct })(NavBar);
