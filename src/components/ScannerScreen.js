import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import {AppRegistry, StyleSheet, TouchableOpacity, Linking, AsyncStorage} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import {connect} from 'react-redux';

import {finishEditCardo} from '../states/othersCardo-action'
import {pushCardo, pullCardo} from '../api/cardo';

class ScannerScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);

        this.onSuccess = this.onSuccess.bind(this);
    }
    // onSuccess = e => {
    //     Linking.openURL(e.data).catch(err =>
    //       console.error('An error occured', err)
    //     );
    //   };
    onSuccess(url){
      console.log('hhh');
      let id = url.data.slice(8);
      console.log(id);
      console.log("get");
      pullCardo(id).then((internetCardo) => {
          console.log("kkk");
          console.log(internetCardo);
          //get time
          var date = new Date().getDate(); //Current Date
          var month = new Date().getMonth() + 1; //Current Month
          var year = new Date().getFullYear(); //Current Year
          var hours = new Date().getHours(); //Current Hours
          var min = new Date().getMinutes(); //Current Minutes
          var sec = new Date().getSeconds(); //Current Seconds
          if(month.length === 1){
            month = '0' + month;
          }
          if(date.length === 1){
            date = '0' + date;
          }
          if(hours.length === 1){
            hours = '0' + hours;
          }
          if(min.length === 1){
            min = '0' + min;
          }
          if(sec.length === 1){
            sec = '0' + sec;
          }
          let ts = year + '/' + month + '/' + date + ' ' + hours + ':' + min + ':' + sec;
          //get time
          let data = internetCardo;
          data.cardoTime = ts;
          console.log(data);
          this.props.dispatch(finishEditCardo(data));
        }).catch((err) => {
          console.log("Api call pull error");
        });
      console.log("set");
    }
    render() {
        const {navigate} = this.props.navigation;
        return (
            <QRCodeScanner
                onRead={this.onSuccess}
                flashMode={RNCamera.Constants.FlashMode.torch}

                // topContent={
                //   <Text style={styles.centerText}>
                //     Go to{' '}
                //     <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
                //     your computer and scan the QR code.
                //   </Text>
                // }
                bottomContent={
                  <TouchableOpacity style={styles.buttonTouchable}>
                    <Text style={styles.buttonText}>OK. Got it!</Text>
                  </TouchableOpacity>
                }
              />
        );
    }
}
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
