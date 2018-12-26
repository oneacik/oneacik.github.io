class SpaceShipController extends InputProcessor {
    process(keys, actors) {
        return actors
            .flatMap(obj => {
                if (obj instanceof SpaceShip) {
                    var toPush = [obj];
                    obj.speed = 2;

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
                        obj.speed = 3;
                    }

                    if (keys.has("j")) {
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


class AgainController extends CanvasAwareInputProcessor{
    process(keys, canvas, actors) {
        if (actors.find(x => x instanceof SpaceShip) === undefined) {
            if (keys.has("f")){
                return AgainController.toNigdySieNieKonczy(canvas);
            }
        }
        return actors;
    }

    static toNigdySieNieKonczy(canvas){
        Score.add(-Score.getScore());

        var actors = [];
        actors.push(new SpaceShip(canvas.width / 2.0, canvas.height / 2.0));
        actors.push(new Meteor(canvas.width / 2.0, canvas.height / 3.0, Math.PI));
        return actors;
    }
}
