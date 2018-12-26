class Processor {
    process(actors) {
    }
}

class CanvasAwareProcessor {
    process(canvas, actors) {
    }
}

class InputProcessor {
    process(keys, actors) {
    }
}

class Drawer {
    /**
     * @param canvas
     * @param actors
     * @returns BaseObject[]
     */
    draw(canvas, actors) {


    }
}

class HitProcessor {

    process(actors) {
        return actors.map(first =>
            actors
                .filter(second => second !== first)
                .reduce(
                    (first, second) => this.do(first, second),
                    first
                )
        );
    }

    /**
     * @returns object state after hit detection or not
     */
    do(first, second) {
        return first;
    }

    static isCircleHit(first, second) {
        return Math.sqrt(Math.pow(first.x - second.x, 2) + Math.pow(first.y - second.y, 2)) < (second.radius + first.radius);
    }

}

class BaseScene {
    getCanvas() {
    }

    getKeys() {
    }

    getActors() {
    }
}


class BaseObject {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.die = false;
        this.boundable = true;
        this.canvasSize = 500;
        this.radius = 10;
        this.ttl = null;
    }

    draw(canvas) {
    }

    react(scene, keys) {
        scene
            .filter(x => this.isHit(x))
            .forEach(x => {
                this.hit(x);
                x.hit(this);
            });
    }



    setX(x) {
        this.x = this.cut(x);
    }

    setY(y) {
        this.y = this.cut(y);
    }

    isHit(object) {
        return Math.sqrt(Math.pow(object.x - this.x, 2) + Math.pow(object.y - this.y, 2)) < (this.radius + object.radius);
    }

    hit(x) {
    }

}
