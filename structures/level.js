class Level {
    constructor({width, height, player, destination, blocks = [], enemies = []}) {
        this.width = width
        this.height = height
        this.player = player
        this.destination = destination
        this.blocks = blocks
        this.enemies = enemies
    }
}

module.exports = Level
