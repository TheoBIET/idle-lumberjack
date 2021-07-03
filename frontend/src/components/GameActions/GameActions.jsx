import axios from "axios";
import { Component } from "react";
import Shop from "./components/Shop.jsx";
import Statistics from './components/Statistics.jsx';

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
        const url = 'http://localhost:3000/api/buildings';
        const response = await axios.get(url);
        const data = await response.data;
        this.setState({avalaibleBuildings: data});
        console.log(data);
    }

    render() {
        console.log(this.props.user);
        return (
            <section id="game-actions" class="flex column align-center full-width">
                <Statistics user={this.props.user} buildings={this.state.avalaibleBuildings}/>
                <Shop user={this.props.user} buildings={this.state.avalaibleBuildings}/>    
            </section>
        );
    }
}

export default GameActions;
