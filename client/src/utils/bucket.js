import { now } from "moment";

class Bucket {
    constructor(maxAmount, refillTime, refillAmount, value, lastUpdate) {
        this.maxAmount = maxAmount;
        this.refillTime = refillTime
        this.refillAmount = refillAmount;
        this.value = value;
        this.lastUpdate = lastUpdate;
    }

    refill() {
        let refillCount = Math.floor((now() - this.lastUpdate) / this.refillTime)
        this.value = Math.min(
            this.maxAmount,
            this.value + refillCount * this.refillAmount
        )

        this.lastUpdate = Math.min(now(), this.lastUpdate + refillCount * this.refillTime)
    }
}

export default Bucket;