import { useState, useEffect } from "react";
import antDe from "./img/ant-de.png";
import antDu from "./img/ant-du.png";
import beeDe from "./img/bee-de.png";
import beeDu from "./img/bee-du.png";
import beetleDe from "./img/beetle-de.png";
import beetleDu from "./img/beetle-du.png";
import butterflyDe from "./img/butterfly-de.png";
import butterflyDu from "./img/butterfly-du.png";
import fireflyDe from "./img/firefly-de.png";
import fireflyDu from "./img/firefly-du.png";
import ladybugDe from "./img/ladybug-de.png";
import ladybugDu from "./img/ladybug-du.png";
import "./App.css";
import SingleCard from "./components/SingleCard.js";

const cardImages = [
  { src: antDe, matched: false, id: '001'},
  { src: antDu, matched: false, id: '001' },
  { src: beeDe, matched: false, id: '002' },
  { src: beeDu, matched: false, id: '002' },
  { src: beetleDe, matched: false, id: '003' },
  { src: beetleDu, matched: false, id: '003' },
  { src: butterflyDe, matched: false, id: '004' },
  { src: butterflyDu, matched: false, id: '004' },
  { src: fireflyDe, matched: false, id: '005' },
  { src: fireflyDu, matched: false, id: '005' },
  { src: ladybugDe, matched: false, id: '006' },
  { src: ladybugDu, matched: false, id: '006' },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, key: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  //handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.id === choiceTwo.id) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.id === choiceOne.id) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 2000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // console.log(cards);

  //reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  //start a new game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Language challenge German - Dutch</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.key}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;

/*

const shuffleCards = [...cardImages, ...cardImages]; - writing two times making two the same arrays (because we need 1 pair of each picture)

const [choiceOne, setChoiceOne] = useState(null);
const [choiceTwo, setChoiceTwo] = useState(null); - we are choosing 2 cards so needs to be 2 states

*/
