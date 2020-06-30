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
import CardoList from './components/CardoList';
import QRcodeScreen from './components/QRcodeScreen';
import CardoMaker from './components/CardoMaker';
import CardoViewer from './components/CardoViewer';
import OthersCardoList from './components/OthersCardoList';
// const AppNavigator = createStackNavigator({
//     Today: {screen: TodayScreen},
//     Forecast: {screen: ForecastScreen},
    // PostForm: {screen: PostFormScreen}
// }, {
//     headerMode: 'none'
// });

import {tempCardo} from './states/tempCardo-reducers';
import {myCardo} from './states/myCardo-reducers';
import {othersCardo} from './states/othersCardo-reducers';

const Stack = createStackNavigator();

const appReducer = {
    search, toast, post, postForm, postItem,
    tempCardo, myCardo, othersCardo
};

const store = createStore(combineReducers(appReducer), 
    compose(applyMiddleware(thunkMiddleware, loggerMiddleware)));


                // <CardoViewer />
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
                        <Stack.Screen name="CardoList" component={CardoList} options={{ title: 'CardoList', headerShown: true}} />
                        <Stack.Screen name="QRcodeScreen" component={QRcodeScreen} options={{ title: 'QRcodeScreen', headerShown: true}} />
                        <Stack.Screen name="CardoMaker" component={CardoMaker} options={{ title: 'Edit Cardo', headerShown: true}} />
                        <Stack.Screen name="CardoViewer" component={CardoViewer} options={{ title: 'Show Cardo', headerShown: true}} />
                        
                        <Stack.Screen name="OthersCardoList" component={OthersCardoList} options={{ title: 'OthersCardoList', headerShown: true}} />
                    </Stack.Navigator>
                    </Root>
                </Provider>
            </NavigationContainer>
        );
    }
}

// export default class App extends React.Component {
//     render() {
//         return (
//             <NavigationContainer>
//                 <Provider store={store}>
//                 {/* <Text>Welcome to React Native QQ!</Text>
//                 <Text>To get started, edit App.js</Text> */}
//                     <Root>
//                     <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: 'gray' } }}>
//                         <Stack.Screen name="TopScreen" component={TopScreen} options={{ title: 'Menu', headerShown: false}} />
//                         <Stack.Screen name="ScannerScreen" component={ScannerScreen} options={{ title: 'ScannerScreen', headerShown: true}} />
//                         <Stack.Screen name="CardList" component={CardList} options={{ title: 'CardList', headerShown: true}} />
//                         <Stack.Screen name="QRcodeScreen" component={QRcodeScreen} options={{ title: 'QRcodeScreen', headerShown: true}} />
//                     </Stack.Navigator>
//                     </Root>
//                 </Provider>
//             </NavigationContainer>
//         );
//     }
// }
