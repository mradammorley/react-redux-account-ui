import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

class ModalWrapper extends React.Component {

	constructor (props) {
		super(props);

		this.onCloseClick = this.onCloseClick.bind(this);
		this.preventEventPropagation = this.preventEventPropagation.bind(this);
	}

	onCloseClick(event) {
		event.preventDefault();
		this.props.closeHandler();
	}

	preventEventPropagation(event) {
		event.stopPropagation();
	}

	componentDidMount() {
		document.body.classList.add("no-scroll-with-modal");
	}

	componentWillUnmount() {
		document.body.classList.remove("no-scroll-with-modal");
	}

	render() {

		return (
			<CSSTransitionGroup
				transitionName="modal-fade"
				transitionEnter={ false }
				transitionLeave={ false }
				transitionAppear={ true }
				transitionAppearTimeout={ 400 }>
				<div className="ModalWrapper" onClick={ this.onCloseClick } key={ this.key } >
					{ this.props.children }
				</div>
			</CSSTransitionGroup>
		)
	}

}

ModalWrapper.propTypes = {
	title: PropTypes.string,
	contentClassName: PropTypes.string,
	closeHandler: PropTypes.func.isRequired
};


export default ModalWrapper
