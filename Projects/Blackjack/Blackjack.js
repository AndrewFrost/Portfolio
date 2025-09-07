console.log("");
var deck=[];
for(i=0;i<=51;i=i+1)
{
	deck[i]=i;
}
var aceCounter=0;
function Card()
{
	var cardValue;
	var splice=Math.floor(Math.random()*(deck.length-1));
	var card=deck[splice];
	this.showCardValue=function()
	{
		return cardValue;
	};
	if(deck.length>0)
	{
		cardNumber=(card+1)%13;
		if(cardNumber===1)
		{
			cardTypeName="n Ace";
			cardValue=11;
			aceCounter=aceCounter+1;
		}
		else if(cardNumber===0)
		{
			cardTypeName=" King";
			cardValue=10;
		}
		else if(cardNumber===11)
		{
			cardTypeName=" Jack";
			cardValue=10;
		}
		else if(cardNumber===12)
		{
			cardTypeName=" Queen";
			cardValue=10;
		}
		else
		{
			cardTypeName=" "+cardNumber;
			cardValue=cardNumber;
		}
		cardSuit=Math.floor(card/13);
		if(cardSuit===0)
		{
			cardSuitName="Hearts";
		}
		else if(cardSuit===1)
		{
			cardSuitName="Diamonds";
		}
		else if(cardSuit===2)
		{
			cardSuitName="Spades";
		}
		else if(cardSuit===3)
		{
			cardSuitName="Clubs";
		}
		console.log("You got a"+cardTypeName+" of "+cardSuitName+".");
		alert("You got a"+cardTypeName+" of "+cardSuitName+".");
		deck.splice(splice,1);
		if(deck.length===8)
		{
			console.log("There are only 8 cards remaining; make sure there's enough for everyone!");
			alert("There are only 8 cards remaining; make sure there's enough for everyone!");
		}
		if(deck.length===0)
		{
			console.log("You've run out of cards! Hopefully everyone got to finish.");
			alert("You've run out of cards! Hopefully everyone got to finish.");
		}
	}
	else
	{
		console.log("Sorry! There's no more cards in the deck.");
		alert("Sorry! There's no more cards in the deck.");
		cardValue=0;
	}
}
var playerID=1;
var cardID=1;
function PlayerHand()
{
	if(cardID===1)
	{
		score=0;
		aceCounter=0;
	}
	var card=new Card();
	var card1Value=card.showCardValue();
	score=score+card1Value;
	this.returnScore=function()
	{
		return score;
	};
	if(cardID===1)
	{
		cardID=cardID+1;
		PlayerHand();
		return;
	}
	if(aceCounter>0&&score>=22)
	{
		aceCounter=aceCounter-1;
		score=score-10;
	}
	if(aceCounter===1)
	{
		console.log("You have an Ace counting for 11!");
		alert("You have an Ace counting for 11! Your current score is: "+score);
	}
	console.log("Current score: "+score);
	if(score>=22)
	{
		score=0;
		console.log("Too bad, you busted!");
		alert("Too bad, you busted!");
	}
	else
	{
		alert("Your current score is: "+score);
		hitQuestion();
		if(hitAnswer==="Yes"||hitAnswer==="yes"||hitAnswer==="Y"||hitAnswer==="y")
		{
			cardID=cardID+1;
			PlayerHand();
			return;
		}
	}
	console.log("Player "+playerID+"'s final score is: "+score);
	alert("Player "+playerID+"'s final score is: "+score);
	console.log("");
	playerID=playerID+1;
	cardID=1;
}
hitQuestion=function()
{
hitAnswer=prompt("Player "+playerID+"'s turn. Current score is: "+score+". Would you like to hit?");
		if(hitAnswer==="Yes"||hitAnswer==="yes"||hitAnswer==="Y"||hitAnswer==="y")
		{
			return;
		}
		else if(hitAnswer==="No"||hitAnswer==="no"||hitAnswer==="N"||hitAnswer==="n")
		{
			return;
		}
		else if(hitAnswer!=="No"||hitAnswer!=="no"||hitAnswer!=="N"||hitAnswer!=="n")
		{
			alert("Please enter one of the following: \"Yes\",\"yes\", \"Y\", \"y\", \"No\", \"no\", \"N\", or \"n\".");
			hitQuestion();
			return;
		}
};
/*amountOfPlayers=function()
{
	numberOfPlayers=prompt("How many players will there be? Enter using a whole number from 1 to 6.");
	if(numberOfPlayers<1||numberOfPlayers%1!==0||numberOfPlayers>6)
	{
		alert("The number of players must be a whole number and cannot be less than one nor exceed 6.");
		amountOfPlayers();
		return;
	}
};
amountOfPlayers();*/
numberOfPlayers = 2;
if(numberOfPlayers>=1)
{
	console.log("Player "+playerID);
	var player1=new PlayerHand();
	var player1Score=player1.returnScore();
}
if(numberOfPlayers>=2)
{
	alert("It is now Player"+playerID+"'s turn.");
	console.log("Player "+playerID);
	var player2=new PlayerHand();
	var player2Score=player2.returnScore();
}
/*if(numberOfPlayers>=3)
{
	console.log("Player "+playerID);
	var player3=new PlayerHand();
	var player3Score=player3.returnScore();
}
if(numberOfPlayers>=4)
{
	console.log("Player "+playerID);
	var player4=new PlayerHand();
	var player4Score=player4.returnScore();
}
if(numberOfPlayers>=5)
{
	console.log("Player "+playerID);
	var player5=new PlayerHand();
	var player5Score=player5.returnScore();
}
if(numberOfPlayers>=6)
{
	console.log("Player "+playerID);
	var player6=new PlayerHand();
	var player6Score=player6.returnScore();
}
*/
if(player1Score>player2Score&&numberOfPlayers>=2)
{
	console.log("Player 1 wins!");
	alert("Player 1 wins!");
}
else if(player1Score===player2Score&&numberOfPlayers>=2)
{
	console.log("It's a draw!");
	alert("It's a draw!");
}
else if(player1Score<player2Score&&numberOfPlayers>=2)
{
	console.log("Player 2 wins!");
	alert("Player 2 wins!");
}