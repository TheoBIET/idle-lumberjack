import { Component } from "react";

class Game extends Component {
    render() {
        return (
            <section
                id="clickable-zone"
                class="flex column align-center full-width"
            >
                <div className="card flex column align-center full-height">
                    <h3 className="title is-5">Nombre de clics : <span className="title is-2">{this.props.nbOfClic}</span></h3>
                    <img src="/wood.png" alt="aaa"/>
                </div>
            </section>
        );
    }
}

export default Game;
