import { Component } from "react";

class Cookie extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    closeModal() {
        document
            .querySelector(".modal.is-active")
            .classList.remove("is-active");
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.props.onConfirm();
    }

    render() {
        return (
            <div className="modal is-active">
                <form
                    id="login-form"
                    onSubmit={this.handleSubmit}
                    encType="multipart/form-data"
                >
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">
                                Accepter les cookies
                            </p>
                        </header>
                        <section className="modal-card-body">
                            <p>
                                Les cookies sont nécessaires au bon
                                fonctionnement de l'application
                            </p>
                        </section>
                        <footer className="modal-card-foot">
                            <button
                                onClick={this.handleSubmit}
                                className="button is-warning"
                            >
                                J'accepte les cookies
                            </button>
                        </footer>
                    </div>
                </form>
            </div>
        );
    }
}

export default Cookie;
