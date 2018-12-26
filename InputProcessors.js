class SpaceShipController extends InputProcessor {
    process(keys, actors) {
        return actors
            .flatMap(obj => {
                if (obj instanceof SpaceShip) {
                    var toPush = [obj];
                    obj.speed = 3;

                    if (keys.has("a")) {
                        obj.rotate += 0.1;
                    }

                    if (keys.has("d")) {
                        obj.rotate -= 0.1;
                    }

                    if (keys.has("s")) {
                        obj.speed = 1;
                    }

                    if (keys.has("w")) {
                        obj.speed = 5;
                    }

                    if (keys.has("f")) {
                        if (obj.reload < 0) {
                            obj.reload = 50;
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
