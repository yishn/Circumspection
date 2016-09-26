const helper = require('../browser/helper')

class Player {
    constructor({position}) {
        this.position = position
    }

    inLight(level) {
        return level.enemies.some(enemy => {
            if (helper.squaredEuclidean(enemy.position, this.position) > Math.pow(enemy.sightDistance, 2))
                return false

            let directionPoint = this.position.map((x, i) => x - enemy.position[i])
            let direction = Math.atan2(directionPoint[1], directionPoint[0]) * 360 / 2 / Math.PI
            let angleDiff = Math.min(...[1, -1].map(x => helper.normalizeAngle(x * (direction - enemy.direction))))

            if (angleDiff > enemy.sightAngle / 2)
                return false

            return helper.getRayBlockIntersections(
                enemy.position,
                direction,
                {position: this.position.map(x => x - 6), size: [12, 12]},
                enemy.sightDistance
            ).length
        })
    }
}

module.exports = Player
