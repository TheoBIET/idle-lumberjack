import { Component } from "react";

class Shop extends Component {
    render() {
        return (
            <div className="card">
                <p class="card-header-title">Boutique</p>
                <div className="flex column">
                    <ul>
                        <li className="button is-success flex full-width">Acheter une scierie</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Shop;
