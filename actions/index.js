/*  
Action File
In this app there are three acitons: 
	(1) Get All Decks
	(2) Add a New Deck
	(3) Add a New Card Under a Deck
*/ 
import {fetchAllDecks} from '../utils/api'

export const GET_DECKS = 'GET_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

export const getAllDecks = () => dispatch => {
    fetchAllDecks().then(decks =>
        dispatch({
            type: GET_DECKS,
            decks  
        })
    ) 
}

export const addDeck = (deck) => {
    return {
    type: ADD_DECK,
    deck
  }
}

export function addCard(deck, card) {
  return {
    type: ADD_CARD,
    deck,
    card
  }
}