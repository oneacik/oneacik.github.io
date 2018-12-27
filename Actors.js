class SpaceShip extends BaseObject {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.radius = 10;
        this.rotate = 0.0;
        this.speed = 2;
        this.reload = 0;
        this.hp = 25;
        this.invul = 0;
        this.setAllColors("white");
        this.style.colorSfx = "orange";
    }


}

class Bullet extends BaseObject {
    constructor(x, y, rotate) {
        super();
        this.x = x;
        this.y = y;
        this.rotate = rotate;
        this.radius = 3;
        this.speed = 4;
        this.ttl = 500;
        this.setAllColors("green");
    }
}

class Meteor extends BaseObject {
    constructor(x, y, rotate) {
        super();
        this.x = x;
        this.y = y;
        this.rotate = rotate;
        this.radius = 8;
        this.speed = Math.random();
        this.hp = 5;
        this.setAllColors("#4edaff");
        this.vertexes = this.generateVertexes(8)
    }

    generateVertexes(sideNo){
        var radMin = 3;
        var radMax = 12;
        var vxs = [];
        for (var i=0;i<sideNo;i++){
            var radius = radMin + Math.random()*(radMax-radMin);
            var v = {};
            v.x = radius * Math.cos(Math.PI*2 * i/sideNo);
            v.y = radius * Math.sin(Math.PI*2 * i/sideNo);
            vxs.push(v)
        }
        return vxs
    }

}

class ExplodingMeteor extends Meteor {
    constructor(x,y, rotate){
        super(x,y,rotate);
        this.hp = 0;
        this.setAllColors("#ff8d2d");
    }
}

class Score extends BaseObject {
    static add(score){
        Score.score += score;
    }

    static getScore(){
        return Score.score;
    }
}

Score.score=0;
