/*
This file is "TextButton" function
It is a reuseable function
*/
import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native'
import {white, orange} from '../utils/colors'

const TextButton = ({children, onPress, style ={}}) => {
	return(
		<TouchableOpacity 
		onPress={onPress}
		style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}>
		<Text style={styles.submitBtnText}>{children}</Text>
		</TouchableOpacity>
		)

}

const styles = StyleSheet.create({
	iosSubmitBtn: {
		backgroundColor: orange,
		padding: 10,
		borderRadius: 7,
		height: 45,
		marginLeft: 40,
		marginRight: 40,
		marginTop: 20,
		width: "90%",
		maxWidth: "90%",
		minWidth: "90%"
	},
	androidSubmitBtn: {
		backgroundColor: orange,
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		height: 45,
		borderRadius: 2,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
		width: "90%",
		maxWidth: "90%",
		minWidth: "90%"
	},
	submitBtnText: {
		color: white,
		fontSize: 22,
		textAlign: 'center'
	}
})

export default TextButton