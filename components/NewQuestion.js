import React, {Component} from 'react'
import { StyleSheet, TextInput, View, Button} from 'react-native';
import { addCardToDeck } from '../data.js'


class NewQuestion extends Component{

	state = {
		deckKey: this.props.navigation.state.params.deckKey, 
		question: "",
		answer: ""
	}


	handleText = (type, text) => {
		if(type==="question"){
			this.setState({
				question: text
			})
		}
		else if(type==="answer"){
			this.setState({
				answer: text
			})

		}
	}

	handleSubmit = () => {
			const card = {
				"answer": this.state.answer,
				"question": this.state.question,
			}
			this.props.navigation.state.params.modifyDeck(this.state.deckKey, card)
			this.props.navigation.state.params.updateDeckLength()
			this.props.navigation.goBack()
	}



	render(){

		return(
			<View style={styles.container}>
	        <TextInput style={styles.item} placeholder="Type new question..."
	        	onChangeText={text => this.handleText("question", text)}
	        />

	        <TextInput 
	        	style={styles.item} placeholder="Question Answer..."
	        	onChangeText={text => this.handleText("answer", text)}
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
		alignItems: 'center',
		padding: 20,
	},
	item: {
		padding: 15,
		margin: 10,
		fontSize: 25
	}
})


export default NewQuestion