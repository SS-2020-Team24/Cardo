import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Platform} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import {ListItem, Container, Icon, Fab, Button, Toast} from 'native-base';
import {initCardoId} from '../states/tempCardo-actions';
import {pushCardo, pullCardo} from '../api/cardo';

class CardoItem extends React.Component {

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
        this.handleTest = this.handleTest.bind(this);
    }
    render() {
        const item = this.props.item;
        // console.log(item.cardoName);
        return (
            <ListItem containerStyle={{flex: 1}} onPress={this.handleTooltipToggle}>
                        <Text style={{backgroundColor:'blue',color:'white',padding:10,width:180}}>
                            {item.cardoName}
                        </Text>
                        {this.state.tooltipOpen && 
                            <View style={styles.tooltip} onPress={this.handleTooltipToggle}>
                                <Button transparent onPress={this.handleEdit}>
                                    <Text style={styles.text}>Edit</Text>
                                </Button>
                                <Button transparent onPress={this.handleView}>
                                    <Text style={styles.text}>View</Text>
                                </Button>
                                <Button transparent onPress={this.handleShare}>
                                    <Text style={styles.text}>Share</Text>
                                </Button>
                                <Button transparent onPress={this.handleTest}>
                                    <Text style={styles.text}>test</Text>
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
        console.log('handleShare && handlePush');
        pushCardo(this.props.item).then((data) => {
            console.log(data);
        }).catch((err) => {
            console.log("Api call push error");
        });
        this.props.navigation.navigate("QRcodeScreen", {cardoId: this.props.item.cardoId});
    }
    handleTest(){
        console.log('handlePull');
        pullCardo(this.props.item.cardoId).then((data) => {
            console.log(data);
        }).catch((err) => {
            console.log("Api call pull error");
        });
    }
}
const styles = {
    text: {
        fontFamily: 'serif',
        alignSelf: 'center',
        padding : 20,
        color:'white', 
        fontSize:30, 
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
    
}))(CardoItem);