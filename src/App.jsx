import { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card'

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false },

]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [first, setFirst] = useState(null)
  const [second, setSecond] = useState(null)
  const [disabled, setDisabled] = useState(false)
  //ShuffleCard
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setFirst(null)
    setSecond(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  //Handle Choice
  const handleChoice = (card) => {
    first ? setSecond(card) : setFirst(card)
  }

  //Compare cards
  useEffect(() => {
    if (first && second) {
      setDisabled(true)

      if (first.src === second.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === first.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 600)
      }
    }
  }, [first, second])

  //Reset Turn
  const resetTurn = () => {
    setFirst(null)
    setSecond(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  //Start the game automatically
  useEffect(() => {
    shuffleCards()
  }, [])
  return (
    <div className="App">
      <h1>Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <Card card={card} handleChoice={handleChoice}
            flipped={card === first || card === second || card.matched} key={card.id}
            disabled={disabled} />
        ))}
      </div>
      <div>Turns {turns}</div>
    </div>
  );
}

export default App;
