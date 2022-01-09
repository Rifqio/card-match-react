import './Card.css'


function Card({ card, handleChoice, flipped, disabled }) {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
    }

    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img className="front" src={card.src} alt="card_image" />
                <img className="back" style={{ cursor: 'pointer' }} src="/img/cover.png" onClick={handleClick} alt="card_back" />
            </div>
        </div>
    )
}

export default Card
