import React from 'react';
import PropTypes from 'prop-types';
import { combineClasses } from "./Utils.js";

class TextLink extends React.Component {

	constructor (props) {
		super(props);

		this.onLinkClick = this.onLinkClick.bind(this);
	}

	onLinkClick(event) {
		event.preventDefault();
		const linkHref = event.target.href;
		this.props.handler(linkHref);
	}

	render() {

		let beforeText = (
				<p>{ this.props.beforeText }</p>
		);

		let afterText = (
			<p>{ this.props.afterText }</p>
		);

		return (
			<div className={ combineClasses("TextLink", this.props.extraClassName) }>
				{ this.props.beforeText ? beforeText : ""}
				<a href={ this.props.linkUrl } onClick={ this.onLinkClick }>{ this.props.linkText }</a>
				{ this.props.afterText ? afterText : ""}
			</div>
		)
	}

}


TextLink.propTypes = {
	beforeText: PropTypes.string,
	linkText: PropTypes.string.isRequired,
	afterText: PropTypes.string,
	linkUrl: PropTypes.string,
	handler: PropTypes.func.isRequired,
	extraClassName: PropTypes.string
};

export default TextLink
