/*
This file is "Sinle Deck" screen
which shows deck title, number of cards and have 2 options: 
Add a new card or start a quiz
*/

import React, {Component} from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import { connect } from 'react-redux'
import {white, blue, orange} from '../utils/colors'
import TextButton from './TextButton'


class SingleDeck extends Component {
	//To manage the navigation
	moveTo = (screen) => {
		this.props.navigation.navigate(screen, { deck: this.props.deck.title })
	}
	render(){
		const {deck} = this.props
		return(
      <View style={styles.container}>
      <View style={styles.card}>
      <Text style={styles.deckTitle}>{deck.title}</Text>
      <Text style={styles.cardNumber}>Number of Cards: {deck.cards.length}</Text>
      </View>
      <TextButton onPress={() => this.moveTo('Quiz')}>Take a Quiz</TextButton>
      <TextButton onPress={() => this.moveTo('AddCard')}>Add Cards</TextButton>
      </View>
      )
	}
}

const styles = StyleSheet.create({
  container:{
  	backgroundColor: blue,
  	flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    height: "50%",
    width: "90%",
    backgroundColor: white,
    borderRadius: 20,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'gray',
    shadowRadius: 6,
    shadowOpacity: 1,
    elevation: 2
  },
  deckTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    paddingBottom: 10,
    textAlign: 'center'
  },
  cardNumber: {
    fontSize: 16,
    textAlign: 'center',
    color: orange
  }
})


const mapStateToProps = (state, ownProps) => {
  return { deck: state[ownProps.navigation.state.params.deck] }
}

export default connect(mapStateToProps)(SingleDeck)