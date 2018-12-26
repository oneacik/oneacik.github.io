class SpaceShip extends BaseObject {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.radius = 10;
        this.rotate = 0.0;
        this.speed = 2.5;
        this.reload = 0;
        this.hp = 5;
        this.invul = 0;
    }


}

class Bullet extends BaseObject {
    constructor(x, y, rotate) {
        super();
        this.x = x;
        this.y = y;
        this.rotate = rotate;
        this.radius = 3;
        this.speed = 5;
        this.ttl = 500;
    }
}

class Meteor extends BaseObject {
    constructor(x, y, rotate) {
        super();
        this.x = x;
        this.y = y;
        this.rotate = rotate;
        this.radius = 8;
        this.speed = Math.random() * 3;
        this.hp = 1;
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
