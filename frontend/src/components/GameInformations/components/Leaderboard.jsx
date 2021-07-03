import { Component } from "react";

class Leaderboard extends Component {
    render() {
        return (
            <aside id="leaderboard" className="flex column align-center full-width">
                <div className="card">
                    <p className="card-header-title">Leaderboard</p>
                    <div className="flex column align-center ">
                        <ol>
                            <li>John Doe : <strong>102,293,192 $</strong></li>
                            <li>John Doe : <strong>102,293,192 $</strong></li>
                            <li>John Doe : <strong>102,293,192 $</strong></li>
                            <li>John Doe : <strong>102,293,192 $</strong></li>
                            <li>John Doe : <strong>102,293,192 $</strong></li>
                            <li>John Doe : <strong>102,293,192 $</strong></li>
                            <li>John Doe : <strong>102,293,192 $</strong></li>
                            <li>John Doe : <strong>102,293,192 $</strong></li>
                            <li>John Doe : <strong>102,293,192 $</strong></li>
                        </ol>
                    </div>
                </div>
                <div className="card">
                    <p className="card-header-title">Made with ❤️ and some 🐛 by Théo BIET</p>
                </div>
            </aside>
        );
    }
}

export default Leaderboard;
