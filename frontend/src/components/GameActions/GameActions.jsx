import axios from "axios";
import { Component } from "react";
import Shop from "./components/Shop.jsx";
import Statistics from './components/Statistics.jsx';
import Stock from "./components/Stock.jsx";

class GameActions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            avalaibleBuildings: null
        }
    }

    componentDidMount = () => {
        this.callAPI();
    }

    callAPI = async () => {
        const url = 'http://localhost:3003/api/building';
        const response = await axios.get(url);
        const data = await response.data;
        this.setState({avalaibleBuildings: data});
    }

    render() {
        return (
            <section id="game-actions" class="flex">
                <Statistics user={this.props.user}/>
                <Shop user={this.props.user} buildingsList={this.state.avalaibleBuildings} onSave={this.props.onSave}/>    
                <Stock user={this.props.user}/>    
            </section>
        );
    }
}

export default GameActions;
