class Scene extends BaseScene {
    constructor() {
        super();
        this.keys = new Set();
        this.actors = [];
        this.actors.push(new SpaceShip(this.getCanvas().width / 2.0, this.getCanvas().height / 2.0));
        this.actors.push(new Meteor(this.getCanvas().width / 2.0, this.getCanvas().height / 3.0, Math.PI));
        this.actors.push(new Score());


        this.spaceShipDrawer = new SpaceShipDrawer();
        this.bulletDrawer = new BulletDrawer();
        this.meteorDrawer = new MeteorDrawer();

        this.hpDrawer = new HpDrawer();
        this.scoreDrawer = new ScoreDrawer();

        this.linearMovementProcessor = new LinearMovementProcessor();
        this.angleMovementProcessor = new AngleMovementProcessor();
        this.positionProcessor = new PositionProcessor();

        this.bulletToAnythingHitProcessor = new BulletToAnythingHitProcessor();
        this.spaceShipToBulletHitProcessor = new InvulernableHitProcessorDecorator(new SpaceShipToAnythingHitProcessor());
        this.meteorToBulletHitProcessor = new MeteorToBulletHitProcessor();

        this.deathProcessor = new DeathProcessor();
        this.ttlProcessor = new TtlProcessor();
        this.meteorSplitProcessor = new MeteorSplitProcessor();

        this.spaceShipController = new SpaceShipController();
        this.reloadProcessor = new ReloadProcessor();


    }

    refresh() {
        this.clearCanvas(this.getCanvas());
        Ticker.inc();

        this.actors =
            [this.actors]
                .map(statkiem => this.spaceShipDrawer.draw(this.getCanvas(), statkiem))
                .map(bulleciem => this.bulletDrawer.draw(this.getCanvas(), bulleciem))
                .map(meteorem => this.meteorDrawer.draw(this.getCanvas(), meteorem))

                .map(statkiem => this.hpDrawer.draw(this.getCanvas(), statkiem))
                .map(scorem => this.scoreDrawer.draw(this.getCanvas(), scorem))

                .map(all => this.linearMovementProcessor.process(all))
                .map(all => this.angleMovementProcessor.process(all))
                .map(all => this.positionProcessor.process(this.getCanvas(), all))

                .map(bulleciem => this.bulletToAnythingHitProcessor.process(bulleciem))
                .map(statkiem => this.spaceShipToBulletHitProcessor.process(statkiem))
                .map(meteorem => this.meteorToBulletHitProcessor.process(meteorem))

                .map(all => this.deathProcessor.process(all))
                .map(all => this.ttlProcessor.process(all))
                .map(meteorem => this.meteorSplitProcessor.process(meteorem))

                .map(all => this.spaceShipController.process(this.keys, all))
                .map(all => this.reloadProcessor.process(all))
                [0];

    }

    keydown(key) {
        console.debug(key);
        this.keys.add(key);
    }

    keyup(key) {
        this.keys.delete(key);
    }

    getCanvas() {
        return document.getElementById("scene");
    }

    getKeys() {
        return this.keys;
    }


    clearCanvas(canvas) {
        var context = canvas.getContext('2d');
        context.fillStyle = "black";
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
}


function init() {
    scene = new Scene();
    setInterval(
        () => setTimeout(() => scene.refresh(), 0)
        , 1000.0 / 60.0
    );
    document.addEventListener("keydown", (x) => scene.keydown(x.key));
    document.addEventListener("keyup", (x) => scene.keyup(x.key));


}
