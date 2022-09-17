const { SHA256 } = require("crypto-js");

class Block {
    constructor(index, timestamp, data, previousHash='') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = '';
    }
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "09/17/2022", "Genesis Block", 0);
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock)
    }
}

let catCoin = new Blockchain();
catCoin.addBlock(new Block(1, "09/17/2022", { amount: 4}));
catCoin.addBlock(new Block(2, "09/18/2022", { amount: 10}));
catCoin.addBlock(new Block(3, "09/19/2022", { amount: 8 }));

console.log(JSON.stringify(catCoin, null, 4));