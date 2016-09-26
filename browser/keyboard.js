const keymap = {
    65: 'left', // A
    87: 'top', // W
    68: 'right', // D
    83: 'bottom', // S
    74: 'primary', // J
    75: 'secondary', // K
    81: 'shoulder-l', // Q
    69: 'shoulder-r', // E
    27: 'pause' // Esc
}

const data = {}

document.body.addEventListener('keydown', function(evt) {
    if (!(evt.keyCode in keymap)) return
    data[keymap[evt.keyCode]] = true
})

document.body.addEventListener('keyup', function(evt) {
    if (!(evt.keyCode in keymap)) return
    data[keymap[evt.keyCode]] = false
})

exports.pressed = function(key) {
    return key in data ? data[key] : false
}
