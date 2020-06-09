import React, {Component} from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import { quizResults, saveQuizResult } from '../data.js'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'




class QuizView extends Component {

	state = {
		answerDisplay: "",
		questionDisplay: "", 
		currentCount: 0,
		currentType: "Question",
		currentTitle: "Title",
		deckLength: this.props.navigation.state.params.deckItem.questions.length,
		deckItem: this.props.navigation.state.params.deckItem,
		deckQuestions: [...this.props.navigation.state.params.deckItem.questions],
		correctQuestions: 0,
		incorrectQuestions: 0,
		displayResults: false,
		resultsArray: [0, 0, ""]
	}

	cardFlip = () => {
		if(this.state.currentType === "Question"){
			this.setState({
				currentType: "Answer",
				currentTitle: this.state.answerDisplay,
			})
		} else if(this.state.currentType === "Answer"){
			this.setState({
				currentType: "Question",
				currentTitle: this.state.questionDisplay,
			})
		}
	}

	nextCard = (outcome) => {
		let correctCount = this.state.correctQuestions
		let incorrectCount = this.state.incorrectQuestions
		if(outcome==="Correct"){
			correctCount+=1
		}else if (outcome==="Incorrect"){
			incorrectCount+=1
		}

		if(this.state.currentCount < this.state.deckLength){
			const currentQuestions= [...this.state.deckQuestions]
			const currentQuestion = currentQuestions.pop()

			const displayQuestion = currentQuestion.question
			const displayAnswer = currentQuestion.answer

			const newCount = this.state.currentCount + 1;

			
			this.setState({
				answerDisplay: displayAnswer,
				questionDisplay: displayQuestion, 
				correctQuestions: correctCount,
				incorrectQuestions: incorrectCount,
				currentTitle: displayQuestion,
				currentType: "Question",
				currentCount: newCount,
				deckQuestions: [...currentQuestions],
				displayResults: false,
			})
		} else {
			const result = [correctCount, incorrectCount, this.state.deckItem.title]
			saveQuizResult(result)
			clearLocalNotification()
				.then(setLocalNotification)
			this.setState({
				resultsArray: result,
				displayResults: true,
				currentCount: 0,
				deckQuestions: [...this.props.navigation.state.params.deckItem.questions],
				correctQuestions: 0,
				incorrectQuestions: 0,
			})

		}
	}

	resetState=()=>{		
		this.nextCard()
	}

	componentDidMount() {
		this.nextCard()
	}

	render(){
		if(this.state.displayResults){
			return(
				<View style={styles.container}>
					<Text style={styles.item}> You got {this.state.resultsArray[0]} out of {this.state.resultsArray[0] + this.state.resultsArray[1]} questions correct </Text>
					<Button
						style={styles.item}
						title="Reset"
						onPress={()=> this.resetState()}
					/> 
					<Button
						style={styles.item}
						title="Return to Deck"
						onPress={()=> this.props.navigation.navigate('IndividualDeck')}
					/> 

				
				</View>)
		}else{
			return(
				<View style={styles.container}>
					<Text style={styles.item}>{this.state.currentCount}/{this.state.deckLength}</Text>
					<Text style={styles.item}>{this.state.currentTitle}</Text>
					<Button
						style={styles.item}
						title={this.state.currentType}
						onPress={()=> this.cardFlip()}
					/> 
					<Button
						style={styles.item}
						title="Correct"
						onPress={()=> this.nextCard("Correct")}
					/> 
					<Button
						style={styles.item}
						title="Incorrect"
						onPress={()=> this.nextCard("Incorrect")}
					/>
				</View>
			)
		}
	}
	
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		padding: 20,
	},
	item: {
		flex: 0,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		fontSize: 25
	}

})


export default QuizView