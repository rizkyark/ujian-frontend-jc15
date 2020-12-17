import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Table } from "reactstrap";
import {
	fetchCartAct,
	deleteCartAct,
	addQtyAct,
	subQtyAct,
	checkoutAct,
} from "../redux/actions";
import Swal from "sweetalert2";

class CartPage extends Component {
	state = {};
	componentDidMount() {
		const { userID, fetchCartAct } = this.props;
		fetchCartAct(userID);
	}
	deleteBtn = (id, userID) => {
		const { deleteCartAct } = this.props;
		deleteCartAct(id, userID);
	};
	addBtn = (name, qty, id) => {
		const { addQtyAct, userID } = this.props;
		addQtyAct(name, qty, id, userID);
	};
	subBtn = (name, qty, id) => {
		const { subQtyAct, userID } = this.props;
		subQtyAct(name, qty, id, userID);
	};
	renderCart = () => {
		const { cart } = this.props;
		return cart.map((val) => {
			return (
				<tr>
					<td>{val.categoryID}</td>
					<td>{val.name}</td>
					<td>
						<img src={val.image} alt="img not found" height="50px" />
					</td>

					<td>
						<Button onClick={() => this.subBtn(val.name, val.qty, val.id)}>
							-
						</Button>
					</td>
					<td>{val.qty}</td>
					<td>
						<Button onClick={() => this.addBtn(val.name, val.qty, val.id)}>
							+
						</Button>
					</td>
					<td>{val.qty * val.price}</td>
					<td>
						<Button onClick={() => this.deleteBtn(val.id, val.userID)}>
							delete
						</Button>
					</td>
				</tr>
			);
		});
	};
	grandTotal = () => {
		const { cart } = this.props;
		let total = 0;
		cart.forEach((val) => {
			total += val.qty * val.price;
		});
		return total;
	};
	checkOut = () => {
		const { cart, userID, checkoutAct } = this.props;
		let date = new Date();
		let day = date.getDate();
		let month = date.getMonth();
		let year = date.getFullYear();
		const data = {
			date: `${day}-${month}-${year}`,
			total: this.grandTotal(),
			items: cart,
			userID: userID,
		};

		checkoutAct(data);
	};
	checkOutAlert = () => {
		Swal.fire({
			title: "Are you sure want to checkout?",
			icon: "question",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, check my cart out",
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire("Checkout Success");
				this.checkOut();
			}
		});
	};
	render() {
		const { cart } = this.props;
		if (cart.length === 0) {
			return (
				<div>
					<h1>Your cart is empty</h1>
				</div>
			);
		}
		return (
			<div>
				<Table style={{ textAlign: "center" }}>
					<thead>
						<tr>
							<th>Category ID</th>
							<th>name</th>
							<th>image</th>
							<th colspan="3">qty</th>
							<th>price</th>
							<th>action</th>
						</tr>
					</thead>
					<tbody>{this.renderCart()}</tbody>
					<tfoot>
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td>
								<h3>GrandTotal:</h3>
							</td>
							<td> Rp. {this.grandTotal().toLocaleString()}</td>
							<td>
								<Button onClick={this.checkOutAlert}>check out</Button>
							</td>
						</tr>
					</tfoot>
				</Table>
			</div>
		);
	}
}
const mapStatetoProps = (state) => {
	return {
		cart: state.cart.cart,
		userID: state.user.id,
	};
};
export default connect(mapStatetoProps, {
	fetchCartAct,
	deleteCartAct,
	addQtyAct,
	subQtyAct,
	checkoutAct,
})(CartPage);
