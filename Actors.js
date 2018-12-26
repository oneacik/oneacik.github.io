class SpaceShip extends BaseObject {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.radius = 10;
        this.rotate = 0.0;
        this.speed = 2;
        this.reload = 0;
        this.hp = 5;
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
        this.hp = 1;
        this.setAllColors("#4edaff");
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
