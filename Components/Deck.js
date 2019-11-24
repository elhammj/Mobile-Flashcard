/*
This file is "Deck" info
which shows Deck title and number of cards
*/
import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, LayoutAnimation} from 'react-native'
import {white, blue, orange, gray} from '../utils/colors'


class Deck extends Component {
  //state to manage animation w and h
  state = {
    w: 100,
    h: 100,
  }

    // For animation, I refer to the: https://facebook.github.io/react-native/docs/animations
    _onPress = () => {
    // Animate the update
    LayoutAnimation.spring();
    this.setState({w: this.state.w + 15, h: this.state.h + 15})
    this.props.navigateToSingleDeck(this.props.deck.title)
  }

  render() {
    const {deck} = this.props
    return (
      //return a deck info
      <View>
        <View style={[{width: this.state.w, height: this.state.h}]} />
        <TouchableOpacity onPress={this._onPress}>
          <View style={styles.item}>
            <Text style={styles.title}>{deck.title}</Text>
            <Text style={styles.card}>Number of Cards: {deck.cards.length}</Text>
          </View>
        </TouchableOpacity>
      </View>
      )
    }
  }


  const styles = StyleSheet.create({
    item: {
      backgroundColor: white,
      flex:1,
      alignSelf:'center',
      width: "90%",
      marginBottom: 10,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
    },
    title: {
      fontSize: 20,
      color: blue,
      marginBottom: 5,
    },
    card: {
      color: orange,
      fontSize: 18
    }
  })

  export default Deck