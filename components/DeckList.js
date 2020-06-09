import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { getDecks, getDeck, addCardToDeck } from '../data.js'
import { NavigationEvents } from 'react-navigation';
import { setLocalNotification } from '../utils/helpers'


class DeckList extends Component{

	state = {
		deckObject: {},
		deckKeys: []
	}

	componentDidMount() {
		setLocalNotification()
		this.setState({
			deckObject: getDecks(),
			deckKeys: Object.keys(getDecks())
		})
	}

	modifyDeck = (deckKey, card) => {

		addCardToDeck(deckKey, card)
		this.setState({
			deckObject: getDecks(),
			deckKeys: Object.keys(getDecks())
		})
	}

	render(){

		return(
			
			<View style={styles.deckContainer}>
				<NavigationEvents
		          onWillFocus={() => {
		            this.setState({
						deckObject: getDecks(),
						deckKeys: Object.keys(getDecks())
					})
		          }}
		        />
				{this.state.deckKeys.map( key => 
					<TouchableOpacity 
						onPress={()=> this.props.navigation.navigate('IndividualDeck', 
							{
								deckKey: key, deckItem: getDeck(key), 
								modifyDeck: this.modifyDeck,
							})
						} 
						key={this.state.deckObject[key].title}
					>
						<View style={styles.deckCard}>
				 			<Text style={styles.title} >{this.state.deckObject[key].title}</Text>
				 			<Text>{this.state.deckObject[key].questions.length} Card(s)</Text> 
				 		</View>
			 		</TouchableOpacity>
				)}	
			</View>
		)

	}
	
	
}	

const styles = StyleSheet.create({
	deckContainer: {
		flex: 1,
		justifyContent: 'center', 
		alignItems: 'stretch',
		padding: 20,
	},
	deckCard: {
		alignItems: 'center',
		padding: 10, 
		margin: 5
	},
	
})

export default DeckList

// 		