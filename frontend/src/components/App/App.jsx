import { Component } from "react";
import "./App.css";

import Navbar from "../Navbar/Navbar.jsx";
import Game from "../Game/Game.jsx";
import Leaderboard from "../GameInformations/components/Leaderboard.jsx";
import GameActions from "../GameActions/GameActions.jsx";
import Login from "../Modals/Login.jsx";
import Logout from "../Modals/Logout.jsx";
import Cookie from "../Modals/Cookie.jsx";
import Signup from "../Modals/Signup.jsx";

class App extends Component {
    constructor() {
        super();
        this.state = {
            user: null,
            isConnected: false,
            showLoginModal: false,
            showSignupModal: false,
            showLogoutConfirm: false,
            showCookieConfirm: false,
            cookieIsAccepted: false,
        };
    }

    componentDidMount() {
        this.setState({ showCookieConfirm: true });
        document.querySelectorAll(".close-modal").forEach((el) => {
            el.addEventListener("click", this.closeModal);
        });
    }

    handleCookieConfirm = () => {
        this.setState({ showCookieConfirm: false, cookieIsAccepted: true });
    };

    closeModal = () => {
        this.setState({
            showLoginModal: false,
            showSignupModal: false,
            showLogoutConfirm: false,
            showCookieConfirm: false,
        });
    };

    showLoginModal = () => {
        this.setState({ showLoginModal: true });
    };

    showSignupModal = () => {
        this.setState({ showSignupModal: true });
    };

    showLogoutConfirm = () => {
        this.setState({ showLogoutConfirm: true });
    };

    onUserConnect = (user) => {
        this.setState({ isConnected: true, user: user });
    };

    onUserDisconnect = () => {
        this.setState({ isConnected: false, user: null });
    };

    onUserSignup = () => {
        this.setState({ showSignupModal: false, showLoginModal:true });
    }

    render() {
        return (
            <div id="App">
                {this.state.showLogoutConfirm ? (
                    <Logout
                        onClose={this.closeModal}
                        onDisconnect={this.onUserDisconnect}
                    />
                ) : (
                    <></>
                )}
                {this.state.showLoginModal ? (
                    <Login
                        onClose={this.closeModal}
                        onConnect={this.onUserConnect}
                    />
                ) : (
                    <></>
                )}
                {this.state.showSignupModal ? (
                    <Signup onClose={this.closeModal} onSignup={this.onUserSignup}/>
                ) : (
                    <></>
                )}
                {this.state.showCookieConfirm ? (
                    <Cookie onConfirm={this.handleCookieConfirm} />
                ) : (
                    <></>
                )}
                {this.state.isConnected ? (
                    <>
                        <Navbar
                            onLogoutClick={this.showLogoutConfirm}
                            user={this.state.user}
                            isConnected={this.state.isConnected}
                        />
                        <main>
                            <Leaderboard />
                            <Game
                                handleClick={this.handleClick}
                            />
                            <GameActions user={this.state.user} />
                        </main>
                    </>
                ) : (
                    <Navbar
                        onLoginClick={this.showLoginModal}
                        onSignupClick={this.showSignupModal}
                        user={this.state.user}
                        isConnected={this.state.isConnected}
                    />
                )}
            </div>
        );
    }
}

export default App;
