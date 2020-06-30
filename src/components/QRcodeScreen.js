import React from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, FlatList, ImageBackground, Image} from 'react-native';
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
        // let {cardoId} = this.props.navigation.getParam("cardoId", "dd");
        let cardoId = this.props.route.params.cardoId;
        let url = "https://" + cardoId;
        // console.log(url);
        // console.log(JSON.stringify(this.props.navigation.getParam("cardoId")));
        return (
            <View style={{flex: 1}} justifyContent="flex-start" alignItems="center">
            <ImageBackground  source={require('../images/background.jpg')} style={styles.image}>
                <Text style={styles.text}>Here is your QR code</Text>
                <QRCode value={url} size={200}/>
            </ImageBackground>
            </View>
        );
    }
}
const styles = {
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
    image: {
        flex: 1,
        resizeMode: "cover",
        alignItems: "center"
        // justifyContent: "center"
    }
};
export default connect((state) => ({

}))(QRcodeScreen);
