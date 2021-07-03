import { Component } from "react";

class Logout extends Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    async handleLogout(event) {
        event.preventDefault();
        this.props.onDisconnect();
        this.props.onClose();
    }

    render() {
        return (
            <div class="modal is-active">
                <form
                    id="login-form"
                    encType="multipart/form-data"
                >
                    <div class="modal-background"></div>
                    <div class="modal-card">
                        <header class="modal-card-head">
                            <p class="modal-card-title">Êtes vous sur de vouloir vous déconnecter?</p>
                            <div
                                class="delete close-modal"
                                aria-label="close"
                            ></div>
                        </header>
                        <footer class="modal-card-foot">
                            <button
                                onClick={this.handleLogout}
                                class="button is-danger"
                            >
                                Oui
                            </button>
                            <div onClick={this.props.onClose} class="button close-modal">Annuler</div>
                        </footer>
                    </div>
                </form>
            </div>
        );
    }
}

export default Logout;
