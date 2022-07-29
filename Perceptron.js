class Perceptron{
    
    constructor(_weights) { 
        this.max = 1
        this.min = -1
        this.learningRate = 0.01
        this.weights = _weights;
    }

    guess(inputs){
        let sum = 0
        for(let i = 0; i < this.weights.length; i++){
            sum += inputs[i] * this.weights[i]
        }
        let output = this.sign(sum)
        return output
    }

    //Activation function
    sign(n){
        if(n >= 0){
            return 1
        } else {
            return -1
        }
    }

    train(inputs, target){
        let guess = this.guess(inputs)
        let error = target - guess
        //Adjust weights
        for(let i = 0; i < this.weights.length; i++){
            this.weights[i] = this.weights[i] + error * inputs[i] * this.learningRate
        }
    }
}