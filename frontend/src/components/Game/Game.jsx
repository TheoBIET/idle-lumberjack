import { Component } from "react";

class Game extends Component {
    render() {
        return (
            <section
                id="clickable-zone"
                class="flex column align-center full-width"
            >
                <div className="card flex column align-center full-height">
                    <h3 className="title is-5">Clic par seconde : <span className="title is-2">2883</span></h3>
                    <img src="/lumber.png" alt="aaa"/>
                </div>
            </section>
        );
    }
}

export default Game;
