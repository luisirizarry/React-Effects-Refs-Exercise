import React, { useState, useEffect, useRef } from "react";
import axios from 'axios'
import { v4 as uuid } from 'uuid';
import Card from './Card'
import "./App.css";

const DeckOfCards = () => {
    const [deckId, setDeckId] = useState(null);
    const [cards, setCards] = useState([]); 

    useEffect(() => {
        async function getADeck() {
          try {
            const res = await axios.post(
              `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
            );
            setDeckId(res.data.deck_id); 
          } catch (err) {
            console.error("Error fetching deck:", err);
          }
        }
    
        getADeck();
    }, []);

    const draw = async () => {
        if (!deckId) return;

        try{
            const res = await axios.post(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
            if (res.data.remaining === 0) {
                alert("No cards remaining in the deck!");
                return;
              }
            setCards((cards) => [...cards, {...res.data.cards[0], id: uuid()}]);
        } catch (err){
            console.error("Error drawing card:", err);
        }
    }

    const shuffle = async () => {
        if (!deckId) return;

        try{
            await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
            setCards([]);
        } catch (err) {
            console.error("Error shuffling cards:", err);
        }
    }

    return (
        <div className="Card-Container">
            <button onClick={draw} disabled={!deckId}>Draw A Card!</button>
            <div className="Card-stack">
            {cards.length === 0 ? 
            (
                <Card
                    key="starting"
                    image="https://deckofcardsapi.com/static/img/back.png"
                    altText="Card back placeholder"
                />):
                (cards.map((card) => (<Card key={card.id} image={card.image} altText={card.code} />))
            )}
            </div>
            <button onClick={shuffle} disabled={!deckId}>Shuffle</button>
        </div>
    )
}

export default DeckOfCards;