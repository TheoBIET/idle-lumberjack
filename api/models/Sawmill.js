const {SAWNILL} = require('../utils/constants')

/**
 * Create a new sawmill
 * @constructor
 * @param {number} level  - The current level of the sawmill (default: 1)
 */
class Sawnmill {
    constructor(level=1) {
        this.level = level;
        this.yield = (this.level * SAWNILL.YIELD_FACTOR);
        this.cost = (this.level * SAWNILL.COST_FACTOR);
    }

    upgrade() {
        this.level = this.level + 1;
        this.yield = (this.level * SAWNILL.COST_FACTOR);
        this.cost = (this.level * SAWNILL.COST_FACTOR);
    }
}

module.exports = Sawnmill;