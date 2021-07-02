import { Component } from "react";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.userIsConnected = this.userIsConnected.bind(this)
        
        this.state = {
            isConnected: false,
            user: null
        }
    }

    userIsConnected(user) {
        this.setState({isConnected:true, user:user});
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
                                        Connecté en tant que {this.state.user.username}<strong></strong>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="navbar-menu">
                            <div className="navbar-end">
                                <div className="navbar-item">
                                    <div className="buttons">
                                        <a
                                            href="/"
                                            className="button is-danger"
                                        >
                                            <strong>Se déconnecter</strong>
                                        </a>
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
                                    <a href="/" className="button is-primary">
                                        <strong>S'inscrire</strong>
                                    </a>
                                    <a href="/" className="button is-light">
                                        Se Connecter
                                    </a>
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
