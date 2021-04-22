const width = 640;
const height = 480;

let lifespan = 10;
let mutationRate = 0.02;

const vehicles = new Population(100, lifespan, mutationRate);
const target = new Target(320, 40);
const walls = [];

let time = 0;

let populationSize_span;
let mutationRate_span;
let generation_span;
let lifespan_span;


function setup() {
    const canvas = createCanvas(width, height);
    canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);

    walls.push(new Wall(180, 320, 240, 260));
    walls.push(new Wall(460, 320, 400, 260));
    walls.push(new Wall(280, 160, 360, 160));

    // Generating vehicle's population
    vehicles.generate();

    // Selecting html elements
    populationSize_span = document.querySelector("#population-size")
    mutationRate_span = document.querySelector("#mutation-rate")
    generation_span = document.querySelector("#generation")
    lifespan_span = document.querySelector("#lifespan")

    // Displying on html
    populationSize_span.innerText = vehicles.size;
    mutationRate_span.innerText = mutationRate * 100 + "%"
    generation_span.innerText = vehicles.generation;
    lifespan_span.innerText = lifespan - time - 1;
}


function draw() {
    background(color(40));

    // Displaying vehicles
    for (let i = 0; i < vehicles.size; i ++)
        vehicles.population[i].display();

    vehicles.update(time);
    vehicles.check_Collision(walls);

    // Displaying walls
    for (let i = 0; i < walls.length; i ++)
        walls[i].display();

    // Displaying target
    target.display();
}


setInterval(() => {
    // Updating html lifespan element
    lifespan_span.innerText = lifespan - time - 1;
   
    time ++;

    if (time >= vehicles.lifespan) {
        time = 0;

        vehicles.calc_Fitness(target);
        vehicles.naturalSelection();
        vehicles.reproduction();

        // Updating html generation element
        generation_span.innerText = vehicles.generation;
    }

}, 1000);