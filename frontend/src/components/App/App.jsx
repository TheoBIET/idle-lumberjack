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
import axios from "axios";

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
            user_buildings: null
        };
    };

    componentDidMount() {
        this.setState({ showCookieConfirm: true});
        document.querySelectorAll(".close-modal").forEach((el) => {
            el.addEventListener("click", this.closeModal);
        });
    };

    async updateBuyList() {
        const response = await axios.get(`http://localhost:3003/api/${this.state.user.username}/building`);
        this.setState({user_buildings: response.data[0]})
    }

    updateDPS() {
        const buildingsList = this.state.user_buildings
        const buildingIdForClicDPS = 1;
        const buildingForClicDPS = buildingsList.find(el => el.building_id === buildingIdForClicDPS);
        const newClicDPS = parseInt(buildingForClicDPS.actual_value,10);
        let newBuildingDPS = 0;

        for (const building of buildingsList) {
            if(building.is_user_buyed) {
                newBuildingDPS = newBuildingDPS + parseInt(building.actual_value, 10);
            }
        }
        newBuildingDPS = (newBuildingDPS - newClicDPS) - parseInt(this.state.user.stock_capacity, 10);

        if(newBuildingDPS < 0) {
            newBuildingDPS = 0;
        }

        this.setState((prevState) => ({
            user: {
                ...prevState.user,
                clic_dps: newClicDPS,
                building_dps: newBuildingDPS
            },
        }));
    };

    updateCapacity() {
        const buildingsList = this.state.user_buildings
        const siloID = 2;
        const silo = buildingsList.find(el => el.building_id === siloID);
        const newStockCapacity = parseInt(silo.actual_value,10);
        this.setState((prevState) => ({
            user: {
                ...prevState.user,
                stock_capacity: newStockCapacity
            },
        }));
    };

    updateStockEverySecond = () => {
        const newStock = parseInt(this.state.user.stock, 10) + parseInt(this.state.user.building_dps, 10);
        
        if(newStock > this.state.user.stock_capacity) {
            return this.setState((prevState) => ({
                user: {
                    ...prevState.user,
                    stock: this.state.user.stock_capacity
                },
            }));
        }

        this.setState((prevState) => ({
            user: {
                ...prevState.user,
                stock: newStock
            },
        }));
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

    handleClickOnGame = () => {
        const currentStock = parseInt(this.state.user.stock, 10);
        const currentDPS = parseInt(this.state.user.clic_dps, 10);
        const newStock = currentDPS + currentStock;
        const newClics = currentDPS + 1;

        if(newStock > parseInt(this.state.user.stock_capacity, 10)) {
            return
        }

        this.setState((prevState) => ({
            user: {
                ...prevState.user,
                number_of_clics: newClics,
                stock: newStock,
            },
        }));
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
        this.updateBuyList();
        this.interval = setInterval(this.updateStockEverySecond, 1000);
    };

    onUserDisconnect = () => {
        this.saveUserStatus();
        this.setState({ isConnected: false, user: null });
        clearInterval(this.interval)
    };

    onUserSignup = () => {
        this.setState({ showSignupModal: false, showLoginModal: true });
    };

    saveUserStatus = async () => {
        this.updateDPS();
        this.updateCapacity();

        const url = `http://localhost:3003/api/${this.state.user.username}/save`;

        const params = new URLSearchParams();
        params.append("stock", this.state.user.stock);
        params.append("number_of_clics", this.state.user.number_of_clics);
        params.append("clic_dps", this.state.user.clic_dps);
        params.append("building_dps", this.state.user.building_dps);
        params.append("stock_capacity", this.state.user.stock_capacity);

        const config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        };

        await axios.post(url, params, config);

        if(this.state.isConnected) {
            this.getCurrentUserStatus();
        }
    };

    getCurrentUserStatus = async () => {
        const response = await axios.get(`http://localhost:3003/api/${this.state.user.username}/status`);
        const updatedUser = await response.data;
        this.setState({user: updatedUser});
        this.updateBuyList()
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
                    <Signup
                        onClose={this.closeModal}
                        onSignup={this.onUserSignup}
                    />
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
                            <Game onSave={this.saveUserStatus} user={this.state.user} handleClick={this.handleClickOnGame} />
                            <GameActions onSave={this.saveUserStatus} user={this.state.user} />
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
