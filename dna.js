class DNA {

  constructor(genes_len) {
    this.genes_len = genes_len
    this.genes = []
    this.fitness = 0
    this.prob = 0
  }


  // generates random genes
  generate_random_genes() {
    this.genes = []

    for(let i = 0; i < this.genes_len; i ++) {
      this.genes.push(Vector2D.random().set_mag(2))
    }
  }


  // calculates fitness
  calc_fitness(target, location) {
    let distance = Vector2D.sub(target, location)
      .mag()
    if(distance < 1) distance = 1
    distance = Math.pow(distance, 2)
    this.fitness = 1 / distance
  }


  // performs crossover
  static cross_over(parents) {
    let dna = new DNA(lifespan)

    let partner = [...parents]
    let partner1 = partner.splice(Math.floor(Math.random() * partner.length), 1)[0]
    let partner2 = partner.splice(Math.floor(Math.random() * partner.length), 1)[0]

    let mid_point = Math.floor(Math.random() * dna.genes_len - 2) + 1

    for(let i = 0; i < dna.genes_len; i ++) {
      if(i < mid_point) {
        dna.genes.push(partner1.dna.genes[i])
      }
      else {
        dna.genes.push(partner2.dna.genes[i])
      }
    }
    return dna.genes
  }


  // performs mutation
  mutate(mutation_rate) {
    for(let i = 0; i < this.genes_len; i ++) {
      if(mutation_rate > Math.random()) {
        this.genes[i] == Vector2D.random().set_mag(2)
      }
    }
  }
}