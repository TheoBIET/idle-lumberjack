import { Component } from "react";
import "./App.css";

import Navbar from "../Navbar/Navbar.jsx";
import Game from "../Game/Game.jsx";
import Leaderboard from "../Leaderboard/Leaderboard.jsx";
import Shop from "../Shop/Shop.jsx";
import Login from "../Modals/Login.jsx";
import Logout from "../Modals/Logout.jsx";

class App extends Component {
    constructor() {
        super()
        this.state = {
            clic:0,
            user:null,
            isConnected:false,
            showLoginModal:false,
            showSignupModal:false,
            showLogoutConfirm:false
        }
    }

    closeModal(event) {
        event.target.closest('.modal').classList.remove('is-active')
    }

    componentDidMount() {
        document.querySelectorAll('.close-modal').forEach(el => {
            el.addEventListener('click', this.closeModal)
        })
    }

    componentDidUpdate() {
        console.log('update');
    }


    render() {
        return (
            <div id="App">
                <Logout/>
                <Navbar />
                <main>
                    <Leaderboard />
                    <Game />
                    <Shop />
                </main>
            </div>
        );
    }
}

export default App;
