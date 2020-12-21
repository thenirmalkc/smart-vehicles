const width = 800
const height = 600

let lifespan = 300
let index = 0

// population
let population_size = 200
let mutation_rate = 0.05

// vehicle
let vehicle

// target
let target = new Vector2D(width / 2, 20)

// wall
let wall = {
  x: width / 2,
  y: height / 2,
  width: 300,
  height: 10
}


function setup() {
  const canvas = createCanvas(width, height)
  canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2)
  background(40)

  population = new Population(population_size, mutation_rate, target)

  // generating population
  population.generate()

  // selecting html elements
  const population_size_span = document.querySelector('#population_size')
  const mutation_rate_span = document.querySelector('#mutation_rate')
  const generation_span = document.querySelector('#generation')

  // displying on html
  population_size_span.innerText = population_size
  mutation_rate_span.innerText = mutation_rate * 100 + '%'
  generation_span.innerText = population.generation

}


function draw() {
  if(index >= lifespan) {
    index = 0

    // calculating fitness value of population
    population.calc_fitness()

    // selecting parents for reproduction
    population.natural_selection()

    // reproducing new population
    population.reproduction()


    // selecting html elements
    const generation_span = document.querySelector('#generation')

    // displying on html
    generation_span.innerText = population.generation
  }

  background(40)

  // displaying target
  fill('orangered')
  circle(target.x, target.y, 10)

  fill('skyblue')
  noStroke()
  rect(wall.x - wall.width / 2, wall.y - wall.height / 2, wall.width, wall.height)

  population.display()
  population.update(index)

  // checking collision of population with object
  check_collision(wall)
  index ++
}


function check_collision(wall) {
  for(let i = 0; i < population_size; i ++) {
    const vehicle = population.population[i]
    if(vehicle.destroyed) continue
    else if(vehicle.location.x >= wall.x - wall.width / 2 && vehicle.location.x <= wall.x + wall.width / 2 && vehicle.location.y >= wall.y - wall.height / 2 && vehicle.location.y <= wall.y + wall.height / 2) {
      vehicle.destroyed = true
    }
  }
}