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
        actors.forEach(obj => {
            obj.x = PositionProcessor.cut(canvas.width, obj.x);
            obj.y = PositionProcessor.cut(canvas.height, obj.y);
            return obj;
        });
        return actors
    }
}

class LinearMovementProcessor extends Processor {
    process(actors) {
        actors.forEach(obj => {
            if (obj.dx != null && obj.dy != null) {
                obj.x += obj.dx;
                obj.y += obj.dy;
            }
            return obj;
        });
        return actors;
    }
}

class AngleMovementProcessor extends Processor {
    process(actors) {
        actors.forEach(obj => {
            if (obj.speed != null && obj.rotate != null) {
                obj.x += Math.sin(obj.rotate) * obj.speed;
                obj.y += Math.cos(obj.rotate) * obj.speed;
            }
        });
        return actors;
    }
}

class TtlProcessor extends Processor {
    process(actors) {
        return actors.filter(x =>
            x.ttl == null || x.ttl >= 0
        )
            .map(x => {
                if (x.ttl != null) {
                    x.ttl -= 1;
                }
                return x;
            });
    }
}

class ReloadProcessor extends Processor {
    process(actors) {
        actors.forEach(x => {
            if (x.reload != null) {
                x.reload -= 1;
            }
        });
        return actors;
    }
}


class ShipDeathProcessor extends Processor {
    process(actors) {
        return actors.filter(x => !(x instanceof SpaceShip && x.hp < 0));
    }
}

class InvulDecreaser extends Processor {
    process(actors) {
        actors.forEach(x => {
            if (x.invul != null) {
                if (x.invul > 0) {
                    x.invul--;
                }
            }
        });

        return actors;
    }
}
