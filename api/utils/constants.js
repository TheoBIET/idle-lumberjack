const SAWNILL = {
    YIELD_FACTOR: 1.3,
    COST_FACTOR: 1.4,
    COST: 4,
    YIELD: 0.2,
    LEVEL: 0
}

const SILO = {
    CAPACITY_FACTOR: 1.3,
    COST_FACTOR: 1.3,
    COST: 15,
    CAPACITY: 30,
    LEVEL: 0
}

const GAME = {
    stock: 0,
    sawmill: {
        level: SAWNILL.LEVEL,
        yield: SAWNILL.YIELD,
        cost: SAWNILL.COST
    },
    silo: {
        level: SAWNILL.LEVEL,
        capacity: SAWNILL.CAPACITY,
        cost: SAWNILL.COST
    },
    lastUpdate: null
}

module.exports = {
    GAME,
    SILO,
    SAWNILL
};