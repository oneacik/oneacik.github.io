class BulletToAnythingHitProcessor extends HitProcessor {
    do(first, second) {
        if(!(first instanceof Bullet)){
            return first;
        }
        if(HitProcessor.isCircleHit(first, second)){
            first.die = true;
        }
        return first;
    }
}


class SpaceShipToBulletHitProcessor extends HitProcessor {
    do(first, second) {
        if(!(first instanceof SpaceShip && second instanceof Bullet)){
            return first;
        }
        //make it a little easier to not get hit
        var fake_first = {x : first.x, y: first.y, radius: first.radius};

        if(HitProcessor.isCircleHit(fake_first, second)){
            first.hp -= 1;
        }
        return first;
    }
}
