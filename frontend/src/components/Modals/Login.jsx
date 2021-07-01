import { Component } from "react";
import axios from "axios";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    async handleSubmit(event) {
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
                .then(() => {
                    this.setState({ firstname: "", lastname: "", email: "" });
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
                            <p class="modal-card-title">Connexion</p>
                            <button
                                class="delete close-modal"
                                aria-label="close"
                            ></button>
                        </header>
                        <section className="modal-card-body">
                            {/* Username */}
                            <div className="field">
                                <label className="label" htmlFor="username">
                                    Nom d'utilsateur
                                </label>
                                <div className="control has-icons-left has-icons-right">
                                    <input
                                        className="input"
                                        type="text"
                                        id="username"
                                        name="username"
                                        onChange={this.handleChange}
                                        value={this.state.username}
                                        placeholder="ex: Aspitrine"
                                    />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-user"></i>
                                    </span>
                                </div>
                            </div>

                            {/* Password */}
                            <div className="field">
                                <label className="label" htmlFor="password">
                                    Mot de Passe
                                </label>
                                <div className="control has-icons-left has-icons-right">
                                    <input
                                        className="input"
                                        type="password"
                                        id="password"
                                        name="password"
                                        onChange={this.handleChange}
                                        value={this.state.password}
                                        placeholder="ex: Aspitrine"
                                    />
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-envelope"></i>
                                    </span>
                                </div>
                            </div>

                        </section>
                        <footer class="modal-card-foot">
                            <button
                                onClick={this.handleSubmit}
                                class="button is-success"
                            >
                                Se connecter
                            </button>
                            <button class="button close-modal">Annuler</button>
                        </footer>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;
