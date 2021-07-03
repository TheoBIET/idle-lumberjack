import { Component } from "react";
import dayjs from "dayjs";

class Statistics extends Component {
    render() {
        return (
            <div className="card">
                <p class="card-header-title">Statistiques</p>
                <section className="flex column align-center full-width">
                    <ul>
                        <li>
                            Nom d'utilisateur :{" "}
                            <strong>{this.props.user.username}</strong>
                        </li>
                        <li>
                            Nombre de clic :{" "}
                            <strong>{this.props.user.number_of_clics}</strong>
                        </li>
                        <li>
                            Nombre de bâtiments :{" "}
                            <strong>{this.props.user.buildings.length}</strong>
                        </li>
                        <li>
                            Inscrit depuis le :{" "}
                            <strong>
                                {dayjs(this.props.user.createdAt).format(
                                    "DD/MM/YYYY"
                                )}
                            </strong>
                        </li>
                        <li>
                            Dernière sauvergarde :{" "}
                            <strong>
                                {dayjs(this.props.user.updatedAt).format(
                                    "DD/MM/YYYY"
                                )}
                            </strong>
                        </li>
                    </ul>
                </section>
            </div>
        );
    }
}

export default Statistics;
