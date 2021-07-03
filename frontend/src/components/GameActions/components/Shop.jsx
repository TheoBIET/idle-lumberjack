import { Component } from "react";

class Shop extends Component {
    render() {
        return (
            <div className="card">
                <p class="card-header-title">
                    Boutique&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <i class="fas fa-money-bill" style={{ color: "green" }}></i>
                    &nbsp;&nbsp;
                    <strong class="title is-4"> {this.props.user.stock}</strong>
                </p>
                <div className="flex column">
                    <ul>
                        <li className="button is-success flex space-between">
                            <div className="icon"><i class="fas fa-money-bill"></i></div>
                            <div className="text">Scierie</div>
                            <div className="price">3</div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Shop;
