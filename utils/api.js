import { AsyncStorage } from "react-native";
import { MOBILEFLASHCARD_STORAGE_KEY, generateUniId } from './helpers.js'

// This file to fetch all data 

// Fetch All Decks 
export const fetchAllDecks = () => {
  return AsyncStorage.getItem(MOBILEFLASHCARD_STORAGE_KEY)
  .then(results => {
	const decks = JSON.parse(results)
	return decks
  })
}

// Insert a single Deck
export const insertDeck = deckTitle => {
	const deckObject = {title:deckTitle, id:generateUniId(), cards:[] }
  return AsyncStorage.mergeItem(MOBILEFLASHCARD_STORAGE_KEY, JSON.stringify({ [deckTitle]:deckObject })
  )
}


// fetch a single deck
export function fetchDeck(title) {
  return getDecks()
    .then((decks) => decks[title]);
}

// Insert Card
export function insertCard(title, card) {
  return fetchAllDecks()
    .then((decks) => {
      decks[title].cards.push(card);
      AsyncStorage.mergeItem(MOBILEFLASHCARD_STORAGE_KEY, JSON.stringify(decks));
    });
}