const content = document.querySelector('.content')
class Field {
    #gameField;
    #cell;

    constructor(gameField, cell) {
        this.#gameField = gameField;
        this.#cell = cell; 
    }

    fieldSetting() {
        this.#gameField = document.createElement('div');
        content.appendChild(this.#gameField);
        this.#gameField.classList.add('field');
    }

    cellSetting() {
        for (let i = 0; i < 100; i++) {
            this.#cell = document.createElement('cell');
            this.#gameField.appendChild(this.#cell);
            this.#cell.classList.add('cell');
        }

        this.#cell = document.getElementsByClassName('cell');

        let x = 1,
            y = 10;

        for (let i = 0; i < this.#cell.length; i++) {
            if(x > 10) {
                x = 1;
                y--;
            }
            
            this.#cell[i].setAttribute('posX', x);
            this.#cell[i].setAttribute('posY', y);
            x++;
        }
    }

}

class Snake extends Field {

    constructor(snakeBody) {
        super();
        this.snakeBody = snakeBody;
    }

    snakeSetting() {
        this.coordinates = [5, 6];
        this.snakeBody = [document.querySelector('[posX = "' + this.coordinates[0] + '"][posY = "' + this.coordinates[1] +'"]'),
        document.querySelector('[posX = "' + (this.coordinates[0] - 1) + '"][posY = "' + this.coordinates[1] +'"]')];

        for(let i = 0; i < this.snakeBody.length; i++) {
            this.snakeBody[i].classList.add('snakeBody');
        }

        this.snakeBody[0].classList.add('head');

        return this.snakeBody;
    }
}

let apple;

class Food extends Snake {

    generateApple() {
        function createApple() {
            function generateApple() {
                let posX = Math.round(Math.random() * (10 - 3) + 3);
                let posY = Math.round(Math.random() * (10 - 1) + 1);
                return[posX, posY];
            }    

            let appleCoordinates = generateApple();
            apple = document.querySelector('[posX = "' + appleCoordinates[0] + '"][posY = "' + appleCoordinates[1] +'"]');

            while (apple.classList.contains('apple') || apple.classList.contains('snakeBody') || apple.classList.contains('head')) {
                appleCoordinates = generateApple();
                apple = document.querySelector('[posX = "' + appleCoordinates[0] + '"][posY = "' + appleCoordinates[1] +'"]');
            }
        
            apple.classList.add('apple');
        }
        createApple();
    }
}

let direction = 'right';
let steps = false;
let table = document.createElement('div');
content.prepend(table);
table.classList.add('table');
let score = 0;
let bestResult = 0;

class Game extends Food {

    constructor() {
        super();
        this.interval = null;
        this.loadBestResult();
        this.applesEaten = 0;
    }

    loadBestResult() {
        if (localStorage.getItem('bestResult')) {
            bestResult = parseInt(localStorage.getItem('bestResult'));
        }
    }

    restartGame() {
        this.btn = document.createElement('button');
        content.appendChild(this.btn)
        this.btn.innerHTML = 'Рестарт';
        this.btn.classList.add('btn')
        this.btn.style.display = 'none';
    }
    
    updateScore() {
        if (this.snakeBody[0].getAttribute('posX') == apple.getAttribute('posX') && this.snakeBody[0].getAttribute('posY') == apple.getAttribute('posY')) {
            apple.classList.remove('apple');
            let a = this.snakeBody[this.snakeBody.length - 1].getAttribute('posX');
            let b = this.snakeBody[this.snakeBody.length - 1].getAttribute('posY');
            this.snakeBody.push(document.querySelector('[posX = "' + a +'"][posY = "' + b +'"]'));
            food.generateApple();
            score++;
            if (score > bestResult) {
                bestResult = score;
            }
            this.applesEaten++;
            if (this.applesEaten % 2 === 0) { 
                clearInterval(this.interval);
                this.move();
            }
            table.innerHTML = `Счёт - ${score}          
                               Рекорд - ${bestResult}`;
        } 
    }

    restart() {
        if(this.snakeBody[0].classList.contains('snakeBody')) {
            clearInterval(this.interval);
            this.btn.style.display = 'block';
            this.btn.addEventListener('click', () => {
                table.innerHTML = '0';
                score = 0;
                direction = 'right';
                steps = false;
                this.snakeBody.forEach(elem => elem.classList.remove('snakeBody', 'head'));
                snake.snakeSetting();
                clearInterval(this.interval);
                this.btn.style.display = 'none';
                this.applesEaten = 0; 
                this.move();
        }) 
        }
    }

    updateClass() {
        this.snakeBody[0].classList.add('head');
        for (let i = 0; i < this.snakeBody.length; i++) {
            this.snakeBody[i].classList.add('snakeBody');
        }
    }

    move() {
        table.innerHTML = `Счёт - ${score}          
                           Рекорд - ${bestResult}`;
        this.snakeBody = snake.snakeBody;

        if (this.interval) {
            clearInterval(this.interval);
            localStorage.setItem('bestResult', bestResult);
        }
              
        this.interval = setInterval(() => {
                    this.snakeCoordinates = [this.snakeBody[0].getAttribute('posX'), this.snakeBody[0].getAttribute('posY')]
                    this.snakeBody[0].classList.remove('head');
                    this.snakeBody[this.snakeBody.length - 1].classList.remove('snakeBody');
                    this.snakeBody.pop();
              
                    if(direction == 'right') {
                        if(this.snakeCoordinates[0] < 10) {
                            this.snakeBody.unshift(document.querySelector('[posX = "' + (+this.snakeCoordinates[0] + 1) + '"][posY = "' + this.snakeCoordinates[1] +'"]'))
                        } else {
                            clearInterval(this.interval);
                        }
                    } else if(direction == 'left') {
                        if(this.snakeCoordinates[0] > 1) {
                            this.snakeBody.unshift(document.querySelector('[posX = "' + (+this.snakeCoordinates[0] - 1) + '"][posY = "' + this.snakeCoordinates[1] +'"]'))
                        } else {
                            clearInterval(this.interval);
                        }
                    } else if(direction == 'up') {
                        if(this.snakeCoordinates[1] < 10) {
                            this.snakeBody.unshift(document.querySelector('[posX = "' + this.snakeCoordinates[0] + '"][posY = "' + (+this.snakeCoordinates[1] + 1) +'"]'))
                        } else {
                            clearInterval(this.interval);
                        }
                    } else if(direction == 'down') {
                        if(this.snakeCoordinates[1] > 1) {
                            this.snakeBody.unshift(document.querySelector('[posX = "' + this.snakeCoordinates[0] + '"][posY = "' + (this.snakeCoordinates[1] - 1) +'"]'))
                        } else {
                            clearInterval(this.interval);
                        }
                    } 

                    this.updateScore();
                    this.restart();
                    this.updateClass();
                                              
                    steps = true;                
        }, 500 - (this.applesEaten * 8))
    }
}

window.addEventListener('keydown', function (e) {
    if(steps == true) {
        if(e.keyCode == 37 && direction != 'right') {
            direction = 'left';
            steps = false;
        }
        else if(e.keyCode == 38 && direction != 'down') {
            direction = 'up';
            steps = false;
        }
        else if(e.keyCode == 39 && direction != 'left') {
            direction = 'right';
            steps = false;
        }
        else if(e.keyCode == 40 && direction != 'up') {
            direction = 'down';
            steps = false;
        }
    }
})


let field = new Field();
let snake = new Snake();
let food = new Food();
let game = new Game();
field.fieldSetting();
field.cellSetting();
food.generateApple();
snake.snakeSetting();
const clickHandler = function() {
    game.move();
    content.removeEventListener('click', clickHandler);
};
content.addEventListener('click', clickHandler);
game.restartGame();


