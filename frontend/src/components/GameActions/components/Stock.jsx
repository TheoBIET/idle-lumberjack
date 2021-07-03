import { Component } from "react";

class Stock extends Component {
    progressBar = () => {
        const percentageOfStock =
            (parseInt(this.props.user.stock, 10) * 100) /
            parseInt(this.props.user.stock_capacity, 10);
        if (percentageOfStock < 50) {
            return (
                <div className="card">
                    <p class="card-header-title">
                        Stockage {this.props.user.stock}/
                        {this.props.user.stock_capacity}
                    </p>
                    <div className="flex column align-center">
                        <progress
                            class="progress is-success"
                            value={percentageOfStock}
                            max="100"
                        ></progress>
                    </div>
                </div>
            );
        } else if (percentageOfStock < 75) {
            return (
                <div className="card">
                    <p class="card-header-title">
                        Stockage {this.props.user.stock}/
                        {this.props.user.stock_capacity}
                    </p>
                    <div className="flex column align-center">
                        <progress
                            class="progress is-warning"
                            value={percentageOfStock}
                            max="100"
                        ></progress>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="card">
                    <p class="card-header-title">
                        Stockage {this.props.user.stock}/
                        {this.props.user.stock_capacity}
                    </p>
                    <div className="flex column align-center">
                        <progress
                            class="progress is-danger"
                            value={percentageOfStock}
                            max="100"
                        ></progress>
                    </div>
                </div>
            );
        }
    };

    render() {
        return <this.progressBar />;
    }
}

export default Stock;
