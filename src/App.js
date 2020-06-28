import 'react-native-gesture-handler';
import React from 'react';
import {BackHandler, Text} from 'react-native';

import {Root, StyleProvider} from 'native-base';
// import getTheme from '../native-base-theme/components';
// import platform from '../native-base-theme/variables/platform';

import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import {Provider, connect} from 'react-redux';
import {search} from './states/search';
import {toast} from './states/toast';
import {post, postForm, postItem} from './states/post-reducers';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import {createStackNavigator, StackNavigator, NavigationActions} from 'react-navigation';
// import {createReactNavigationReduxMiddleware, createReduxContainer, createNavigationReducer} from 'react-navigation-redux-helpers';

import TopScreen from './components/TopScreen';
import ScannerScreen from './components/ScannerScreen';
import CardList from './components/CardList';
import QRcodeScreen from './components/QRcodeScreen';


// const AppNavigator = createStackNavigator({
//     Today: {screen: TodayScreen},
//     Forecast: {screen: ForecastScreen},
    // PostForm: {screen: PostFormScreen}
// }, {
//     headerMode: 'none'
// });
const Stack = createStackNavigator();

const appReducer = {
    search, toast, post, postForm, postItem
};

const store = createStore(combineReducers(appReducer), 
    compose(applyMiddleware(thunkMiddleware, loggerMiddleware)));


export default class App extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Provider store={store}>
                {/* <Text>Welcome to React Native QQ!</Text>
                <Text>To get started, edit App.js</Text> */}
                    <Root>
                    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: 'gray' } }}>
                        <Stack.Screen name="TopScreen" component={TopScreen} options={{ title: 'Menu', headerShown: false}} />
                        <Stack.Screen name="ScannerScreen" component={ScannerScreen} options={{ title: 'ScannerScreen', headerShown: true}} />
                        <Stack.Screen name="CardList" component={CardList} options={{ title: 'CardList', headerShown: true}} />
                        <Stack.Screen name="QRcodeScreen" component={QRcodeScreen} options={{ title: 'QRcodeScreen', headerShown: true}} />
                    </Stack.Navigator>
                    </Root>
                </Provider>
            </NavigationContainer>
        );
    }
}
