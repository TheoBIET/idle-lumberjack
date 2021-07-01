const SAWMILL = {
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
        level: SAWMILL.LEVEL,
        yield: SAWMILL.YIELD,
        cost: SAWMILL.COST
    },
    silo: {
        level: SILO.LEVEL,
        capacity: SILO.CAPACITY,
        cost: SILO.COST
    },
    lastUpdate: null
}

module.exports = {
    GAME,
    SILO,
    SAWMILL
};