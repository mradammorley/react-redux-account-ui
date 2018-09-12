import axios from "axios";

function signin(email, password) {

	let data = {
		"email": email,
		"password": password
	};

	return axios.post('https://reqres.in/api/login', data)
		.then (response => {
			return response
		})
		.catch (error => {
			return Promise.reject(error.response.status);
		})
		.then ((handledResponse) => { return handledResponse });

}

function signup(userDetails) {

    let data = {
        "email": userDetails.email,
        "password": userDetails.password
    };


	return axios.post('https://reqres.in/api/users', data)
		.then (response => {
			return response.status
		})
		.catch (error => {
			return Promise.reject(error.response.status);
		})
		.then ((handledResponse) => { return handledResponse });
}

function forgotPassword(email) {

	let formData = new FormData();
	formData.set('email', email);

	return axios.post('', formData)
		.then (response => {
			return response.status
		})
		.catch (error => {
			return Promise.reject(error.response.status);
		})
		.then ((handledResponse) => { return handledResponse })
}

function refreshUser() {
	return axios.get('https://reqres.in/api/users/2')
		.then (response => {
			return response;
		})
		.catch (error => {
			return Promise.reject(error.response);
		})
		.then ((handledResponse) => { return handledResponse });
}


export const userService = {
	signin,
	signup,
	refreshUser,
	forgotPassword
};