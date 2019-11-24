/*
This file is "List of Decks" screen
which shows list of decks
*/

import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableWithoutFeedback, FlatList} from 'react-native'
import {white, blue} from '../utils/colors'
import {getAllDecks} from '../actions'
import {connect} from 'react-redux'
import Deck from './Deck'

class Decks extends Component{

  componentDidMount () {
     getAllDecks()
   }

   navigateToSingleDeck = (deck) => {
     this.props.navigation.navigate('SingleDeck', { deck });
   }

   render() {
    	//Check if decks is empty, then show a welcome message, otherwise render decks
    	if(Object.keys(this.props.decks).length === 0){
    		return (
          <View style={styles.welcomeContainer}>
          <Text style={{fontSize: 26, color: white}}> 👋 Hi Start adding decks !</Text>
          </View>
          )
     }
     else{
      return(
        <FlatList 
        style={styles.container}
        data={Object.values(this.props.decks)}
        renderItem={({ item }) => (
          <Deck 
          deck={item}
          navigateToSingleDeck={this.navigateToSingleDeck} 
          />
          )}
        keyExtractor= {item => item.id}
        />)
    }
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: blue,
    alignSelf: 'stretch',
    paddingTop: 60,
    paddingBottom: 60,
  },
  welcomeContainer: {
    flex: 1,
    backgroundColor: blue,
    justifyContent: 'center',
    alignItems: 'center'
  }

})

const mapStateToProps = (state) => {
  return { decks: state }
}


export default connect(mapStateToProps)(Decks)
