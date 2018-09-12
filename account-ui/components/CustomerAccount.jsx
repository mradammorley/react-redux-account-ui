import React from "react";
import { connect } from "react-redux";
import TextLink from "../../react-lib/TextLink.jsx";
import { modalActions } from "../actions/modal.actions";
import PropTypes from "prop-types";
import _ from "lodash";
import AccountMenuDesktop from "./AccountMenuDesktop.jsx";
import HeartIcon from "./HeartIcon.jsx";
import BasketIcon from "./BasketIcon.jsx";

class CustomerAccount extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			isMenuVisible: false
		};

		this.onToggleMenuVisibility = this.onToggleMenuVisibility.bind(this);
		this.renderSignin = this.renderSignin.bind(this);
	}

	renderSignin() {
		this.props.dispatch(modalActions.showModal());
	}

	onToggleMenuVisibility() {
		this.setState(previousState => ({
			isMenuVisible: !previousState.isMenuVisible
		}));
	}

	render() {

		if(this.props.authentication.isSignedIn && this.props.authentication.user) {
			let dropDownMenu;
			let accountHeader;

			if (this.state.isMenuVisible) {
				dropDownMenu = (
					<AccountMenuDesktop/>
				);
			} else  {
				dropDownMenu = "";
			}

			if (this.props.isSimpleVersion) {
				accountHeader = (
					<a href="/customer/account/logout/#">Sign out</a>
				)
			} else {
				accountHeader = (
					<div className={ "user-panel" } >
						<div className="users-name" onClick={this.onToggleMenuVisibility} >{this.props.authentication.user.firstname} {this.props.authentication.user.lastname}</div>
						<div className="user-icons">
							<HeartIcon wishlistSize={ _.parseInt(this.props.authentication.wishlistsize) }/>
							<BasketIcon basketSize={ _.parseInt(this.props.authentication.basketsize) }/>
						</div>

						{ dropDownMenu }
					</div>
				);
			}

	        return (
		        <div className={ this.props.className}>
		            { accountHeader }
		        </div>
	        )
        }

		let signInLink;
        if (this.props.isSimpleVersion) {
	        signInLink = (
		        <div className={ "user-panel sign-in" }>
			        <TextLink linkText="Sign In" handler={ this.renderSignin } />
		        </div>
	        )
        } else {
	        signInLink = (
		        <div className={ "user-panel sign-in" }>
			        <TextLink linkText="Sign In" handler={ this.renderSignin } />
			        <div className="user-icons">
				        <BasketIcon basketSize={ _.parseInt(this.props.authentication.basketsize) }/>
			        </div>
		        </div>
	        )
        }

        return (
        	<div className={ this.props.className }>
		        { signInLink }
	        </div>
        )
    }

}

CustomerAccount.propTypes = {
	className: PropTypes.string,
	isSimpleVersion: PropTypes.bool
};

const mapStateToProps = (state) => {
	return {
        authentication: state.authentication,
		dispatch: state.dispatch
    };
};

export default connect(mapStateToProps)(CustomerAccount)
