import { Component } from "react";

class Shop extends Component {
    render() {
        return (
            <section id="shop" class="flex column align-center full-width">
                {/* <div className="card">
                    <p class="card-header-title">Succès</p>
                </div>
                <div className="card">
                    <p class="card-header-title">Boost</p>
                </div> */}
                <div className="card">
                    <p class="card-header-title">Statistiques</p>
                    <div className="flex column align-center full-width">
                        <ul>
                            <li>Argent : <strong>134</strong></li>
                            <li>Niveau actuel : <strong>134</strong></li>
                            <li>Niveau de la scierie : <strong>422</strong></li>
                            <li>Coût de la scierie : <strong>293</strong></li>
                            <li>Capacité du Silot : <strong>403</strong></li>
                            <li>Coût du Silot : <strong>293</strong></li>
                        </ul>
                    </div>
                </div>
                <div className="card">
                    <p class="card-header-title">Amélioration</p>
                    <div className="flex column align-center full-width">
                        <button class="button is-warning">
                            Fabriquer une scierie
                        </button>
                        <button class="button is-success">
                            Améliorer la scierie
                        </button>
                        <button class="button is-success">
                            Améliorer le silot
                        </button>
                    </div>
                </div>
            </section>
        );
    }
}

export default Shop;
