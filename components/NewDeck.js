import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { saveDeckTitle } from '../data.js'


class  NewDeck extends Component{

	state = {
		deckTitle: ""
	}

	handleText = (text) => {
		this.setState({
			deckTitle: text
		})
	}


	handleSubmit = () => {
		saveDeckTitle(this.state.deckTitle)
		this.props.navigation.navigate('DeckList')
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