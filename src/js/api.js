import validation from "./validation";

const baseUrl = "http://localhost:9090";
const xhr = new XMLHttpRequest();

const form = document.querySelector(".form");
const status = document.querySelector(".status");

const getSuccess = e => {
	status.classList.remove("error");
	status.classList.add("success");
	e.target.reset();
};

const getError = () => {
	status.classList.remove("success");
	status.classList.add("error");
};

form.addEventListener("submit", e => {
	e.preventDefault();
	const formData = new FormData(form);
	const requestData = {
		name: formData.get("name"),
		email: formData.get("email"),
		phone: formData.get("phone"),
		message: formData.get("message"),
	};

	const errors = validation();
	if (errors.requiredErrors === 0 && errors.incorrectErrors === 0) {
		xhr.open("POST", `${baseUrl}/api/registration`);
		xhr.send(JSON.stringify(requestData), (status.innerHTML = ""), status.classList.add("loading"));
		xhr.onload = function () {
			let res = JSON.parse(this.responseText);
			status.classList.remove("loading");
			status.innerHTML = res.message;
			res.status === "success" ? getSuccess(e) : getError();
		};
	}
});
