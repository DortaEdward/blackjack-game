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

class Player{  
    constructor(){
        this.hand = [];
    };
};

class Dealer extends Player{
    constructor(deck){
        super();
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
        const playerDealt= []
        for (let x =0; x<2;x++){
            playerDealt.push(this.deck[0]);
            this.deck.shift();
        }
        for (let x =0; x<2;x++){
            this.hand.push(this.deck[0]);
            this.deck.shift();
        }
        console.log('Dealer Hand: ',this.hand);
    
        return playerDealt
    };

    hit(){
        const hit = this.deck[0];
        this.deck.shift();
        return hit;
    };
    evaluate(hand){
        let sum = 0;
        for(let i = 0; i<hand.length;i++){
            sum += hand[i].number
        };
        console.log(`The sum of your hand is ${sum}`);
        if(sum === 21){
            console.log('You WON')
        }else if(sum > 21){
            console.log('You LOST')
        }
        
    };

    stand(){
        console.log('Stand')
    }


};


// need to evaluate game state to see if player wins or not
// Need to make a dealer hand

const game = () =>{
    let win = false;
    let lose = false;

    const deck = new Deck();
    const player = new Player();
    const dealer = new Dealer(deck.deck);
    deck.createDeck();
    dealer.shuffleDeck();
    // need to check if win/lose state is true or false
    // evalute both hands and if user stands dealer must hit

    const dealBtn = document.querySelector('#deal');
    dealBtn.onclick = () =>{
        if(player.hand.length <=0){
            const dealtHand = dealer.dealHand();
            for(let i =0;i<dealtHand.length;i++){
                player.hand.push(dealtHand[i])
            }
            console.log(player.hand);
            dealer.evaluate(player.hand);
    
        }else{
            console.log('You cant have a new hand dealt till next round!')
        }
    };

    const hitBtn = document.getElementById('hit');
    hitBtn.onclick = () =>{
        if(player.hand.length != 0){
            const card =  dealer.hit();
            player.hand.push(card);
            console.log(player.hand);
            dealer.evaluate(player.hand);
        }else{
            console.log('CANT HIT!');
        }
        
    };
    

};

game();



