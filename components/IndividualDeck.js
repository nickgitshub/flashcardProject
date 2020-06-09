import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, Animated} from 'react-native';
import { getDeck } from '../data.js'


class IndividualDeck extends Component{
	
	state = {
		deckKey: "",
		deckTitle: "",
		deckLength: 0,
		opacity: new Animated.Value(0)

	}

	componentDidMount() {
		const { opacity } = this.state
		Animated.timing(opacity, {toValue: 1, duration:1000}).start()
		
		this.setState({
			deckKey: this.props.navigation.state.params.deckItem.title,
			deckTitle: this.props.navigation.state.params.deckItem.title,
			deckLength: this.props.navigation.state.params.deckItem.questions.length
		})
	}


	updateDeckLength = () => {
		this.setState({
			deckLength: this.state.deckLength+1
		})
	}


	render(){
		const { opacity } = this.state

		return(
			<Animated.View style={[styles.deckContainer, { opacity }]}>
				<Text style={styles.deckItem}>{this.state.deckTitle}</Text>
		        <Text style={styles.deckItem}>{this.state.deckLength}</Text> 
		        
		        <Button
					onPress={()=> this.props.navigation.navigate('NewQuestion', 
						{
							deckKey: this.state.deckKey, 
							modifyDeck: this.props.navigation.state.params.modifyDeck,
							updateDeckLength: this.updateDeckLength
						})
					}
					title="Add Card"
		        /> 
		        <Button
					onPress={()=> this.props.navigation.navigate('QuizView', {deckItem: this.props.navigation.state.params.deckItem})}
					title="Start Quiz"
		        />
	  		</Animated.View>
		)

	}
}

const styles = StyleSheet.create({
	deckContainer: {
		flex: 1,
		justifyContent: 'center', 
		alignItems: 'center',
		padding: 20,
	},
	deckItem: {
		padding: 5
	}

})

export default IndividualDeck