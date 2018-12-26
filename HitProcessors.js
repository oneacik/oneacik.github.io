class BulletToAnythingHitProcessor extends HitProcessor {
    do(first, second) {
        if (!(first instanceof Bullet && !(second instanceof Bullet))) {
            return first;
        }
        if (HitProcessor.isCircleHit(first, second)) {
            first.die = true;
        }
        return first;
    }
}


class SpaceShipToAnythingHitProcessor extends HitProcessor {
    do(first, second) {
        if (!(first instanceof SpaceShip)) {
            return first;
        }
        //make it a little easier to not get hit
        var fake_first = {x: first.x, y: first.y, radius: first.radius};

        if (HitProcessor.isCircleHit(fake_first, second)) {
            first.hp -= 1;
            first.invul = 80;
        }
        return first;
    }
}

class MeteorToBulletHitProcessor extends HitProcessor {
    do(first, second) {
        if (!(first instanceof Meteor && second instanceof Bullet)) {
            return first;
        }

        if (HitProcessor.isCircleHit(first, second)) {
            first.hp -= 1;
            Score.add(100);
        }

        return first;
    }
}

class InvulernableHitProcessorDecorator extends HitProcessor {
    constructor(processor) {
        super();
        this.processor = processor;
    }

    do(first, second) {
        if (first.invul == null) {
            return this.processor.do(first, second);
        } else {
            if (first.invul <= 0) {
                return this.processor.do(first, second);
            } else {
                return first;
            }
        }
    }
}
