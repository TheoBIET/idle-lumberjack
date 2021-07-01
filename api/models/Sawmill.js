const {SAWMILL} = require('../utils/constants')

/**
 * Create a new sawmill
 * @constructor
 * @param {number} level  - The current level of the sawmill (default: 1)
 */
class Sawmill {
    constructor(level=1) {
        this.level = level;
        this.yield = (this.level * SAWMILL.YIELD_FACTOR);
        this.cost = (this.level * SAWMILL.COST_FACTOR);
    }

    upgrade() {
        this.level = this.level + 1;
        this.yield = (this.level * SAWMILL.COST_FACTOR);
        this.cost = (this.level * SAWMILL.COST_FACTOR);
    }
}

module.exports = Sawmill;