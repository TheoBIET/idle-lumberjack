const {SILO} = require('../utils/constants')

/**
 * Create a new silo
 * @constructor
 * @param {number} level  - The current level of the silo (default: 1)
 */
class Silo {
    constructor(level=1) {
        this.level = level;
        this.capacity = (this.level * SILO.CAPACITY);
        this.cost = (this.level * SILO.COST);
    }

    upgrade() {
        this.level = this.level + 1;
        this.capacity = (this.level * SILO.CAPACITY);
        this.cost = (this.level * SILO.COST);
    }
}

module.exports = Silo;