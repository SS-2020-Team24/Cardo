import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Platform, Alert} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import {ListItem, Container, Icon, Fab, Button, Toast} from 'native-base';
import {initCardoId} from '../states/tempCardo-actions';
import {pushCardo, pullCardo} from '../api/cardo';
import {deleteOthersCardo} from '../states/othersCardo-action';
class OthersCardoItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tooltipOpen: false,
            test: false
        }
        this.handleTooltipToggle = this.handleTooltipToggle.bind(this);
        this.handleShare = this.handleShare.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleView = this.handleView.bind(this);
        this.handleLongPress = this.handleLongPress.bind(this);
    }
    render() {
        const item = this.props.item;
        // console.log(item.cardoName);
        return (
            <ListItem containerStyle={{flex: 1}} onPress={this.handleTooltipToggle} onLongPress={this.handleLongPress}>
                        <Text style={styles.text}>
                            {item.cardoName}
                        </Text>
                        <Text style={styles.date}>{item.cardoTime}</Text>
                        {this.state.tooltipOpen && 
                            <View style={styles.tooltip} onPress={this.handleTooltipToggle}>
                                <Button transparent onPress={this.handleView} style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={styles.buttontext}>View</Text>
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
        // this.handleTooltipToggle();
        // this.props.dispatch(initCardoId(this.props.item));
        // this.props.navigation.navigate('CardoMaker');
    }
    handleView(){
        this.handleTooltipToggle();
        this.props.dispatch(initCardoId(this.props.item));
        this.props.navigation.navigate('CardoViewer');
    }
    handleShare(){
        // console.log('handleShare && handlePush');
        // pushCardo(this.props.item).then((data) => {
        //     console.log(data);
        // }).catch((err) => {
        //     console.log("Api call push error");
        // });
        // this.props.navigation.navigate("QRcodeScreen", {cardoId: this.props.item.cardoId});
    }
    handleLongPress(){
        console.log(this.props.item.cardoName);
        Alert.alert(
          "確定刪除" + {},
          "刪除後將無法復原",
          [
            {
              text: "取消",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => {
                    console.log("OK Pressed");
                    this.props.dispatch(deleteOthersCardo(this.props.item));
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
        justifyContent: 'center',
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
};
export default connect((state) => ({
    
}))(OthersCardoItem);
