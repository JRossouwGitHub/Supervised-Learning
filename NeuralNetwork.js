let steps = 0
let trainingIndex = 0;
let green = 0
let red = 0
let p = new Perceptron()

let points = new Array(100)
for(let i = 0; i < points.length; i++){
    points[i] = new Training(0, canvas.height)
}

let stop = false
const draw = () => {
    if(!stop){
        requestAnimationFrame(draw);
    
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
            ctx.font = "30px Arial";
            ctx.fillText("Steps: " + steps, 10, 30);
        }
        if((green - red) < 100){
            steps++
        }
        if((green - red) >= 100){
            console.log(p.weights)
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

draw()

const trainStep = () => {
    for(let i = 0; i < points.length; i++){
        let inputs = [points[i].x, points[i].y]
        let target = points[i].label
        p.train(inputs, target)
    }
    
}

window.addEventListener("click", () => console.log(p.weights))