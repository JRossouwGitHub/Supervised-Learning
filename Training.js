class Training{
    constructor(_min, _max){
        this.x = Math.random() * (_max - _min) + _min
        this.y = Math.random() * (_max - _min) + _min
        this.label = null
        if(this.x > this.y) {
            this.label = 1
        } else {
            this.label = -1
        }
    }

    draw(){
        ctx.beginPath()
        ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI)
        if(this.label == 1) {
            ctx.stroke()
        } else {
            ctx.fill()
        }
    }
}