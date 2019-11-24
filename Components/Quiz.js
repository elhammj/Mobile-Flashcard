/*
This file is "Quiz" screen
which show a single card with from view and a button to show the back view
also, it allows the user to mark the answer "correct" or "incorrect"
at the end of the cards, the results screen is showed with number of cards, 
total correct answers and percentage
*/

import React, {Component} from 'react'
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import {white, blue, orange} from '../utils/colors'
import TextButton from './TextButton'
import { NavigationActions } from 'react-navigation'
import { Notifications } from 'expo'
import { setLocalNotification, clearLocalNotification, NOTIFICATION_KEY } from '../utils/notifications'

//Case One: There is zero card
const ZeroCard = () => (
	<View style={styles.container}>
  <Text style={styles.zerCard}>There is no card, go back and add cards then take a quiz.</Text>
  </View>
  )

//View Diffrent Side
const ViewDifferentSide = (props) => (
  <TouchableOpacity onPress={props.toggle} style={styles.button}>
  <View>
  {
    props.current === 'front'
    ? <Text style={{color: white}}>Show Back</Text>
    : <Text style={{color: white}}>Show Front</Text>
  }
  </View>
  </TouchableOpacity>
  )


//Result View, view total number of cards, correct answer and %
const Result = (props) => (
 <View style={styles.card}>
 <Text style={styles.resultText}>YOU HAVE COMPLETED THE QUIZ</Text>
 <Text style={styles.resultText}>Total Number of Cards: {props.totalCards}</Text>
 <Text style={styles.resultText}>Correct Answers: {props.correct}</Text>
 <Text style={styles.resultText}>Percentage: {(props.correct/props.totalCards)*100}%</Text>
 </View>
 )

 class Quiz extends Component {

   state = {
    currentCard: 0,
    correctAnsweres: 0, 
    complete: false,
    view: 'front'
  }


  //Show Back and Front depends on the cuurent view
  changeView = () => {
   const {view} = this.state
   view === 'front' ? 
   this.setState({view: 'back'}) : 
   this.setState({view: 'front'})
 }

 	//If it is correct answer
 	correct = () => {
 		const {correctAnsweres, currentCard, complete} = this.state
 		this.setState({
      correctAnsweres: correctAnsweres+1,
      currentCard: currentCard+1
    })
 		//If it is last card, mark complete with true
 		if (currentCard === (this.props.cards.length-1))
 		{
 			this.setState({
 				complete: true,
 			})
 		}
 	}

 	//If it is incorrect answer
 	incorrect = () => {
 		const {currentCard, complete} = this.state
 		this.setState({
      currentCard: currentCard+1
    })
	 	//If it is last card, mark complete with true
   if (currentCard === (this.props.cards.length-1))
   {
    this.setState({
     complete: true
   })
  }
}

 	//Restart Quiz
 	restartQuiz = () => {
 		this.setState({
      currentCard: 0,
      correctAnsweres: 0,
      view: 'front',
      complete: false
    })

 		clearLocalNotification()
    .then(setLocalNotification) 
  }

  render(){
    const {cards} = this.props
    const {complete, currentCard, view, correctAnsweres} = this.state
    if(cards.length === 0){
     return <ZeroCard/>
   }
   return (
    <View style={styles.container}>
    {complete === false?
     <View>
     <Text style={styles.totalCards}>You are viewing card number: {currentCard+1} out of {cards.length}.</Text>
     <View style={styles.card}>
     {view === 'front' ?
     <Text style={styles.cardText}>{cards[currentCard].front}</Text>:
     <Text style={styles.cardText}>{cards[currentCard].back}</Text>
   }
   <ViewDifferentSide
   toggle={this.changeView}
   current={this.state.view}
   />
   </View>
   <TextButton onPress={this.correct}> Correct </TextButton>
   <TextButton onPress={this.incorrect}> Incorrect </TextButton>
   </View>:
   <View>
   <Result
   totalCards= {cards.length}
   correct= {correctAnsweres}
   />
   <TextButton onPress={this.restartQuiz}>Restart the Quiz</TextButton>
   <TextButton onPress={()=> this.props.navigation.dispatch(NavigationActions.back())}>Back to Deck View</TextButton>
   </View>
 }
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
  zerCard:{
  	padding: 10,
  	paddingTop: 20,
  	marginTop: 20,
  	color: white, 
  	fontWeight: 'bold',
  	fontSize: 18,
   flexDirection: 'row'
 },
 totalCards:{
   color: white, 
   fontWeight: 'bold',
   fontSize: 14,
   justifyContent: 'center',
   alignSelf: 'center'
 },
 card: {
  backgroundColor: white,
  height:"50%",
  alignSelf:'center',
  width: "90%",
  minWidth: "90%",
  marginTop: 20,
  marginBottom: 10,
  padding: 10,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 20,
  shadowOffset: { width: 5, height: 5 },
  shadowColor: 'gray',
  shadowRadius: 6,
  shadowOpacity: 1,
  elevation: 2
},
cardText: {
  fontSize: 20,
  color: blue,
  marginBottom: 5,
},
button:{
 backgroundColor: orange,
 color: white,
 fontWeight: 'bold',
 fontSize: 14,
 marginTop: 40,
 borderRadius: 20,
 padding: 20
},
resultText:{
 fontSize: 16,
 paddingTop: 5,
 color: blue
}
})
const mapStateToProps = (state, ownProps) => {
  return { cards: state[ownProps.navigation.state.params.deck].cards }
}

export default connect(mapStateToProps)(Quiz)