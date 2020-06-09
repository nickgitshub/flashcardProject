import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import DeckList from './components/DeckList'
import IndividualDeck from './components/IndividualDeck'
import QuizView from './components/QuizView'
import NewDeck from './components/NewDeck'
import NewQuestion from './components/NewQuestion'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs';


const Tabs = createBottomTabNavigator(

  {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
          tabBarLabel: 'DeckList'
      }
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
          tabBarLabel: 'NewDeck'
      }
    },
  }, 

  {
    tabBarOptions: {
      activeTintColor: '#000000',
      style: {
        height: 56, 
        backgroundColor: '#808080'
      }
    }
  }

);

const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: Tabs,
    },
    IndividualDeck: {
      screen: IndividualDeck
    },
    NewQuestion: {
      screen: NewQuestion
    },
    QuizView: {
      screen: QuizView
    }

  }
);



export default createAppContainer(MainNavigator);

