import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Platform, Alert} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import {ListItem, Container, Icon, Fab, Button, Toast} from 'native-base';
import {initCardoId} from '../states/tempCardo-actions';
import {pushCardo, pullCardo} from '../api/cardo';
import {deleteMyCardo} from '../states/myCardo-actions';
class CardoItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tooltipOpen: false,
            test: false,
            date: ''
        }
        this.handleTooltipToggle = this.handleTooltipToggle.bind(this);
        this.handleShare = this.handleShare.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleView = this.handleView.bind(this);
        this.handleLongPress = this.handleLongPress.bind(this);
    }
    componentDidMount(){
    }

    render() {
        const item = this.props.item;
        // console.log(this.state.date);   
        // console.log(item.cardoTime);
        return (
            <ListItem containerStyle={{height: 100}} onPress={this.handleTooltipToggle} onLongPress={this.handleLongPress}>
                        <Text style={styles.text}>
                            {item.cardoName}
                        </Text>
                        <Text style={styles.date}>{item.cardoTime}</Text>
                        {this.state.tooltipOpen && 
                            <View style={styles.tooltip} onPress={this.handleTooltipToggle}>
                                <Button transparent onPress={this.handleEdit}>
                                    <Text style={styles.buttontext}>Edit</Text>
                                </Button>
                                <Button transparent onPress={this.handleView}>
                                    <Text style={styles.buttontext}>View</Text>
                                </Button>
                                <Button transparent onPress={this.handleShare}>
                                    <Text style={styles.buttontext}>Share</Text>
                                </Button>
                            </View>
                        }
            </ListItem>
        );
    }
    handleTooltipToggle() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }
    handleEdit(){
        this.handleTooltipToggle();
        this.props.dispatch(initCardoId(this.props.item));
        this.props.navigation.navigate('CardoMaker');
    }
    handleView(){
        this.handleTooltipToggle();
        this.props.dispatch(initCardoId(this.props.item));
        this.props.navigation.navigate('CardoViewer');
    }
    handleShare(){
        this.handleTooltipToggle();
        console.log('handleShare && handlePush');
        pushCardo(this.props.item).then((data) => {
            console.log(data);
        }).catch((err) => {
            console.log("Api call push error");
        });
        this.props.navigation.navigate("QRcodeScreen", {cardoId: this.props.item.cardoId});
    }
    handleLongPress(){
        console.log(this.props.item.cardoName);
        // let name = JSON.stringify(this.props.item.cardoName);
        // for()
        // name = name.filter((data) => {
        //     if(data !== '"')
        //         return data;
        // });
        // console.log(name);
        // let ask = "確定刪除 " + name + " ?"
        // console.log(ask);
        Alert.alert(
          "確定刪除?",
          "刪除後將無法復原",
          [
            {
              text: "取消",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => {
                    console.log("OK Pressed");
                    this.props.dispatch(deleteMyCardo(this.props.item));
                }
            },
          // { cancelable: false }
          ]
        );
    }
}
const styles = {
    buttontext: {
        fontFamily: 'serif',
        alignSelf: 'center',
        padding : 30,
        color:'white', 
        fontSize:25, 
        fontWeight:'800', 
        fontStyle:'italic', 
        textAlign: 'center',
        backgroundColor: 'transparent'
    },
    text: {
        fontFamily: 'serif',
        width: "55%",  
        height: "100%",
        alignSelf: 'center',
        padding : 20,
        color:'black', 
        fontSize:30, 
        backgroundColor:'rgba(28, 115, 155, 0.3)'
    },
    date: {
        fontFamily: 'serif',
        width: "45%",  
        height: "100%",
        justifyContent: 'center',
        alignSelf: 'center',
        padding : 30,
        color:'black', 
        fontSize:15, 
        backgroundColor:'rgba(28, 115, 155, 0.3)'
    },
    tooltip: {
        position: 'absolute',
        top: 12,
        bottom: 0,
        left: 0,
        right: 0,
        height: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
};
export default connect((state) => ({
    
}))(CardoItem);
