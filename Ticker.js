class Ticker{
    get(){
        return Ticker.i;
    }

    inc(){
        Ticker.i++;
    }
}

Ticker.i = 0;
