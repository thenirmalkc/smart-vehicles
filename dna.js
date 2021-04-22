class DNA {

    constructor(size) {
        this.size = size;
        this.genes = [];
        this.fitness = 0;
        this.prob = 0;
    }

    generate() {
        for (let i = 0; i < this.size; i ++)
            this.genes.push(Vec2.random());
    }
    
    mutate(mutationRate) {
        for (let i = 0; i < this.size; i ++) {

            if (mutationRate > Math.random())
                this.genes[i] = Vec2.random();

        }
    }

    static crossover(parents, lifespan) {
        const dna = new DNA(lifespan);

        const partners = [...parents];
        const partner1 = partners.splice(Math.floor(Math.random() * partners.length), 1)[0];
        const partner2 = partners.splice(Math.floor(Math.random() * partners.length), 1)[0];

        let midpoint = Math.floor(Math.random() * dna.size - 2) + 1

        for (let i = 0; i < dna.size; i ++) {
            
            if (i < midpoint)
                dna.genes.push(partner1.dna.genes[i]);
            else
                dna.genes.push(partner2.dna.genes[i]);
        }

        return dna;
    }
}