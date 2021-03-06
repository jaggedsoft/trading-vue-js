import Const from '../../stuff/constants.js'
import Utils from '../../stuff/utils.js'

const { PANHEIGHT } = Const.ChartConfig

export default class Sidebar {

    constructor(canvas, comp, side = 'right') {

        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.comp = comp
        this.$p = comp.$props
        this.data = this.$p.sub
        this.range = this.$p.range
        this.id = this.$p.grid_id
        this.layout = this.$p.layout.grids[this.id]

        this.side = side

    }

    update() {

        // Update reference to the grid
        this.layout = this.$p.layout.grids[this.id]

        var points = this.layout.ys
        var x, y, w, h, side = this.side
        var sb = this.layout.sb

        this.ctx.fillStyle = this.$p.colors.colorBack
        this.ctx.font = this.$p.font

        switch(side) {
            case 'left':
                x = 0
                y = 0
                w = Math.floor(sb)
                h = this.layout.height

                this.ctx.fillRect(x, y, w, h)

                this.ctx.strokeStyle = this.$p.colors.colorScale

                this.ctx.beginPath()
                this.ctx.moveTo(x + 0.5, 0)
                this.ctx.lineTo(x + 0.5, h)
                this.ctx.stroke()

                break
            case 'right':
                x = 0
                y = 0
                w = Math.floor(sb)
                h = this.layout.height
                this.ctx.fillRect(x, y, w, h)

                this.ctx.strokeStyle = this.$p.colors.colorScale

                this.ctx.beginPath()
                this.ctx.moveTo(x + 0.5, 0)
                this.ctx.lineTo(x + 0.5, h)
                this.ctx.stroke()
                break
        }

        this.ctx.fillStyle = this.$p.colors.colorText
        this.ctx.beginPath()

        for (var p of points) {

            if (p[0] > this.layout.height) continue

            var x1 = side === 'left' ? w - 0.5 : x - 0.5
            var x2 = side === 'left' ? x1 - 4.5 : x1 + 4.5

            this.ctx.moveTo(x1, p[0] - 0.5)
            this.ctx.lineTo(x2, p[0] - 0.5)

            var offst = side === 'left' ? - 10 : 10
            this.ctx.textAlign = side === 'left' ? 'end' : 'start'
            let d = this.layout.prec
            this.ctx.fillText(p[1].toFixed(d), x1 + offst, p[0] + 4)
        }

        this.ctx.stroke()

        if (this.$p.grid_id) this.upper_border()
        if (this.$p.cursor.y && this.$p.cursor.y$) this.panel()

    }

    upper_border() {
        this.ctx.strokeStyle = this.$p.colors.colorScale
        this.ctx.beginPath()
        this.ctx.moveTo(0, 0.5)
        this.ctx.lineTo(this.layout.width, 0.5)
        this.ctx.stroke()
    }

    // A gray bar behind the current price
    panel() {

        if (this.$p.cursor.grid_id !== this.layout.id) {
            return
        }

        let lbl = this.$p.cursor.y$
        this.ctx.fillStyle = this.$p.colors.colorPanel

        let panwidth = this.layout.sb + 1

        let x = - 0.5
        let y = this.$p.cursor.y - PANHEIGHT * 0.5 - 0.5
        let a = 5 //* 0.5
        this.ctx.fillRect(x - 0.5, y, panwidth, PANHEIGHT)
        this.ctx.fillStyle = this.$p.colors.colorTextHL
        this.ctx.textAlign = 'left'
        this.ctx.fillText(lbl, a, y + 16)

    }

    mousemove(e) { }
    mouseout(e) { }
    mouseup(e) { }
    mousedown(e) { }

}
