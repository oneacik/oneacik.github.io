class Ticker{
    static get(){
        return Ticker.i;
    }

    static inc(){
        Ticker.i++;
    }
}

Ticker.i = 0;

