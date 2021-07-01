const UTILS = {
    getCurrentTime() {
        const currentDate = new Date();
        const timestamp = currentDate.getTime();
        return timestamp;
    }
}

module.exports = UTILS;