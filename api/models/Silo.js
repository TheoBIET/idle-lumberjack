const SILO_INFORMATIONS = {
    CAPACITY_FACTOR: 1.3,
    COST_FACTOR: 1.3,
    COST: 15,
    CAPACITY: 30
}

/**
 * Create a new silo
 * @constructor
 * @param {number} level  - The current level of the silo (default: 1)
 */
class Silo {
    constructor(level=1) {
        this.level = level;
        this.capacity = (this.level * SILO_INFORMATIONS.CAPACITY);
        this.cost = (this.level * SILO_INFORMATIONS.COST);
    }

    upgrade() {
        this.level = this.level + 1;
        this.capacity = (this.level * SILO_INFORMATIONS.CAPACITY);
        this.cost = (this.level * SILO_INFORMATIONS.COST);
    }
}

module.exports = Silo;