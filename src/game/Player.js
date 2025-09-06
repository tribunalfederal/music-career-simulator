class Player {
    constructor() {
        this.profile = {
            name: "",
            artistName: "",
            age: 18,
            appearance: {
                height: 170,
                hairStyle: "",
                hairColor: "",
                skinColor: "",
                clothingStyle: ""
            },
            stats: {
                singing: 1,
                performance: 1,
                charisma: 1,
                songwriting: 1,
                production: 1
            },
            career: {
                level: 1,
                experience: 0,
                fans: 0,
                monthlyListeners: 0,
                reputation: 0
            },
            finances: {
                balance: 1000,
                income: {
                    streaming: 0,
                    shows: 0,
                    merch: 0
                },
                expenses: {
                    marketing: 0,
                    production: 0,
                    living: 0
                }
            }
        };
    }

    updateStats(newStats) {
        Object.keys(newStats).forEach(stat => {
            if (this.profile.stats[stat] !== undefined) {
                this.profile.stats[stat] += newStats[stat];
            }
        });
    }

    updateCareer(careerUpdate) {
        Object.keys(careerUpdate).forEach(key => {
            if (this.profile.career[key] !== undefined) {
                this.profile.career[key] += careerUpdate[key];
            }
        });
    }

    updateFinances(transaction) {
        this.profile.finances.balance += transaction.amount;
    }
}

export default Player;