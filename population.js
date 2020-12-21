class Population {

  constructor(population_size, mutation_rate, target) {
    this.population_size = population_size
    this.population = []
    this.parents_size = 16 // minimum 2
    this.parents = []

    this.generation = 0
    this.mutation_rate = mutation_rate
    this.total_fitness = 0

    this.target = target
  }


  // generates population
  generate() {
    this.population = []

    for(let i = 0; i < this.population_size; i ++) {
      this.population.push(new Vehicle(width / 2, 580))
      this.population[i].dna.generate_random_genes()
    }

    this.generation += 1
  }


  // calculates fitness
  calc_fitness() {
    this.total_fitness = 0
    this.best_individual = this.population[0]

    for(let i = 0; i < this.population_size; i ++) {
      this.population[i].dna.calc_fitness(this.target, this.population[i].location)
      if(this.population[i].destroyed) {
        this.population[i].dna.fitness *= 0.5
      }
      this.total_fitness += this.population[i].dna.fitness
    }
  }


  // natural selection
  natural_selection() {

    // calculating probability of genes being picked
    for(let i = 0; i < this.population_size; i ++) {
      this.population[i].dna.prob = this.population[i].dna.fitness / this.total_fitness
    }

    this.parents = []

    // selecting parents
    for(let i = 0; i < this.parents_size; i ++) {
      let pick = Math.random()

      for(let j = 0; j < this.population_size; j ++) {
        pick -= this.population[j].dna.prob
        if(pick <= 0) {
          this.parents.push(this.population[j])
          break
        }
      }
    }
  }


  // reproduces population
  reproduction() {
    let new_population = []

    // reproduction
    for(let i = 0; i < this.population_size; i ++) {
      new_population.push(new Vehicle(width / 2, 580))
      new_population[i].dna.genes = DNA.cross_over(this.parents)
    }

    // mutation
    for(let i = 0; i < this.population_size; i ++) {
      new_population[i].dna.mutate(this.mutation_rate)
    }

    this.population = new_population
    this.generation += 1
  }


  // updates the population
  update(index) {
    for(let i = 0; i < this.population_size; i ++) {

      if(this.population[i].destroyed) continue

      let steering_froce = this.population[i].dna.genes[index]
        .limit(this.population[i].max_force)

      this.population[i].apply_force(steering_froce)
      this.population[i].update()
    }
  }


  // displays the population
  display() {
    for(let i = 0; i < this.population_size; i ++) {
      this.population[i].display()
    }
  }
}