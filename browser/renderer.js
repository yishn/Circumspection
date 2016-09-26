require('snapsvg')

const helper = require('./helper')

exports.render = function(level) {
    let s = Snap('#scene')
    s.clear()

    exports.renderBackground(s, level)
    exports.renderBlocks(s, level)
    exports.renderPlayer(s, level)
    exports.renderEnemies(s, level)
}

exports.renderBackground = function(s, level) {
    s.rect(0, 0, 800, 500).attr({
        fill: '#101918'
    })
}

exports.renderBlocks = function(s, level) {
    level.blocks.forEach(block => {
        s.rect(...block.position, ...block.size).attr({
            fill: 'black'
        })
    })
}

exports.renderPlayer = function(s, level) {
    s.circle(...level.player.position, 12).attr({
        fill: level.player.inLight(level) ? '#466385' : 'black'
    })
}

exports.renderLight = function(s, position, anglePoints, distance) {
    let testPointsDistances = anglePoints.map(angle => {
        let candidates = [
            [Math.cos, Math.sin]
            .map(f => f(angle * 2 * Math.PI / 360))
            .map((x, i) => x * distance + position[i])
        ]

        level.blocks.forEach(block => {
            candidates.push(...helper.getRayBlockIntersections(position, angle, block, distance))
        })

        return candidates
        .map(x => [x.map(y => Math.round(y)), Math.round(helper.squaredEuclidean(x, position))])
        .reduce((min, next) => next[1] >= min[1] ? min : next)
    })

    let illuminatedPoints = testPointsDistances.filter(p => p[1] < Math.pow(distance, 2) - 5)
    let lightPoints = [[position, 0], ...testPointsDistances, [position, 0]]

    let illumination = s.path('M' + illuminatedPoints.map(p => p[0].join(',')).join('L')).attr({
        stroke: '#938F8E',
        strokeWidth: 1,
        fill: 'transparent'
    })

    let light = s.path('M' + lightPoints.map(p => p[0].join(',')).join('L')).attr({
        fill: 'rgba(255, 255, 255, 0.2)'
    })

    return [light, illumination]
}

exports.renderEnemies = function(s, level) {
    level.enemies.forEach(enemy => {
        let {position, direction, sightDistance, sightAngle} = enemy

        let n = 20
        let anglePoints = helper.range(0, n).map(i => direction - sightAngle / 2 + i * sightAngle / n)

        let [light, illumination] = exports.renderLight(s, position, anglePoints, sightDistance)

        let body = s.rect(...position.map(x => x - 12), 24, 24).attr({
            fill: enemy.alerted ? '#8C2722' : 'black',
            stroke: '#938F8E',
            strokeWidth: 2,
            strokeDasharray: '0,24,24,48',
            transform: `rotate(${direction} ${position.join(' ')})`
        })

        s.group(illumination, light, body)
    })
}
