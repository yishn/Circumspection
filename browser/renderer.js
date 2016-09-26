require('snapsvg')

exports.render = function(level) {
    let s = Snap('#scene')
    s.clear()

    // Draw background

    s.rect(0, 0, 800, 500).attr({
        fill: '#121210'
    })

    // Draw blocks

    level.blocks.forEach(block => {
        s.rect(...block.position, ...block.size)
    })
}
