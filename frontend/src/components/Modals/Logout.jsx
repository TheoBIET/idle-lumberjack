import { Component } from "react";
import axios from "axios";

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            wrongPassword: false,
            wrongUsername: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    closeModal() {
        document
            .querySelector(".modal.is-active")
            .classList.remove("is-active");
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    async handleSubmit(event) {
        this.setState({
            wrongPassword: false,
            wrongUsername: false,
        });

        event.preventDefault();
        try {
            const url = "http://localhost:3003/api/login";

            const params = new URLSearchParams();
            params.append("username", this.state.username);
            params.append("password", this.state.password);

            const config = {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            };

            axios
                .post(url, params, config)
                .then((response) => {
                    if (response.status === 200) {
                        const user = response.data;
                        this.setState({
                            password: "",
                        });

                        if (!user.username) {
                            if (!user.correctUsername) {
                                return this.setState({ wrongUsername: true });
                            }

                            if (user.correctUsername && !user.correctPassword) {
                                return this.setState({ wrongPassword: true });
                            }
                        }

                        this.closeModal();
                    }
                })
                .catch((error) => {
                    throw new Error(error);
                });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div class="modal is-active">
                <form
                    id="login-form"
                    onSubmit={this.handleSubmit}
                    encType="multipart/form-data"
                >
                    <div class="modal-background"></div>
                    <div class="modal-card">
                        <header class="modal-card-head">
                            <p class="modal-card-title">Êtes vous sur de vouloir vous déconnecter?</p>
                            <button
                                class="delete close-modal"
                                aria-label="close"
                            ></button>
                        </header>
                        <footer class="modal-card-foot">
                            <button
                                onClick={this.handleSubmit}
                                class="button is-danger"
                            >
                                Oui
                            </button>
                            <button class="button close-modal">Annuler</button>
                        </footer>
                    </div>
                </form>
            </div>
        );
    }
}

export default Logout;
