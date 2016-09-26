exports.range = function(min, max, step = 1) {
    let result = []

    for (let i = min; i <= max; i += step) {
        result.push(i)
    }

    return result
}

exports.pointsSign = function([x1, y1], [x2, y2]) {
    return [x2 - x1, y2 - y1].map(x => Math.sign(x))
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

exports.getRayCircleIntersections = function(point, direction, {position, radius}, maxDistance = Infinity) {
    if (exports.squaredEuclidean(position, point) - radius > Math.pow(maxDistance, 2))
        return []

    if (position[0] != 0 || position[1] != 0)
        return exports.getRayCircleIntersections(
            point.map((x, i) => x - position[i]),
            direction,
            {position: [0, 0], radius},
            maxDistance
        ).map(p => p.map((x, i) => x + position[i]))

    if (Math.abs(direction[0]) < Math.abs(direction[1]))
        return exports.getRayCircleIntersections(
            [point[1], point[0]],
            [direction[1], direction[0]],
            {position, radius},
            maxDistance
        ).map(([x, y]) => [y, x])

    direction[1] = Math.sign(direction[0]) * direction[1]
    direction[0] = Math.abs(direction[0])

    let d1d0 = direction[1] / direction[0]
    let a = Math.pow(d1d0, 2) + 1
    let b = 2 * (point[1] * d1d0 - point[0] * Math.pow(d1d0, 2))
    let c = Math.pow(point[1], 2) + Math.pow(d1d0 * point[0], 2) - 2 * d1d0 * point[1] * point[0] - 1

    let discriminant = Math.pow(b, 2) - 4 * a * c
    let xs = []

    if (discriminant == 0) {
        xs.push(-b / 2 / a)
    } else if (discriminant > 0) {
        let rootedDiscriminant = Math.sqrt(discriminant)
        xs.push((-b + rootedDiscriminant) / 2 / a)
        xs.push((-b - rootedDiscriminant) / 2 / a)
    }

    let sign = exports.pointsSign(point, direction)

    return xs.filter(x => x >= 0)
        .map(x => [x, point[1] + d1d0 * (x - point[0])])
        .filter(p => exports.squaredEuclidean(p, point) <= Math.pow(maxDistance, 2))
}
