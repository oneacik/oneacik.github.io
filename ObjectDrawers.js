class SpaceShipDrawer extends Drawer {
    draw(canvas, actors) {
        actors
            .filter(x => x instanceof SpaceShip)
            .forEach(
                ship => {
                    var context = canvas.getContext('2d');
                    if (ship.invul > 0) {
                        if(Ticker.i%20 > 10){
                            context.strokeStyle = "#FF2222";
                        }else{
                            context.strokeStyle = "#2222FF";
                        }

                    } else {
                        context.strokeStyle = "#FFFFFF";
                    }

                    context.beginPath();
                    context.moveTo(ship.x + ship.radius * Math.sin(ship.rotate), ship.y + ship.radius * Math.cos(ship.rotate));
                    context.lineTo(ship.x + ship.radius * Math.sin(ship.rotate + 2.0 / 3.0 * Math.PI), ship.y + ship.radius * Math.cos(ship.rotate + 2.0 / 3.0 * Math.PI));
                    context.lineTo(ship.x + ship.radius * Math.sin(ship.rotate + 4.0 / 3.0 * Math.PI), ship.y + ship.radius * Math.cos(ship.rotate + 4.0 / 3.0 * Math.PI));
                    context.lineTo(ship.x + ship.radius * Math.sin(ship.rotate), ship.y + ship.radius * Math.cos(ship.rotate));
                    context.shadowColor = context.strokeStyle;
                    context.shadowBlur = 3;
                    context.stroke();
                }
            );
        return actors;
    }
}


class BulletDrawer extends Drawer {
    draw(canvas, actors) {
        actors
            .filter(x => x instanceof Bullet)
            .forEach(
                bullet => {
                    var context = canvas.getContext('2d');
                    context.strokeStyle = "#FF0000";
                    context.beginPath();
                    context.arc(bullet.x, bullet.y, bullet.radius, 0, 2 * Math.PI);
                    context.shadowColor = context.strokeStyle;
                    context.shadowBlur = 3;
                    context.stroke();
                }
            );
        return actors;
    }
}

class MeteorDrawer extends Drawer {
    draw(canvas, actors) {
        actors
            .filter(x => x instanceof Meteor)
            .forEach(
                bullet => {
                    var context = canvas.getContext('2d');
                    context.strokeStyle = "#4edaff";
                    context.beginPath();
                    context.arc(bullet.x, bullet.y, bullet.radius, 0, 2 * Math.PI);
                    context.shadowColor = context.strokeStyle;
                    context.shadowBlur = 3;
                    context.stroke();
                }
            );
        return actors;
    }
}


class HpDrawer extends Drawer {
    draw(canvas, actors) {
        var beginX = 10;
        var beginY = 10;
        var size = 10;
        var pad = 5;

        actors
            .filter(x => x instanceof SpaceShip)
            .forEach(
                ship => {
                    for (var i = 0; i < ship.hp; i++) {
                        var context = canvas.getContext('2d');
                        context.strokeStyle = "#0000FF";

                        context.beginPath();
                        context.moveTo(beginX + (size + pad) * i, beginY);
                        context.lineTo(beginX + (size + pad) * i + size, beginY);
                        context.lineTo(beginX + (size + pad) * i + size, beginY + size);
                        context.lineTo(beginX + (size + pad) * i, beginY + size);
                        context.lineTo(beginX + (size + pad) * i, beginY);
                        context.shadowColor = "transparent";
                        context.stroke();
                    }
                }
            );
        return actors;
    }
}


class ScoreDrawer extends Drawer {
    draw(canvas, actors) {
        var beginX = canvas.width - 10;
        var beginY = canvas.height - 20;

        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "white"
        ctx.textAlign = "right";
        ctx.font = "10px Arial";
        ctx.fillText("Score: " + Score.getScore(), beginX, beginY);

        return actors;
    }
}

class SieNieZesrajDrawer extends Drawer {
    draw(canvas, actors) {
        if (actors.find(x => x instanceof SpaceShip) === undefined) {
            var beginX = canvas.width / 2;
            var beginY = canvas.height / 2;

            var ctx = canvas.getContext("2d");
            ctx.fillStyle = "white"
            ctx.textAlign = "center";
            ctx.font = "40px Arial";
            if (Score.getScore() > 10000) {
                ctx.fillText("Tylko Się Nię Zesraj", beginX, beginY);
                ctx.font = "20px Arial";
                ctx.fillText("By pominąć uwagę naciśnij f.", beginX, beginY*3/2);
            }else{
                ctx.fillText("Co Za Przegryw", beginX, beginY);
                ctx.font = "20px Arial";
                ctx.fillText("Press f by być przegrywem dalej.", beginX, beginY*3/2);
            }
        }

        return actors;
    }
}
