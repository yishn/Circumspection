require('snapsvg')

exports.render = function(level) {
    let s = Snap('#scene')
    s.clear()

    // Draw background

    s.rect(0, 0, 800, 500).attr({
        fill: '#0F1511'
    })

    // Draw blocks

    level.blocks.forEach(block => {
        s.rect(...block.position, ...block.size).attr({
            fill: 'black'
        })
    })

    // Draw player

    s.circle(...level.player.position, 12).attr({
        fill: 'black'
    })

    // Draw enemies

    level.enemies.forEach(enemy => {
        let transform = `rotate(${enemy.direction * 360} ${enemy.position.join(' ')})`

        let light = s.circle(...enemy.position, 12 + enemy.sightDistance).attr({
            fill: 'rgba(255, 255, 255, 0.1)',
            transform
        })

        let rect = s.rect(...enemy.position.map(x => x - 12), 24, 24).attr({
            fill: 'black',
            transform
        })
    })
}
