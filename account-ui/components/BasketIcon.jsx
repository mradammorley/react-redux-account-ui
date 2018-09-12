import React from "react";
import PropTypes from "prop-types";

class BasketIcon extends React.Component {
	render() {

		let cartNumberMarkUp

		cartNumberMarkUp = (
			<img src={"/skin/frontend/default/vashi/images/header/cart-numbers/" + this.props.basketSize + ".svg"}/>
		);

		return (
			<div className="BasketIcon headerBasket">
				<a href="/checkout/cart/">
					<div className="cartNumber">
						{this.props.basketSize > 0 ? cartNumberMarkUp : ''}
					</div>
				</a>
			</div> )
	}

}

BasketIcon.propTypes = {
	basketSize: PropTypes.number
};

export default BasketIcon;
