import { Component } from "react";

class Game extends Component {
    render() {
        return (
            <section
                id="clickable-zone"
                class="flex column align-center full-width"
            >
                <div className="card flex column align-center full-height">
                    <div>
                        <p>Nombre de clics : <span>{this.props.user.number_of_clics}</span></p>
                        <p>DPS Clic : <span>{this.props.user.clic_dps}</span></p>
                        <p>DPS Bâtiments : <span>{this.props.user.building_dps}</span></p>
                    </div>
                    <img onClick={this.props.handleClick} src="/wood.png" alt="aaa"/>
                </div>
            </section>
        );
    }
}

export default Game;
