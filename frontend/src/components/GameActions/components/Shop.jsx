import { Component } from "react";
import axios from "axios";
import millify from "millify";

class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buyList: [],
        };
    }

    componentDidMount = () => {
        this.callAPI()
            .then((res) => this.setState({ buyList: res }))
            .catch((err) => console.log(err));
    };

    callAPI = async () => {
        const response = await axios.get(
            `http://localhost:3003/api/${this.props.user.username}/building`
        );
        const data = await response.data[0];
        return data;
    };

    handleUpgrade = async (event) => {
        await this.props.onSave();

        const button = event.target.closest(".button");
        const buildId = button.attributes["data-id"].value;
        const price = button.attributes["data-price"].value;

        button.classList.add("is-loading");

        if (price < this.props.user.stock) {
            await axios.get(
                `http://localhost:3003/api/${this.props.user.username}/${buildId}/upgrade`
            );
            this.props.onBuy(this.props.user.stock - price);
        }

        const newState = await this.callAPI();
        this.setState({ buyList: newState });

        button.classList.remove("is-loading");

        await this.props.onSave();
    };

    makeButtons = (props) => {
        const rows = [];
        const buildings = props.buildings;
        const maxBuyableButtons = 1;
        let currentBuyableButtons = 0;

        for (const building of buildings) {
            if (currentBuyableButtons === maxBuyableButtons) {
                break;
            }

            if (!building.is_user_buyed) {
                currentBuyableButtons++;
            }

            if (this.props.user.stock < building.actual_cost) {
                rows.push(
                    <li
                        data-id={building.building_id}
                        className={
                            building.is_user_buyed
                                ? "button flex space-between is-warning is-medium"
                                : "button flex space-between is-success is-medium"
                        }
                        disabled
                    >
                        <div className="icon">
                            <i
                                class={
                                    building.is_user_buyed
                                        ? "fas fa-plus"
                                        : "fas fa-money-bill"
                                }
                            ></i>
                        </div>
                        <div className="text">
                            {building.is_user_buyed
                                ? "(" +
                                  building.level +
                                  ") " +
                                  building.building_name
                                : building.building_name}
                        </div>
                        <div className="price">
                            {millify(building.actual_cost)}
                        </div>
                    </li>
                );
            } else {
                rows.push(
                    <li
                        data-id={building.building_id}
                        data-price={building.actual_cost}
                        onClick={this.handleUpgrade}
                        className={
                            building.is_user_buyed
                                ? "button flex space-between is-warning is-medium"
                                : "button flex space-between is-success is-medium"
                        }
                    >
                        <div className="icon">
                            <i
                                class={
                                    building.is_user_buyed
                                        ? "fas fa-plus"
                                        : "fas fa-money-bill"
                                }
                            ></i>
                        </div>
                        <div className="text">
                            {building.is_user_buyed
                                ? "(" +
                                  building.level +
                                  ") " +
                                  building.building_name
                                : building.building_name}
                        </div>
                        <div className="price">
                            {millify(building.actual_cost)}
                        </div>
                    </li>
                );
            }
        }

        return rows;
    };

    render() {
        return (
            <div className="card">
                <p class="card-header-title">
                    Boutique&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <i class="fas fa-money-bill" style={{ color: "green" }}></i>
                    &nbsp;&nbsp;
                    <strong class="title is-4">
                        {" "}
                        {millify(this.props.user.stock)}
                    </strong>
                </p>
                <div className="flex column">
                    <ul>
                        {" "}
                        <this.makeButtons
                            buildingsList={this.state.buildingsList}
                            buildings={this.state.buyList}
                        />
                    </ul>
                </div>
            </div>
        );
    }
}

export default Shop;
