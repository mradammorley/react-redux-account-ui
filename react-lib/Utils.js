export function getRandomId (length = 5) {
	let text = '';
	const possible = 'abcdefghijklmnopqrstuvwxyz';

	for (let i = 0; i < length; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

export function combineClasses() {
	let classes = [];

	for (let i = 0; i < arguments.length; i++) {
		let newClasses = Array.isArray(arguments[i]) ? arguments[i].join(' ') : arguments[i];
		classes.push(newClasses);
	}

	return classes.join(' ');
}

export function prependReactElementIfTargetExists(render, reactElement, selector) {
	const targets = document.querySelectorAll(selector);
	targets.forEach(target => {
		const existingHtml = document.createTextNode(target.innerHTML);
		render(reactElement, target);
		target.appendChild(existingHtml);
	});
}

export function isEmailValid(email) {
	return(email.match(/.+@.+\..+/i) !== null)
}