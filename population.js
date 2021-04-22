class Population {

    constructor(size, lifespan, mutationRate) {
        this.size = size;

        this.population = [];
        this.parents = [];

        this.generation = 0;
        this.lifespan = lifespan; // in sec
        this.mutationRate = mutationRate;
    }

    generate() {
        for (let i = 0; i < this.size; i ++) {
            this.population.push(new Vehicle(320, 440));
            this.population[i].dna = new DNA(this.lifespan);
            this.population[i].dna.generate();
        }

        this.generation ++;
    }

    calc_Fitness(target) {
        let best;

        for (let i = 0; i < this.size; i ++) {
            let dist = Vec2.dist(this.population[i].pos, target.pos);
            let fitness = Math.pow(1 / dist, 2);
                
            if (this.population[i].dead || dist > 400)
                fitness *= 0.5;

            this.population[i].dna.fitness = fitness;
            
            // Selecting population with best fitness
            if (!best)
                best = this.population[i];

            else if (best.dna.fitness < fitness)
                best = this.population[i];
        }

        best.dna.fitness *= 10;
    }

    naturalSelection() {
        this.parents = [];
        let pool = [...this.population];

        // Selecting parents for reproduction
        for (let i = 0; i < 4; i ++) {
            let totalFitness = 0;

            // Calculating total fitness form the pool
            for (let j = 0; j < pool.length; j ++)
                totalFitness += pool[j].dna.fitness;
                
            // Calculating probability for DNA to be picked
            for (let j = 0; j < pool.length; j ++)
                pool[j].dna.prob = pool[j].dna.fitness / totalFitness;

            let pick = Math.random();

            for (let j = 0; j < pool.length; j ++) {
                pick -= pool[j].dna.prob;

                if (pick <= 0) {
                    this.parents.push(pool.splice(j, 1)[0]);
                    break;
                }
            }
        }
    }

    reproduction() {
        let newPopulation = [];

        // Reproduction by corssover
        for (let i = 0; i < this.size; i ++) {
            newPopulation.push(new Vehicle(320, 440));
            newPopulation[i].dna = DNA.crossover(this.parents, this.lifespan);
        }

        // Mutation
        for (let i = 0; i < this.size; i ++)
            newPopulation[i].dna.mutate(this.mutationRate);

        this.population = newPopulation;
        this.generation ++;
    }

    update(time) {
        for (let i = 0; i < this.size; i ++) {
            if (this.population[i].dead)
                continue;
    
            let sf = this.population[i].calc_SteeringForce(time);
        
            this.population[i].applyForce(sf);
            this.population[i].update();
        }
    }

    check_Collision(walls) {
        for (let i = 0; i < walls.length; i ++) {
            let vec1 = walls[i].start;
            let vec2 = walls[i].end;

            let path = Vec2.sub(vec2, vec1);

            for (let j = 0; j < this.size; j ++) {
                if (this.population[j].dead)
                    continue;

                let vec3 = Vec2.sub(this.population[j].pos, vec1);
                
                let angle = vec3.angle(path);

                if (angle > Math.PI / 2)
                    continue;

                let proj = vec3.proj(path);

                if (proj.mag() > path.mag())
                    continue;

                let distVec = Vec2.sub(vec3, proj);
                
                if (distVec.mag() <= 8)
                    this.population[j].dead = true;
            }
        }
    }
}