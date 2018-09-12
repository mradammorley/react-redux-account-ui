import React from "react";
import PropTypes from "prop-types";
import { combineClasses } from "./Utils.js";

class Input extends React.Component {
	constructor (props) {
		super(props);

		this.onInputChange = this.onInputChange.bind(this);
	}

	onInputChange(event) {
		event.preventDefault();
		const inputName = event.target.name;
		const inputValue = event.target.value;
		this.props.onChange(inputName, inputValue);
	}

	render() {
		let highlight = this.props.highlighted ? "highlight" : "";
		return (
			<input
				className={ combineClasses("Input", highlight, this.props.extraClassName) }
				type={ this.props.type }
				name={ this.props.name }
				placeholder={ this.props.placeholder }
				value={ this.props.value }
				onChange={ this.onInputChange }
			/>
		)
	}

}

Input.defaultProps = {
	type: "text"
};

Input.propTypes = {
	placeholder: PropTypes.string,
	name: PropTypes.string,
	type: PropTypes.oneOf(["text", "email", "password"]),
	value: PropTypes.string,
	onChange: PropTypes.func,
	highlighted: PropTypes.bool,
	extraClassName: PropTypes.string
};

export default Input
