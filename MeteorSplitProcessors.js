class MeteorSplitProcessor extends Processor {


    constructor() {
        super();
        this.splits = [new ExplodingMeteorSplit(), new StandardMeteorSplit()];
    }

    process(actors) {
        return actors
            .flatMap(meteor => {
                if (meteor instanceof Meteor && meteor.hp < 0) {
                    return this.splits
                        .find(x => x.matches(meteor))
                        .split(actors, meteor);
                } else {
                    return [meteor];
                }
            });
    }

    static getRandomRotate() {
        return Math.random() * 2 * Math.PI;
    }
}


class BaseMeteorSplit {
    split(actors, meteor) {
    }

    matches(meteor) {
    }
}

class ExplodingMeteorSplit extends BaseMeteorSplit {

    split(actors, meteor) {
        return [1, 2, 3, 4, 5].map(x => new Bullet(meteor.x, meteor.y, MeteorSplitProcessor.getRandomRotate()));
    }

    matches(meteor) {
        return (meteor instanceof ExplodingMeteor);
    }
}

class StandardMeteorSplit extends BaseMeteorSplit {
    split(actors, meteor) {
        var ran = Math.random();
        var meteor_num = actors.filter(x => x instanceof Meteor).length;


        var func_val = this.sigmoid((meteor_num - 27) / 3);
        console.log(func_val);
        if (ran > func_val) {
            return [
                new Meteor(meteor.x, meteor.y, MeteorSplitProcessor.getRandomRotate()),
                new Meteor(meteor.x, meteor.y, MeteorSplitProcessor.getRandomRotate())
            ]
        } else {
            return [
                new Meteor(meteor.x, meteor.y, MeteorSplitProcessor.getRandomRotate()),
                new ExplodingMeteor(meteor.x, meteor.y, MeteorSplitProcessor.getRandomRotate())
            ]
        }
    }

    getRandomMeteor() {

    }

    sigmoid(x) {
        return (1 / (1 + Math.exp(-x)))
    }

    matches(meteor) {
        return (meteor instanceof Meteor)
    }

}
