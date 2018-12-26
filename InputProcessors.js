class SpaceShipController extends InputProcessor {
    process(keys, actors) {
        return actors
            .flatMap(obj => {
                if (obj instanceof SpaceShip) {
                    var toPush = [obj];

                    if (keys.has("a")) {
                        obj.rotate += 0.1;
                    }

                    if (keys.has("d")) {
                        obj.rotate -= 0.1;
                    }

                    if (keys.has("w")) {
                        if (obj.reload < 0) {
                            obj.reload = 10;
                            toPush.push(
                                new Bullet(
                                    obj.x + Math.sin(obj.rotate) * obj.radius * 2,
                                    obj.y + Math.cos(obj.rotate) * obj.radius * 2,
                                    obj.rotate
                                ));
                        }
                    }
                    return toPush;
                } else {
                    return [obj];
                }
            });
    }
}
