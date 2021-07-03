import { Component } from "react";
import axios from "axios";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
            profile_picture_url: "",
            isConfimPasswordDifferents: false,
            userAlreadyExists: false,
            hasProfilePictureURL: false,
            imageLoadError: false,
            isUsernameEmpty: false,
            isPasswordEmpty: false,
            isSignUpOK:false
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });

        if (event.target.name === "confirmPassword") {
            if (event.target.value !== this.state.password) {
                this.setState({ isConfimPasswordDifferents: true });
            } else {
                this.setState({ isConfimPasswordDifferents: false });
            }
        }

        if (event.target.name === "profile_picture_url") {
            this.setState({
                imageLoadError: false,
                hasProfilePictureURL: true,
            });
        }
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({ isUsernameEmpty: false, isPasswordEmpty: false });
        try {
            const url = "http://localhost:3003/signup";

            const params = new URLSearchParams();
            params.append("username", this.state.username);
            params.append("password", this.state.password);

            if (this.state.profile_picture_url) {
                params.append(
                    "profile_picture_url",
                    this.state.profile_picture_url
                );
            }

            const config = {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            };

            if (!this.state.username) {
                return this.setState({ isUsernameEmpty: true });
            }

            if (!this.state.password) {
                return this.setState({ isPasswordEmpty: true });
            }

            axios
                .post(url, params, config)
                .then((response) => {
                    if (response.status === 200) {
                        console.log(response.data);
                        const data = response.data;

                        if (data.usernameAlreadyUsed) {
                            return this.setState({ userAlreadyExists: true });
                        }

                        if(data.isRegistered) {
                            return this.props.onSignup()
                        }
                    }
                })
                .catch((error) => {
                    throw new Error(error);
                });
        } catch (error) {
            console.log(error);
        }
    };

    imageLoadError = () => {
        this.setState({
            profile_picture_url: "",
            hasProfilePictureURL: false,
            imageLoadError: true,
        });
    };

    render() {
        return (
            <div className="modal is-active">
                <form id="login-form" action="#">
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">S'inscrire</p>
                            <div
                                onClick={this.props.onClose}
                                className="delete close-modal"
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
                                            this.state.userAlreadyExists ||
                                            this.state.isUsernameEmpty
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
                                    {this.state.userAlreadyExists ? (
                                        <>
                                            {" "}
                                            <span className="icon is-small is-right">
                                                <i className="fas fa-exclamation-triangle"></i>
                                            </span>
                                            <p className="help is-danger">
                                                Le nom d'utilisateur est déjà
                                                utilisé!
                                            </p>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    {this.state.isUsernameEmpty ? (
                                        <>
                                            {" "}
                                            <span className="icon is-small is-right">
                                                <i className="fas fa-exclamation-triangle"></i>
                                            </span>
                                            <p className="help is-danger">
                                                Vous devez entrez un nom
                                                d'utilisateur!
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
                                            this.state
                                                .isConfimPasswordDifferents ||
                                            this.state.isPasswordEmpty
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
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-key"></i>
                                    </span>
                                    {this.state.isConfimPasswordDifferents ? (
                                        <>
                                            {" "}
                                            <span className="icon is-small is-right">
                                                <i className="fas fa-exclamation-triangle"></i>
                                            </span>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    {this.state.isPasswordEmpty ? (
                                        <>
                                            {" "}
                                            <span className="icon is-small is-right">
                                                <i className="fas fa-exclamation-triangle"></i>
                                            </span>
                                            <p className="help is-danger">
                                                Vous devez entrez un mot de
                                                passe!
                                            </p>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>

                            {/* confirmPassword */}
                            <div className="field">
                                <label
                                    className="label"
                                    htmlFor="confirm-password"
                                >
                                    Confirmer le mot de passe
                                </label>
                                <div className="control has-icons-left has-icons-right">
                                    <input
                                        className={
                                            this.state
                                                .isConfimPasswordDifferents
                                                ? "input is-danger"
                                                : "input"
                                        }
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        onChange={this.handleChange}
                                        value={this.state.confirmPassword}
                                        placeholder="ex: ->MyStr0NgP4ssW0ord!"
                                    />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-key"></i>
                                    </span>
                                    {this.state.isConfimPasswordDifferents ? (
                                        <>
                                            {" "}
                                            <span className="icon is-small is-right">
                                                <i className="fas fa-exclamation-triangle"></i>
                                            </span>
                                            <p className="help is-danger">
                                                Les mots de passes ne
                                                correspondent pas!
                                            </p>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>

                            {/* URL Picture */}
                            <div className="field">
                                <label
                                    className="label"
                                    htmlFor="confirm-password"
                                >
                                    URL de la photo de profil
                                </label>
                                <div className="control has-icons-left has-icons-right">
                                    <input
                                        className={
                                            this.state.imageLoadError
                                                ? "input is-danger"
                                                : "input"
                                        }
                                        type="url"
                                        id="profile_picture_url"
                                        name="profile_picture_url"
                                        onChange={this.handleChange}
                                        value={this.state.profile_picture_url}
                                        placeholder="https://cdn2.thecatapi.com/images/b27.jpg"
                                    />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-camera"></i>
                                    </span>
                                    {this.state.imageLoadError ? (
                                        <>
                                            {" "}
                                            <span className="icon is-small is-right">
                                                <i className="fas fa-exclamation-triangle"></i>
                                            </span>
                                            <p className="help is-danger">
                                                L'URL est invalide, ou la photo
                                                n'a pas pu être chargée
                                            </p>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    {this.state.hasProfilePictureURL ? (
                                        <div
                                            className="container"
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginTop: "1em",
                                            }}
                                        >
                                            {" "}
                                            <figcaption>
                                                Aperçu de la photo
                                            </figcaption>
                                            <img
                                                className="image is-128x128"
                                                src={
                                                    this.state
                                                        .profile_picture_url
                                                }
                                                alt="TEST"
                                                onError={this.imageLoadError}
                                            />
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                        </section>
                        <footer className="modal-card-foot">
                            <button
                                onClick={this.handleSubmit}
                                className="button is-success"
                            >
                                S'inscrire
                            </button>
                            <div
                                onClick={this.props.onClose}
                                className="button close-modal"
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

export default Signup;
