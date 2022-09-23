class FormValidation {
    constructor(form, userData = {}) {
        this.form = form;
        this.userData = userData;
        this.inputUsernameElement = form.elements.username;
        this.inputPasswordElement = form.elements.password;
        this.inputUsernameValue = "";
        this.inputPasswordValue = "";
        this.submit = this.form.submit;
    }

    init() {
        this.submit.addEventListener("click", (event) => {
            event.preventDefault();

            // Set input values
            this.inputUsernameValue = this.inputUsernameElement.value;
            this.inputPasswordValue = this.inputPasswordElement.value;

            // Validate form
            this.validateForm();
        });
    }

    generateMessage(message) {
        const messageElement = document.createElement("p");
        messageElement.className = "form-message";
        messageElement.textContent = "* " + message;
        this.form.append(messageElement);
    }

    validateInput(element, value) {
        const elementName = element.name

        if (value === "") {
            element.parentElement.dataset.state = false;
            this.generateMessage(`please, enter ${elementName}`);
            return false;
        } else if (value !== this.userData[elementName]) {
            element.parentElement.dataset.state = false;
            this.generateMessage(`please, enter valid ${elementName}`);
            return false;
        } else {
            element.parentElement.dataset.state = true;
            return true;
        }
    }

    validateForm() {
        // Remove previous form messages if they exist
        if (document.querySelector(".form-message")) {
            for (let el of document.querySelectorAll(".form-message")) {
                el.remove();
            }
        }

        // Validate inputs
        let username = this.validateInput(this.inputUsernameElement, this.inputUsernameValue);
        let password = this.validateInput(this.inputPasswordElement, this.inputPasswordValue);

        if (password && username) {
            this.generateMessage('Successful Login!')
        }
    }
}

const form = document.forms["form"];

const userData = {
    username: "new_user",
    password: "123456789",
};

const formValidation = new FormValidation(form, userData);

(() => {
    formValidation.init();
})();