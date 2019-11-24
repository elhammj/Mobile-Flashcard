/*
This file is "Add Deck" screen
which has one input field to add new deck title
*/

import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, TextInput, Platform} from 'react-native'
import {white, blue, orange, red} from '../utils/colors'
import {connect} from 'react-redux'
import {Ionicons} from '@expo/vector-icons'
import { addDeck } from "../actions"
import { insertDeck } from "../utils/api"
import {generateUniId} from '../utils/helpers'
import TextButton from './TextButton'

AddDeckButton = ({ onPress }) => {
    return (
        <TextButton onPress={onPress}> Creat Deck </TextButton>
        )
    }



class AddDeck extends Component {

    state= {
       deckTitle: '',
       valid:true
   }

   submit = () => {

       const {deckTitle} = this.state

       //Check if the deckTitle is valid or not
       if(deckTitle.length > 3){
          insertDeck(deckTitle)
          const deckObject = {
             [deckTitle]:{
                 id: generateUniId(),
                 title: deckTitle,
                 cards: []
             }
         }
         this.props.addDeck(deckObject)
         this.props.navigation.navigate('AddCard', {deck:deckTitle})
         this.setState(() => ({
             deckTitle: ''
         }))
     }
     else{
      this.setState({valid:false})
    }

    }


    render(){
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Ionicons name="ios-albums" size={70} color={white} />
        <View style={styles.label}>
        <Text style={{fontSize: 22, color: white, fontWeight:'bold'}}>
        Enter a Name of Your New Deck
        </Text>
        </View>
        {!this.state.valid && <Text style={styles.error}>The deck name is not valid!</Text>}
        <View style={styles.input}>
        <TextInput
        value={this.state.deckTitle}
        onChangeText={(deckTitle) => this.setState({deckTitle})}
        onFocus={() => this.setState({ deckTitle: '', valid: true })}
        />
        </View>
        <View style={{ marginTop: 10 }}>
        <AddDeckButton onPress={this.submit} />
        </View>
        </KeyboardAvoidingView>

        )
    }

}


const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: blue,
    alignItems: 'center',
    justifyContent: 'center',
},
label: {
    paddingBottom: 30,
},
input: {
    height: 40,
    padding: 10,
    borderRadius: 5,
    backgroundColor: white,
    borderColor: '#222',
    borderWidth: 1,
    fontSize: 18,
    width: "90%"
},
error:{
    color: red,
    fontWeight: 'bold',
    textAlign: 'center'
}
});


const mapDispatchToProps = dispatch => ({
addDeck: (deck) => dispatch(addDeck(deck))
})

export default connect(null, mapDispatchToProps)(AddDeck)