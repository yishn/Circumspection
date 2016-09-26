exports.range = function(min, max, step = 1) {
    let result = []

    for (let i = min; i <= max; i += step) {
        result.push(i)
    }

    return result
}

exports.squaredEuclidean = function([x1, y1], [x2, y2]) {
    return Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)
}

exports.euclidean = function(x, y) {
    return Math.sqrt(exports.squaredEuclidean(x, y))
}

exports.valueInInterval = function(x, min, max) {
    return min <= x && x <= max
}

exports.pointInBlock = function(point, {position, size}) {
    return point.every((x, i) => exports.valueInInterval(x, position[i], position[i] + size[i]))
}

exports.getRayBlockIntersections = function(point, direction, {position, size}, maxDistance = Infinity) {
    let lists = [0, 1].map(i => [position[i], position[i] + size[i]])
    let directionVector = [Math.cos, Math.sin].map(f => f(direction * 2 * Math.PI / 360))
    let intersections = []

    lists.forEach((list, i) => {
        list.forEach(x => {
            if (directionVector[i] == 0) return

            let distance = (x - point[i]) / directionVector[i]
            if (!exports.valueInInterval(distance, 0, maxDistance)) return

            let intersection = [0, 1].map(j => j == i ? x : point[j] + directionVector[j] * distance)
            if (!exports.pointInBlock(intersection, {position, size})) return

            intersections.push(intersection)
        })
    })

    return intersections
}
