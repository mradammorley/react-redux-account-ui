import React from "react";
import PropTypes from "prop-types";
import { combineClasses, getRandomId } from "./Utils.js";

class Checkbox extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			isChecked: this.props.defaultChecked || false
		};

		this.onCheckToggle = this.onCheckToggle.bind(this);
	}

	onCheckToggle() {
		this.setState({isChecked: !this.state.isChecked}, () => {
			this.props.onToggle(this.props.name, this.state.isChecked);
		});

	}

	render() {

		const inputId = getRandomId(10);
		let highlight = this.props.highlighted ? "highlighted" : "";

		return (
			<div className={ combineClasses("Checkbox ", highlight, this.props.extraClassName) }>
				<input type="checkbox" name={ this.props.name } id={ inputId } checked={ this.props.value } onChange={ this.onCheckToggle }/>
				<label htmlFor={ inputId }>{ this.props.label }</label>
			</div>
		)
	}

}

Checkbox.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.bool,
	defaultChecked: PropTypes.bool,
	onToggle: PropTypes.func,
	highlighted: PropTypes.bool,
	extraClassName: PropTypes.string
};

export default Checkbox
