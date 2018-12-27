class SpaceShipDrawer extends Drawer {
    draw(canvas, actors) {
        actors
            .filter(x => x instanceof SpaceShip)
            .forEach(
                ship => {
                    var context = canvas.getContext('2d');
                    ship.setupContext(context)
                    if ((ship.invul > 0) & (Ticker.i%20 > 10)){
                            context.strokeStyle = ship.style.colorSfx;
                    }
                    context.beginPath();
                    context.moveTo(ship.x + ship.radius * Math.sin(ship.rotate), ship.y + ship.radius * Math.cos(ship.rotate));
                    context.lineTo(ship.x + ship.radius * Math.sin(ship.rotate + 2.0 / 3.0 * Math.PI), ship.y + ship.radius * Math.cos(ship.rotate + 2.0 / 3.0 * Math.PI));
                    context.lineTo(ship.x + ship.radius * Math.sin(ship.rotate + 4.0 / 3.0 * Math.PI), ship.y + ship.radius * Math.cos(ship.rotate + 4.0 / 3.0 * Math.PI));
                    context.lineTo(ship.x + ship.radius * Math.sin(ship.rotate), ship.y + ship.radius * Math.cos(ship.rotate));
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
                    bullet.setupContext(context)
                    context.beginPath();
                    var pathString = `c -0.50707,0.48432 -2.03527,1.5049 -1.74145,0.82435 -1.0856,-0.19625 -2.69727,0.015 -2.63477,1.44932 -0.34375,1.41233 -0.64053,-0.168 -1.6003,0.30895 -1.29743,-0.179 -0.26743,-0.6772 -1.67203,-0.16125 -0.93677,0.3524 -2.03485,-1.27842 -1.5306,-0.66907 0.0728,0.9228 -2.49195,-0.2185 -2.32247,-0.32708 -1.31225,-0.218 -2.85653,-0.3834 -3.88433,0.66208 -1.88295,0.6595 1.3953,2.82325 -0.008,2.6042 -0.12475,1.28362 -2.11927,1.87242 -2.22872,3.40282 -0.086,0.60205 0.6056,1.2729 -0.30843,0.83323 -0.77737,1.02055 -0.63175,2.6483 0.95073,2.62612 1.58002,0.1465 3.72522,1.1665 3.1817,0.77553 0.6629,0.38867 1.64232,-1.0321 1.85897,-0.5444 0.93528,-0.67613 1.8522,-1.48953 2.96863,-1.1276 0.57282,0.22375 1.9132,0.91865 1.88865,1.17077 0.1855,-0.24775 -5.32878,-1.40907 -0.121,-0.37227 0.8017,0.60812 1.45505,3.16647 0.83342,2.63272 0.2899,-0.80727 0.5635,0.47243 0.8287,1.4337 -0.66545,-0.18025 -1.76732,-0.3555 -1.5079,0.8181 -0.0598,0.95583 -1.43927,2.41018 -1.91497,1.7769 0.86572,0.10375 1.51297,0.74375 2.3867,0.0332 0.64972,0.16375 1.36737,-1.61157 1.287,-0.73362 -0.38703,-0.088 -0.20675,-2.40655 0.74437,-1.25178 0.62935,-0.13 0.73883,-1.6925 1.69878,-0.88545 0.3592,0.55613 0.13875,0.2875 0.7455,0.1525 0.6442,0.38483 -0.68528,0.231 0.22125,0.59558 1.00677,0.52262 1.83695,0.028 2.7405,0.85017 -0.28525,-0.44905 -0.64178,2.31908 -1.6338,1.39248 1.39405,-0.17 1.77537,0.87555 2.03915,2.00677 -1.0884,0.61843 2.6028,-0.99972 1.27435,-0.66577 0.90145,-0.69453 1.91495,-0.71575 2.95425,-0.8394 1.39005,-1.10363 -2.48343,-1.15883 -0.5633,-0.93915 -0.27303,0.1025 -1.96175,0.71602 -1.67915,-0.53508 -1.19915,-0.3296 1.31467,-1.60125 0.43775,-1.5252 1.08235,-0.90722 2.40247,-0.86957 3.6095,-1.34097 0.6206,-0.4868 1.83237,-0.80655 1.09867,-0.55035 1.1342,-1.24248 -0.28957,-1.0384 1.0363,-1.39435 0.62703,-0.93148 2.2899,-0.12325 2.2537,-1.70075 0.34348,-0.64753 0.4343,-1.48688 -0.0717,-1.3724 -1.02567,-0.51978 1.13043,-1.26713 -0.1445,-1.82943 -0.6866,-0.66667 -3.3024,-1.82772 -2.54075,-1.25097 -0.49287,-0.4966 -0.5766,0.78015 -1.0004,-0.1535 -0.4542,-1.06855 -3.05847,-0.26923 -2.23462,-0.5102 -0.70145,-0.66608 -1.85498,-0.015 -1.78595,-1.31965 0.25747,-1.65745 -2.21368,-0.65885 -2.11883,-2.13718 0.79753,-0.45102 -1.7406,-2.44132 -0.9615,-2.14942 -0.27077,-0.0682 -0.55262,-0.0732 -0.83012,-0.063 z m 1.78,16.245 c 1.42475,0.36297 -0.41622,-0.5168 0,0 z m 0.45,-0.0125 c 0.0602,0.20775 -0.21875,-0.0557 0,0 z`
                    var p = new Path2D(`m ${bullet.x+0},${bullet.y-5}` + pathString);
                    context.stroke(p);

                    //context.arc(bullet.x, bullet.y, bullet.radius, 0, 2 * Math.PI);
                    //context.stroke();
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
                    bullet.setupContext(context)
                    context.beginPath();
                    context.moveTo(
                        bullet.x + bullet.vertexes[7].x,
                        bullet.y + bullet.vertexes[7].y)
                    bullet.vertexes.forEach(
                        v => {
                            context.lineTo(
                                bullet.x + v.x,
                                bullet.y + v.y
                            )
                        }
                    )
                    //context.arc(bullet.x, bullet.y, bullet.radius, 0, 2 * Math.PI);
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
                        ship.setupContext(context)
                        context.beginPath();
                        context.moveTo(beginX + (size + pad) * i, beginY);
                        context.lineTo(beginX + (size + pad) * i + size, beginY);
                        context.lineTo(beginX + (size + pad) * i + size, beginY + size);
                        context.lineTo(beginX + (size + pad) * i, beginY + size);
                        context.lineTo(beginX + (size + pad) * i, beginY);
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

            var ctx = canvas.getContext("2d")
            ctx.fillStyle = "white"
            ctx.textAlign = "center";
            ctx.font = "40px Arial";
            if (Score.getScore() > 100000) {
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
