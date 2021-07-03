import { Component } from "react";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isConnected: this.props.isConnected,
            user: this.props.user,
        };
    }

    render() {
        return (
            <nav
                className="navbar"
                role="navigation"
                aria-label="main navigation"
            >
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <h1 className="title is-3">Lumberjack Clicker</h1>
                    </a>
                </div>

                {this.state.isConnected ? (
                    <>
                        <div className="navbar-menu">
                            <div className="navbar-end">
                                <div className="navbar-item">
                                    <p>
                                        Connecté en tant que{" "}
                                        {this.state.user.username}
                                        <strong></strong>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="navbar-menu">
                            <div className="navbar-end">
                                <div className="navbar-item">
                                    <div className="buttons">
                                        <div
                                            href="/"
                                            className="button is-danger"
                                            onClick={this.props.onLogoutClick}
                                        >
                                            <strong>Se déconnecter</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="navbar-menu">
                        <div className="navbar-end">
                            <div className="navbar-item">
                                <div className="buttons">
                                    <div
                                        className="button is-primary"
                                        onClick={this.props.onSignupClick}
                                    >
                                        <strong>S'inscrire</strong>
                                    </div>
                                    <div
                                        className="button is-light"
                                        onClick={this.props.onLoginClick}
                                    >
                                        Se Connecter
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        );
    }
}

export default Navbar;
