import { Component } from "react";

class Stock extends Component {
    render() {
        return (
            <div className="card">
                <p class="card-header-title">Stockage</p>
                <div className="flex column">
                    <ul>
                        <li className="button is-success flex full-width">Acheter un silot</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Stock;