const app = {
    apiBaseURL: 'http://localhost:3000',

    init: () => {
        app.createListeners();
        app.callAPI();
    },

    callAPI: async () => {
        const response = await fetch('GET', `${app.apiBaseURL}/api/`);
        const json = await response.json();
        console.log('Réponse de l\'API', json);
    },

    createListeners: () => {
        document.getElementById('login-button').addEventListener('click', app.showLoginModal);
        document.getElementById('logout-button').addEventListener('click', app.showLogoutConfirm);
        document.getElementById('signup-button').addEventListener('click', app.showSignupModal);
        document.getElementById('create-sawmill-button').addEventListener('click', app.handleCreateSawmill);
        document.getElementById('upgrade-sawmill-button').addEventListener('click', app.handleUpgradeSawmill);
        document.getElementById('upgrade-silo-button').addEventListener('click', app.handleUpgradeSilo);
    },

    showLoginModal: (event) => {

    },

    showLogoutConfirm: (event) => {

    },

    showSignupModal: (event) => {

    },

    handleCreateSawmill: (event) => {

    },

    handleUpgradeSawmill: (event) => {

    },

    handleUpgradeSilo: (event) => {

    }
}

document.addEventListener('DOMContentLoaded', app.init);