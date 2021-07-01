import { Component } from "react";
import "./App.css";

import Navbar from "../Navbar/Navbar.jsx";
import Game from "../Game/Game.jsx";
import Leaderboard from "../Leaderboard/Leaderboard.jsx";
import Shop from "../Shop/Shop.jsx";
import Login from "../Modals/Login.jsx";

class App extends Component {
    componentDidMount() {
        document.querySelectorAll('.close-modal').forEach(el => {
            el.addEventListener('click', () => {
                document.querySelector('.modal.is-active').classList.remove('is-active');
            })
        })
    }

    componentDidUpdate() {
        console.log('update');
    }


    render() {
        return (
            <div id="App">
                <Login />
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
