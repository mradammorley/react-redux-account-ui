import React from "react";
import PropTypes from "prop-types";

class HeartIcon extends React.Component {
    render() {

    	let bellNumberMarkUp;

	    bellNumberMarkUp = (
		    <img
			    src={"/skin/frontend/default/vashi/images/header/cart-numbers/" + this.props.wishlistSize + ".svg"}/>
	    );


        return (
        	<div className="HeartIcon notificationsBell">
				<a href="/wishlist/">
					<div className="bellNumber">
						{this.props.wishlistSize > 0 ? bellNumberMarkUp : ''}
					</div>
				</a>
            </div>
        )
    }

}

HeartIcon.propTypes = {
	wishlistSize: PropTypes.number
};

export default HeartIcon;
