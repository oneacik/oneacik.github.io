class MeteorSplitProcessor extends Processor {


    constructor() {
        super();
        this.splits = [new StandardMeteorSplit()];
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

class StandardMeteorSplit extends BaseMeteorSplit {
    split(actors, meteor) {
        var ran = Math.random();

        if (ran > 0.5) {
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

    matches(meteor) {
        return (meteor instanceof Meteor)
    }

}
