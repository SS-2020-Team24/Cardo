import React from 'react';
import PropTypes from 'prop-types';
// import {
//     View,
//     FlatList, RefreshControl
// } from 'react-native';
import {
SafeAreaView,
StyleSheet,
ScrollView,
View,
Text,
StatusBar,
FlatList
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import {connect} from 'react-redux';


import QRCode from 'react-native-qrcode-svg';


class QRcodeScreen extends React.Component {
    static propTypes = {
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={{flex: 1}} justifyContent="flex-start" alignItems="center">

                <Text style={styles.text}>Here is your QR code</Text>


                <QRCode value={this.props.url} />

            </View>
        );
    }
}
const styles = {
    ItemText: {backgroundColor:'blue',color:'white',padding:0,width:150},
    button1: {backgroundColor:'red', height: 40, width: 50, justifyContent: 'center'},
    button2: {backgroundColor:'green', height: 40, width: 50, justifyContent: 'center'},
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
        padding : 50,
        color:'black', 
        fontSize:50, 
        fontWeight:'800', 
        fontStyle:'italic', 
        textAlign: 'center'
    },
    tooltip: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
};
export default connect((state) => ({

}))(QRcodeScreen);
