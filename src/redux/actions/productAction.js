import Axios from "axios";
import { api_url } from "../../helpers/api_url";

export const fetchProducts = () => {
	return (dispatch) => {
		Axios.get(`${api_url}/products`)
			.then((res) => {
				dispatch({
					type: "FETCH_PRODUCT",
					payload: res.data,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

// export const fetchProductById = (data) => {
// 	return (dispatch) => {
// 		Axios.get(`${api_url}/products/${data}`)
// 			.then((res) => {
// 				dispatch({
// 					type: "FETCH_PRODUCT_BY_ID",
// 					payload: res.data,
// 				});
// 			})
// 			.catch((err) => {});
// 	};
// };
