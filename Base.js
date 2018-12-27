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

class CanvasAwareInputProcessor {
    process(keys, canvas, actors) {
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


class BaseObject {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.die = false;
        this.boundable = true;
        this.canvasSize = 500;
        this.radius = 10;
        this.ttl = null;
        this.style = {
            colorMain: "white",
            colorGlow: "white",
            colorText: "white",
            colorSfx: "red"
        }
    }

    setAllColors(color) {
        this.style.colorMain = color;
        this.style.colorGlow = color;
        this.style.colorText = color;
        this.style.colorSfx = color;
    }

    setupContext(context) {
        context.strokeStyle = this.style.colorMain;
        context.fillStyle = this.style.colorMain;
        context.shadowColor = this.style.colorGlow;
        context.shadowBlur = 3;
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


class BaseScene {
    getCanvas() {
    }

    getKeys() {
    }

    handle(actors, processors, handler) {
        var wrap = (actors) => [actors, processors];

        if (handler instanceof HitProcessor) {
            return wrap(handler.process(actors));
        } else if (handler instanceof CanvasAwareProcessor) {
            return wrap(handler.process(this.getCanvas(), actors))
        } else if (handler instanceof CanvasAwareInputProcessor) {
            return wrap(handler.process(this.getKeys(), this.getCanvas(), actors))
        } else if (handler instanceof InputProcessor) {
            return wrap(handler.process(this.getKeys(), actors))
        } else if (handler instanceof Drawer) {
            return wrap(handler.draw(this.getCanvas(), actors))
        } else if (handler instanceof Processor) {
            return wrap(handler.process(actors));
        } else {
            throw "No handler found for this shiet, burrp Morty.";
        }
    }
}
