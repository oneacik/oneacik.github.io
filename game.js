class Scene extends BaseScene {
    constructor() {
        super();
        this.keys = new Set();
        this.actors = AgainController.toNigdySieNieKonczy(this.getCanvas());

        this.spaceShipDrawer = new SpaceShipDrawer();
        this.bulletDrawer = new BulletDrawer();
        this.meteorDrawer = new MeteorDrawer();

        this.hpDrawer = new HpDrawer();
        this.scoreDrawer = new ScoreDrawer();
        this.sieNieZesrajDrawer = new SieNieZesrajDrawer();

        this.linearMovementProcessor = new LinearMovementProcessor();
        this.angleMovementProcessor = new AngleMovementProcessor();
        this.positionProcessor = new PositionProcessor();

        this.bulletToAnythingHitProcessor = new BulletToAnythingHitProcessor();
        this.spaceShipToBulletHitProcessor = new InvulernableHitProcessorDecorator(new SpaceShipToAnythingHitProcessor());
        this.meteorToBulletHitProcessor = new MeteorToBulletHitProcessor();

        this.deathProcessor = new DeathProcessor();
        this.spaceShipDeathProcessor = new ShipDeathProcessor();
        this.ttlProcessor = new TtlProcessor();
        this.meteorSplitProcessor = new MeteorSplitProcessor();

        this.spaceShipController = new SpaceShipController();
        this.reloadProcessor = new ReloadProcessor();
        this.invulDecreaser = new InvulDecreaser();

        this.againController = new AgainController();

        this.processors = [
            new SpaceShipDrawer(),
            new BulletDrawer(),
            new MeteorDrawer(),

            new HpDrawer(),
            new ScoreDrawer(),
            new SieNieZesrajDrawer(),

            new LinearMovementProcessor(),
            new AngleMovementProcessor(),
            new PositionProcessor(),

            new BulletToAnythingHitProcessor(),
            new InvulernableHitProcessorDecorator(new SpaceShipToAnythingHitProcessor()),
            new MeteorToBulletHitProcessor(),

            new DeathProcessor(),
            new ShipDeathProcessor(),
            new TtlProcessor(),
            new MeteorSplitProcessor(),

            new ReloadProcessor(),
            new InvulDecreaser(),


            new AgainController(),
            new SpaceShipController()

        ]


    }

    refresh() {
        this.clearCanvas(this.getCanvas());
        Ticker.inc();
        
        this.actors = this.processors.reduce(
            (state, handler) => this.handle(state, handler)
            , this.actors)

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
