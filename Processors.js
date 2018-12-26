class DeathProcessor extends Processor {
    process(actors) {
        return actors.filter(x => !x.die);
    }
}

class PositionProcessor extends CanvasAwareProcessor {
    static cut(limit, pos) {
        var npos = pos % limit;
        while (npos < 0) {
            npos += limit;
        }
        return npos;
    }

    process(canvas, actors) {
        return actors.map(obj => {
            obj.x = PositionProcessor.cut(canvas.width, obj.x);
            obj.y = PositionProcessor.cut(canvas.height, obj.y);
            return obj;
        });
    }
}

class LinearMovementProcessor extends Processor {
    process(actors) {
        return actors.map(obj => {
            if (obj.dx != null && obj.dy != null) {
                obj.x += obj.dx;
                obj.y += obj.dy;
            }
            return obj;
        });
    }
}

class AngleMovementProcessor extends Processor {
    process(actors) {
        return actors.map(obj => {
            if (obj.speed != null && obj.rotate != null) {
                obj.x += Math.sin(obj.rotate) * obj.speed;
                obj.y += Math.cos(obj.rotate) * obj.speed;
            }
            return obj
        });
    }
}

class TtlProcessor extends Processor {
    process(actors) {
        return actors.map(x => {
            if (x.ttl != null) {
                x.ttl -= 1;
            }
            return x;
        }).filter(x =>
            x.ttl == null || x.ttl > 0
        );
    }
}

class ReloadProcessor extends Processor {
    process(actors) {
        return actors.map(x => {
            if (x.reload != null) {
                x.reload -= 1;
            }
            return x;
        });
    }
}

class MeteorSplitProcessor extends Processor {
    process(actors) {
        return actors
            .flatMap(x => {
                if (x instanceof Meteor && x.hp < 0) {
                    return [
                        new Meteor(x.x, x.y, MeteorSplitProcessor.getRandomRotate()),
                        new Meteor(x.x, x.y, MeteorSplitProcessor.getRandomRotate())
                    ]
                } else {
                    return [x];
                }
            });
    }

    static getRandomRotate() {
        return Math.random() * 2 * Math.PI;
    }
}

class ShipDeathProcessor extends Processor{
    process(actors){
        return actors.filter(x => !(x instanceof SpaceShip && x.hp<0));
    }
}
