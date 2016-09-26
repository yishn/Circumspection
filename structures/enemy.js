class Enemy {
    constructor({position, direction, alerted = false, disabled = false}) {
        this.position = position
        this.direction = direction
        this.alerted = alerted
        this.disabled = disabled
    }
}

module.exports = Enemy
