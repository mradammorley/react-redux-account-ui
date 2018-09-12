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

	render() {

		return (
			<CSSTransitionGroup
				transitionName="modal-fade"
				transitionEnterTimeout={ 400 }
				transitionLeaveTimeout={ 400 }
				transitionAppear={ true }
				transitionAppearTimeout={ 400 }>
				<div className={ "ModalWrapperInner container-" +  this.props.contentClassName } onClick={ this.preventEventPropagation }>
					<div className="ModalWrapper-close-button-wrapper">
						<div className="ModalWrapper-close-button" onClick={ this.onCloseClick } />
					</div>
					<div className="ModalWrapper-title">
						{ this.props.title }
					</div>
					<div className={ "ModalWrapper-content " + this.props.contentClassName }>
						{ this.props.children }
					</div>
					<div className="ModalWrapper-safety-margin" />
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
