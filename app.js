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

    drawCards(){
        const playerHand = document.getElementsByClassName('player-hand')[0];
        playerHand.style.cssText ='display:flex;'
        playerHand.innerHTML = "";
        this.hand.forEach(card =>{
            const newCard = document.createElement('div');
            newCard.className = `card rank-${card.number} ${card.suit}`;
            newCard.style.cssText = "width:150px; height:250px;border:1px solid gray; border-radius:12.5px;display:flex;flex-direction:column";
            
            const cardTop = document.createElement('div');
            cardTop.style.cssText = "display:flex;"
            const cardMid = document.createElement('div');
            cardTop.style.cssText = "display:flex;"
            const cardLeft = document.createElement('div');
            cardTop.style.cssText = "display:flex;"



            const cardNumber = document.createElement('div');
            cardNumber.className='number';
            cardNumber.textContent=`${card.number}`;
            const cardSuit = document.createElement('div');
            cardSuit.className='suit';
            cardSuit.textContent=`${card.suit}`;

            cardTop.appendChild(cardNumber);
            cardTop.appendChild(cardSuit);
            newCard.appendChild(cardTop);
            playerHand.appendChild(newCard);
        })
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
    
        return playerDealt
    };

    hit(){
        const hit = this.deck[0];
        this.deck.shift();
        return hit;
    };
    evaluate(playerHand){
        let sum = 0;
        let dealerSum = 0;
        for(let i = 0; i<playerHand.length;i++){
            sum += playerHand[i].number
        };
        for(let i = 0; i<this.hand.length;i++){
            dealerSum += this.hand[i].number
        };
        
        // get user and dealers sum divs and update
        const playerSumDiv = document.getElementById('player-sum');
        const dealerSumDiv = document.getElementById('dealer-sum');

        playerSumDiv.textContent=`Your Hand Total: ${sum}`;
        dealerSumDiv.textContent=`Dealers Hand Total: ${dealerSum}`;
        

        if (sum ===21){
            alert('You Win',sum);
        }else if(dealerSum ===21){
            alert("You lose",dealerSum);
        }else if(sum >21){
            alert('You lose',sum);
        }else if(dealerSum >21){
            alert('You Win',dealerSum);
        }
        

    };

    stand(playerHand){
        const card = this.hit();
        this.hand.push(card);
        this.evaluate(playerHand);
    }
};

const game = () =>{

    // Game Start
    const deck = new Deck();
    const player = new Player();
    const dealer = new Dealer(deck.deck);
    deck.createDeck();
    dealer.shuffleDeck();

    // button events
    const dealBtn = document.querySelector('#deal');
    dealBtn.onclick = () =>{
        if(player.hand.length <=0){
            const dealtHand = dealer.dealHand();
            for(let i =0;i<dealtHand.length;i++){
                player.hand.push(dealtHand[i])
            }
            player.drawCards();
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
            player.drawCards();
            dealer.evaluate(player.hand);   
        }else{
            console.log('CANT HIT!');
        }
    };

    const standBtn = document.getElementById('stand');
    standBtn.onclick= () =>{
        if(player.hand.length != 0){
            dealer.stand(player.hand)  
        }else{
            console.log('CANT Stand!');
        }
    };
    

};


game();


/*
    need to make a card div
    give the css based on the cards info
    append to player hand div

    classlists:
    card rank-1 spades
    card rank-2 spades
    card rank-3 spades
    card rank-4 spades
    card rank-5 spades
    card rank-6 spades
    card rank-7 spades
    card rank-8 spades
    card rank-9 spades
    card rank-10 spades
    card rank-11 spades
    card rank-12 spades
    card rank-13 spades

    card rank-1 hearts
    card rank-2 hearts
    card rank-3 hearts
    card rank-4 hearts
    card rank-5 hearts
    card rank-6 hearts
    card rank-7 hearts
    card rank-8 hearts
    card rank-9 hearts
    card rank-10 hearts
    card rank-11 hearts
    card rank-12 hearts
    card rank-13 hearts

    card rank-1 clubs
    card rank-2 clubs
    card rank-3 clubs
    card rank-4 clubs
    card rank-5 clubs
    card rank-6 clubs
    card rank-7 clubs
    card rank-8 clubs
    card rank-9 clubs
    card rank-10 clubs
    card rank-11 clubs
    card rank-12 clubs
    card rank-13 clubs

    card rank-1 diamonds
    card rank-2 diamonds
    card rank-3 diamonds
    card rank-4 diamonds
    card rank-5 diamonds
    card rank-6 diamonds
    card rank-7 diamonds
    card rank-8 diamonds
    card rank-9 diamonds
    card rank-10 diamonds
    card rank-11 diamonds
    card rank-12 diamonds
    card rank-13 diamonds
*/


