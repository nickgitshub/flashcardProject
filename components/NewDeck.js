import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { saveDeckTitle, getDeck, addCardToDeck } from '../data.js'


class  NewDeck extends Component{

	state = {
		deckTitle: ""
	}

	handleText = (text) => {
		this.setState({
			deckTitle: text
		})
	}

	modifyDeck = (deckKey, card) => {
		addCardToDeck(deckKey, card)
	}


	handleSubmit = () => {
		saveDeckTitle(this.state.deckTitle)
		this.props.navigation.navigate('IndividualDeck',
			{
				deckKey: this.state.deckTitle, deckItem: getDeck(this.state.deckTitle), 
				modifyDeck: this.modifyDeck,
			}
		)
		this.setState({
			deckTitle: ""
		})
	}

	render(){
		return(
			<View style={styles.container}>
				<Text style={styles.item}>
				What is the title of your new deck?
				</Text>
				<TextInput 
		        	style={styles.item} placeholder="Deck Title"
		        	onChangeText={text => this.handleText(text)}
		        	value={this.state.deckTitle}
	        	/>
	        	<Button 
	        		style={styles.item}
		        	title="Submit"
		        	onPress={()=>this.handleSubmit()}
	        	/> 
			</View>
		)

	}
	
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center', 
		alignItems: 'center',
		padding: 20,
	},
	item: {
		padding: 5,
		margin: 10, 
		fontSize: 20 
	}
})


export default NewDeck