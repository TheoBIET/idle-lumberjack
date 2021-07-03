import { Component } from "react";
import axios from "axios";

class Login extends Component {
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
            const url = "http://localhost:3003/login";

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

                        this.props.onConnect(user);
                        this.props.onClose();
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
                <form id="login-form" action="#">
                    <div class="modal-background"></div>
                    <div class="modal-card">
                        <header class="modal-card-head">
                            <p class="modal-card-title">Connexion</p>
                            <div
                                onClick={this.props.onClose}
                                class="delete close-modal"
                                aria-label="close"
                            ></div>
                        </header>
                        <section className="modal-card-body">
                            {/* Username */}
                            <div className="field">
                                <label className="label" htmlFor="username">
                                    Nom d'utilisateur
                                </label>
                                <div className="control has-icons-left has-icons-right">
                                    <input
                                        className={
                                            this.state.wrongUsername
                                                ? "input is-danger"
                                                : "input"
                                        }
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
                                    {this.state.wrongUsername ? (
                                        <>
                                            {" "}
                                            <span class="icon is-small is-right">
                                                <i class="fas fa-exclamation-triangle"></i>
                                            </span>
                                            <p class="help is-danger">
                                                Le nom d'utilisateur n'existe
                                                pas!
                                            </p>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>

                            {/* Password */}
                            <div className="field">
                                <label className="label" htmlFor="password">
                                    Mot de Passe
                                </label>
                                <div className="control has-icons-left has-icons-right">
                                    <input
                                        className={
                                            this.state.wrongPassword
                                                ? "input is-danger"
                                                : "input"
                                        }
                                        type="password"
                                        id="password"
                                        name="password"
                                        onChange={this.handleChange}
                                        value={this.state.password}
                                        placeholder="ex: ->MyStr0NgP4ssW0ord!"
                                    />
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-envelope"></i>
                                    </span>
                                    {this.state.wrongPassword ? (
                                        <>
                                            {" "}
                                            <span class="icon is-small is-right">
                                                <i class="fas fa-exclamation-triangle"></i>
                                            </span>
                                            <p class="help is-danger">
                                                Le mot de passe n'est pas
                                                correct!
                                            </p>
                                        </>
                                    ) : (
                                        <></>
                                    )}
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
                            <div
                                onClick={this.props.onClose}
                                class="button close-modal"
                            >
                                Annuler
                            </div>
                        </footer>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;
