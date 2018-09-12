import React from 'react'
import PropTypes from 'prop-types'

class AccountMenuDesktop extends React.Component {

	render() {
		return (
			<ul className="myAccountDropdown">
				<div className="myAccountDropdownArrow" />
				<li className="myAccount"><a href="/customer/account/">My account</a></li>
				<li className="signOut"><a href="/customer/account/logout/#">Sign out</a></li>
			</ul>
		)
	}

}

AccountMenuDesktop.propTypes = {
	className: PropTypes.string
};

export default AccountMenuDesktop
