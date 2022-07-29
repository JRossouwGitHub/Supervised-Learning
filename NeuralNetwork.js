let _steps = document.getElementById('steps')
let w1B = document.getElementById('w1B')
let w2B = document.getElementById('w2B')
let w1A = document.getElementById('w1A')
let w2A = document.getElementById('w2A')

let steps
let trainingIndex = 0
let green = 0
let red = 0
let p

let points
let fps = 5

let stop = true
const draw = () => {
    fps = parseInt(document.getElementById('stepSpeed').value)
    setTimeout(function(){
        requestAnimationFrame(draw);
    }, 1000 / fps)
    if(!stop){
        ctx.clearRect(0,0,canvas.width, canvas.height)
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.stroke();
        for(let i = 0; i < points.length; i++){
            points[i].draw()
            let inputs = [points[i].x, points[i].y]
            let target = points[i].label
            let guess = p.guess(inputs)
            if(guess == target){
                ctx.fillStyle = 'green'
                green++
            } else {
                ctx.fillStyle = 'red'
                red++
            }
            ctx.beginPath()
            ctx.arc(points[i].x, points[i].y, 5, 0, 2 * Math.PI)
            ctx.fill();
            ctx.fillStyle = 'black'
            _steps.innerHTML = 'Steps: ' + steps
        }
        if((green - red) < points.length){
            steps++
        }
        if((green - red) >= points.length){
            w1A.innerHTML = "Weight 1 (after): " + p.weights[0].toFixed(2)
            w2A.innerHTML = "Weight 2 (after): " + p.weights[1].toFixed(2)
            stop = true;
        }
        green = 0
        red = 0
        let _inputs = [points[trainingIndex].x, points[trainingIndex].y]
        let _target = points[trainingIndex].label
        p.train(_inputs, _target)
        trainingIndex++
        if(trainingIndex == points.length){
            trainingIndex = 0
        }
    }
}

const start = () => {
    let _w1 = parseFloat(document.getElementById('weight1').value)
    let _w2 = parseFloat(document.getElementById('weight2').value)
    if(_w1 > 0 || _w2 > 0){
        p = new Perceptron([isNaN(_w1) ? 0 : _w1, isNaN(_w2) ? 0 : _w2])
    } else {
        p = new Perceptron([(Math.random() * (1 - -1) + -1), (Math.random() * (1 - -1) + -1)])
    }
    reset()
    w1B.innerHTML = "Weight 1 (before): " + p.weights[0].toFixed(2)
    w2B.innerHTML = "Weight 2 (before): " + p.weights[1].toFixed(2)
    stop = false
    let _numOfDots = parseInt(document.getElementById('numOfDots').value)
    if(_numOfDots > 0){
        points = new Array(_numOfDots)
    } else {
        points = new Array(100)
    }
    for(let i = 0; i < points.length; i++){
        points[i] = new Training(0, canvas.height)
    }
    draw()
}

const reset = () => {
    stop = true
    ctx.clearRect(0,0,canvas.width, canvas.height)
    steps = 0
    trainingIndex = 0
    green = 0
    red = 0
    _steps.innerHTML = 'Steps: 0'
    w1B.innerHTML = "Weight 1 (before): 0"
    w2B.innerHTML = "Weight 2 (before): 0"
    w1A.innerHTML = "Weight 1 (after): 0"
    w2A.innerHTML = "Weight 2 (after): 0"
}

window.addEventListener("click", () => console.log(p.weights))