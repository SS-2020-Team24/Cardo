import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
} from 'react-native';
//
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Linking
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
//
import InfiniteScrollView from 'react-native-infinite-scroll-view';

import {Container, Icon, Fab, Button, Toast} from 'native-base';
// import NavigationContainer from './NavigationContainer';

import {connect} from 'react-redux';

class ScannerScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
    }
    onSuccess = e => {
        Linking.openURL(e.data).catch(err =>
          console.error('An error occured', err)
        );
      };
    render() {
        const {navigate} = this.props.navigation;
        return (
            <QRCodeScanner
                onRead={this.onSuccess}
                flashMode={RNCamera.Constants.FlashMode.torch}
                topContent={
                  <Text style={styles.centerText}>
                    Go to{' '}
                    <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
                    your computer and scan the QR code.
                  </Text>
                }
                bottomContent={
                  <TouchableOpacity style={styles.buttonTouchable}>
                    <Text style={styles.buttonText}>OK. Got it!</Text>
                  </TouchableOpacity>
                }
              />
        );
    }
    handleFabPress(){

    }
    handleViewEdit() {
        // this.props.navigation.navigate('ViewEdit');
    }
}
// const styles = {
//     button: {width: 160, justifyContent: 'center'},
//     buttonText: {
//         color:'white', fontSize:40, fontWeight:'100', textAlign: 'center'
//     }
// };
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});
export default connect(state => ({
    
}))(ScannerScreen);
