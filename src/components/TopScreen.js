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
        this.handleScanner = this.handleScanner.bind(this);
        this.handleButton2 = this.handleButton2.bind(this);
        this.handleButton3 = this.handleButton3.bind(this);
        this.handleButton4 = this.handleButton4.bind(this);
        this.handleButton5 = this.handleButton5.bind(this);
        this.state = {
            cnt: 0,
            val: 50
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        console.log('aabba');
        return (
            <View style={{flex:1}}>

            <View style={{flex: 1, justifyContent: 'center', alignItems:'stretch'}}>
            <ImageBackground  source={require('../images/background.jpg')} style={styles.image}>
                <View style={{flex: 3, justifyContent: 'center'}}>
                    <Text style={styles.text}>Cardo</Text>
                </View>
                <View style={{flex: 4, flexDirection:'column', justifyContent: 'space-around', alignSelf:'center', alignItems:'center'}}>
                    <Button info full rounded style={styles.button} onPress={() => this.handleScanner()}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </Button>
                    <Button info full rounded style={styles.button} onPress={() => this.handleButton2()}>
                        <Text style={styles.buttonText}>View My Cardo</Text>
                    </Button>
                    <Button info full rounded style={styles.button} onPress={() => this.handleButton3()}>
                        <Text style={styles.buttonText}>test</Text>
                    </Button>
                </View>
                <View style={{flex:2}}>
                </View>
            </ImageBackground>
            </View>
            <View style={{flex:1}}>
                    <Button info full rounded style={styles.button} onPress={() => this.handleButton4()}>
                        <Text style={styles.buttonText}>b4</Text>
                    </Button>
                    <Button info full rounded style={styles.button} onPress={() => this.handleButton5()}>
                        <Text style={styles.buttonText}>b5</Text>
                    </Button>
                    <Button info full rounded style={styles.button} onPress={() => this.handleButton6()}>
                        <Text style={styles.buttonText}>b6</Text>
                    </Button>
                    <Button info full rounded style={styles.button} onPress={() => this.handleButton7()}>
                        <Text style={styles.buttonText}>b7</Text>
                    </Button>
            </View>
            </View>

        );
    }
    handleButton2(){
        console.log('handleButton2');
        this.props.navigation.navigate('CardoList');
        // pushCard("test2").then((data) => {
        //     console.log(data);
        // }).catch((err) => {
        //     console.log("Api call error");
        // });
    }
    handleButton3(){
        console.log('handleButton3');
        // pullCard("84ecbb60-bbe1-428d-a2d1-b537f9fa9d3b").then((data) => {
        //     console.log(data);
        // }).catch((err) => {
        //     console.log("Api call error");
        // });
        AsyncStorage.clear();
    }
    handleButton4(){
        console.log('handleButton4');
        let key = this.state.cnt.toString();
        let val = this.state.val.toString();
        AsyncStorage.setItem(key, val);
        this.setState({
            cnt: this.state.cnt + 1,
            val: this.state.val + 1
        });
    }
    handleButton5(){
        console.log('handleButton5');
        AsyncStorage.getAllKeys().then((data) => {
            data.forEach((data) => {
                AsyncStorage.getItem(data).then( (data) => {
                    console.log(data);
                });
            })
            console.log(data);
        });
    }
    handleButton6(){
        console.log('handleButton6');
        AsyncStorage.getAllKeys().then((data) => {
            console.log(data);
        });
    }
    handleButton7(){
        console.log('handleButton7');
        AsyncStorage.getAllKeys().then((data) => {
            console.log(data);
            let arr=[];
            AsyncStorage.multiGet(data).then((data) => {
                console.log(data);
                data.forEach((data) => {
                    arr.push(data[1]);
                });
                // console.log(JSON.parse(arr));
            });
        });
    }

    handleScanner() {
        // console.log('handleViewEdit');
        this.props.navigation.navigate('ScannerScreen', {name:"abc"});
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
        color:'white', 
        fontSize:80, 
        fontWeight:'800', 
        fontStyle:'italic', 
        textAlign: 'center'
    }
};
export default connect(state => ({
    
}))(TopScreen);
