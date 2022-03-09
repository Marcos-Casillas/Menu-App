class Poke {
    constructor(name, type) {
        this.name = name;
        this.type = type;

    }
    describe() {
        return `${this.name}'s type is ${this.type}.`;
    }
}

class Trainer {
    constructor(name) {
        this.name = name;
        this.pokes = [];
    }
    addPokes(poke) {
        if (poke instanceof Poke) {
            this.pokes.push(poke);
        } 
        else {
            throw new Error(`You can only add an instance of a Poke. Argument is not a Poke: ${poke}`);
        }
    }
    describe() {
        return `${this.name} has ${this.pokes.length} pokes.`;
    }
}

class Menu {
    constructor() {
        this.trainers = [];
        this.selectedTrainers = null;
    }
    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch(selection) {
                case '1':
                    this.createTrainer();
                    break;
                case '2':
                    this.viewTrainer();
                    break;
                case '3':
                    this.deleteTrainer();
                    break;
                case '4':
                    this.displayTrainers();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert('goodbye!');
    }

    showMainMenuOptions() {
        return prompt(`
        0) leave
        1) create a trainer
        2) view trainer
        3) delete trainer
        4) display all trainers
        `);
    }

    showTrainerMenuOptions(trainerInfo) {
        return prompt(`
        0) leave
        1) create poke
        2) delete poke
        -------------------
        ${trainerInfo}
        `);

    }

    displayTrainers() {
        let trainerString = '';
        for (let i = 0; i < this.trainers.length; i++) {
            trainerString += i + `) ` + this.trainers[i].name + '\n';
        }
        alert(trainerString);
    }

    createTrainer() {
        let name = prompt('Enter name for new trainer:');
        this.trainers.push(new Trainer(name));
    }

    viewTrainer() {
        let index = prompt('Enter the index of the trainer you wihs to see:');
        if (index > -1 && index < this.trainers.length) {
            this.selectedTrainer = this.trainers[index];
            let description = 'Trainer Name: ' + this.selectedTrainer.name + '\n';

            for (let i = 0 ; i < this.selectedTrainer.pokes.length; i ++) {
                description += i + ') ' + this.selectedTrainer.pokes[i].name
                + ' - ' + this.selectedTrainer.pokes[i].type + '\n';
            }

            let selection = this.showTrainerMenuOptions(description);
            switch  (selection) {
                case `1`:
                    this.createPoke();
                    break;
                case `2`:
                    this.deletePoke();

            }
        }
    }

    deleteTrainer() {
        let index = prompt(" Enter index of trainer you wish to delete:");
        if ( index > -1 && index < this.trainers.length) {
            this.trainers.splice(index, 1);
        }
    }

    createPoke() {
        let name = prompt('enter name for the new poke:');
        let type = prompt('enter the pokes type:');
        this.selectedTrainer.pokes.push(new Poke(name, type));
    }

    deletePoke() {
        let index = prompt('enter the index of the poke you wish to delete:');
        if (index > -1 && index < this.selectedTrainer.pokes.length) {
            this.selectedTrainer.pokes.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();