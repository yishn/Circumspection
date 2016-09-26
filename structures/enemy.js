class Enemy {
    constructor({position, direction, alerted = false, disabled = false, sightDistance = 150, sightAngle = 60}) {
        this.position = position
        this.direction = direction
        this.alerted = alerted
        this.disabled = disabled
        this.sightDistance = sightDistance
        this.sightAngle = sightAngle
    }
}

module.exports = Enemy
