class MeteorSplitProcessor extends Processor {


    constructor() {
        super();
        this.splits = [
            new HealingMeteorSplit(),
            new ExplodingMeteorSplit(),
            new SelfBombingSplit(),
            new StandardMeteorSplit()
        ];
    }

    process(actors) {
        return actors
            .flatMap(meteor => {
                if (meteor instanceof Meteor && (meteor.hp < 0 || meteor.ttl < 0)) {
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
        return [1, 2, 3, 4, 5]
            .map(x => {
                var rot = MeteorSplitProcessor.getRandomRotate();
                return new SlowBullet(meteor.x + meteor.radius * 2 * Math.sin(rot), meteor.y + meteor.radius * 2 * Math.cos(rot), rot);
            });
    }

    matches(meteor) {
        return (meteor instanceof ExplodingMeteor);
    }
}

class SelfBombingSplit extends BaseMeteorSplit {

    split(actors, meteor) {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            .map(x => {
                var rot = MeteorSplitProcessor.getRandomRotate();
                return new SlowBullet(meteor.x + meteor.radius * 2 * Math.sin(rot), meteor.y + meteor.radius * 2 * Math.cos(rot), rot);
            });
    }

    matches(meteor) {
        return (meteor instanceof SelfBombingMeteor);
    }
}

class HealingMeteorSplit extends BaseMeteorSplit {
    split(actors, meteor) {
        if (meteor.hp < 0) {
            actors.find(x => x instanceof SpaceShip).hp += meteor.hpAdd;
        }
        return [];
    }

    matches(meteor) {
        return (meteor instanceof HealingMeteor);
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
                (new (this.getRandomMeteor())(meteor.x, meteor.y, MeteorSplitProcessor.getRandomRotate()))
            ]
        }
    }

    getRandomMeteor() {
        var x = Math.random() * 100;
        if (x < 30) return SelfBombingMeteor;
        if (x < 35) return HealingMeteor;
        return ExplodingMeteor;
    }

    sigmoid(x) {
        return (1 / (1 + Math.exp(-x)))
    }

    matches(meteor) {
        return (meteor instanceof Meteor)
    }

}
