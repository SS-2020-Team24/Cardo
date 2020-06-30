import React from 'react';
import PropTypes from 'prop-types';

import {View, StyleSheet, Text, Image, ImageBackground} from 'react-native';
import { AsyncStorage } from 'react-native';
import {Container, Icon, Fab, Button, Toast} from 'native-base';
import {connect} from 'react-redux';

import {pushCardo, pullCardo} from '../api/cardo'

class TopScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.handleCardoList = this.handleCardoList.bind(this);
        this.handleOthersCardoList = this.handleOthersCardoList.bind(this);
        this.handleScanner = this.handleScanner.bind(this);
        this.handleButton4 = this.handleButton4.bind(this);
    }

    render() {
        const {navigate} = this.props.navigation;
        console.log('aabba');
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems:'stretch'}}>
            <ImageBackground  source={require('../images/background.jpg')} style={styles.image}>
                <View style={{flex: 3, justifyContent: 'center'}}>
                    <Text style={styles.text}>Cardo</Text>
                </View>
                <View style={{flex: 4, flexDirection:'column', justifyContent: 'space-around', alignSelf:'center', alignItems:'center'}}>
                    <Button info full rounded style={styles.button} onPress={() => this.handleCardoList()}>
                        <Text style={styles.buttonText}>My</Text>
                    </Button>
                    <Button info full rounded style={styles.button} onPress={() => this.handleOthersCardoList()}>
                        <Text style={styles.buttonText}>Others</Text>
                    </Button>
                    <Button info full rounded style={styles.button} onPress={() => this.handleScanner()}>
                        <Text style={styles.buttonText}>Scanner</Text>
                    </Button>
                </View>
                <View style={{flex:2}}>
                </View>
            </ImageBackground>
            </View>

        );
    }
    handleCardoList(){
        console.log('handleCardoList');
        this.props.navigation.navigate('CardoList');
        // pushCard("test2").then((data) => {
        //     console.log(data);
        // }).catch((err) => {
        //     console.log("Api call error");
        // });
    }
    handleOthersCardoList(){
        console.log('handleOthersCardoList');
        this.props.navigation.navigate('OthersCardoList')
        // pullCard("84ecbb60-bbe1-428d-a2d1-b537f9fa9d3b").then((data) => {
        //     console.log(data);
        // }).catch((err) => {
        //     console.log("Api call error");
        // });
    }
    handleButton4(){
        console.log('handleButton4');
        AsyncStorage.clear();
    }
    handleScanner() {
        console.log('handleScanner');
        this.props.navigation.navigate('ScannerScreen');
    }
}
const styles = {
    button: {width: 160, justifyContent: 'center'},
    buttonText: {
        color:'white', fontSize:20, fontWeight:'100', textAlign: 'center'
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    text: {
        fontFamily: 'serif',
        alignSelf: 'center',
        padding : 20,
        color:'rgba(25, 69, 123, 0.9)', 
        fontSize:80, 
        fontWeight:'800', 
        fontStyle:'italic', 
        textAlign: 'center'
    }
};
export default connect(state => ({
    
}))(TopScreen);
