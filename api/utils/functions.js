module.exports = {
    getCurrentTime() {
        const currentDate = new Date();
        const timestamp = currentDate.getTime();
        return timestamp;
    }
}