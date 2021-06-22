// Making BlackJack deck
// Edward Dorta 06/22/2021

class Card{
    constructor(number,suit){
        this.number = number;
        this.suit = suit;
    }
};

class Deck{
    constructor(){
        this.deck = [];
    }
    createDeck(){
        const numbers =[1,2,3,4,5,6,7,8,9,10,11,12,13];
        const suits = ['Hearts','Spades','Clubs','Diamonds'];
        for (let i = 0; i< suits.length;i++){
            for (let y = 0; y < numbers.length;y++){
                const card = new Card(numbers[y],suits[i]);
                this.deck.push(card);
            };
        };
    };
//
};

class Dealer{
    constructor(deck){
        this.deck = deck;
    };
    shuffleDeck(){
        let i = this.deck.length;
        while(i > 1){
            i = i-1;
            const j = Math.floor(Math.random()*i);
            const temp = this.deck[j];
            this.deck[j] = this.deck[i];
            this.deck[i] = temp;
        }
    };

    dealHand(){
        const dealt= []
        for (let x =0; x<2;x++){
            dealt.push(this.deck[0]);
            this.deck.shift();
        }
        return dealt
    };

    hit(){
        const hit = this.deck[0];
        this.deck.shift();
        return hit;
    };


};

class Player{  
    constructor(){
        this.hand = [];
    };
};

const game = () =>{
    const deck = new Deck();
    const player = new Player();
    const dealer = new Dealer(deck.deck);
    deck.createDeck();
    dealer.shuffleDeck();

    // need to make sure player cant hit/stand if they dont have a hand


    const dealBtn = document.querySelector('#deal');
    dealBtn.onclick = () =>{
        const dealtHand = dealer.dealHand();
        for(let i =0;i<dealtHand.length;i++){
            player.hand.push(dealtHand[i])
        }
        console.log(player.hand);
    };

    const hitBtn = document.getElementById('hit');
    hitBtn.onclick = () =>{
        const card =  dealer.hit();
        player.hand.push(card)
        console.log(player.hand)
    };
    

};

game();



