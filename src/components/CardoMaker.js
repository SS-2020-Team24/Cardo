import React from 'react';
import PropTypes from 'prop-types';

import {
  View, Text, Button, TextInput, ScrollView, Alert 
} from 'react-native';

import Cardobase from './Cardobase'

import {connect} from 'react-redux';

import {
	createCardobase as createCardobase_action,
	changeCardoName as changeCardoName_action,
	clearCardo as clearTeampCardo_action,
	updateCardobase as updateCardobase_action,
	updataEditingCardobase as updataEditingCardobase_action
} from '../states/tempCardo-actions'

import {
	finishEditCardo as moveTempCardoToMyCardo_action
} from '../states/myCardo-actions'

import {AsyncStorage, ImageBackground, Image} from 'react-native';

class CardoMaker extends React.Component {
    static propTypes = {
    	cardoId: PropTypes.string.isRequired,
    	cardoName: PropTypes.string.isRequired,
    	cardobases: PropTypes.array.isRequired,

        editingCardobaseId: PropTypes.number.isRequired,
        editingCardobaseFontSize: PropTypes.number.isRequired,
        editingCardobaseFontColor: PropTypes.string.isRequired,
        editingCardobaseLink: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
        	editCardobasePropsActive: false,
        	prop_type: "",
        	prop_value: "",
        	
        	newCardobaseInitX: 30,
        	newCardobaseInitY: 150
        };

		this.changeCardoName = this.changeCardoName.bind(this);
		this.createCardobase = this.createCardobase.bind(this);
		this.finishEditCardo = this.finishEditCardo.bind(this);

		this.handleEditCardobasePropsActive = this.handleEditCardobasePropsActive.bind(this);
		this.handleLinkButtonPress = this.handleLinkButtonPress.bind(this);
		this.handleColorButtonPress = this.handleColorButtonPress.bind(this);
		this.handleSizeButtonPress = this.handleSizeButtonPress.bind(this);
		this.handleEditCardobaseProps = this.handleEditCardobaseProps.bind(this);
    }

	render() { 
		let card = this.props.cardobases.map(p => (
				<Cardobase initState={{...p}}/>
			));		
		return (
			<View style={{flex: 1}}>
			<ImageBackground  source={require('../images/background.jpg')} style={styles.image}>
			<View>
				<TextInput borderColor={'red'} borderWidth={1}
					onChangeText={this.changeCardoName} value={this.props.cardoName}
				/> 
				<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
					<Button onPress={this.finishEditCardo} title='done' />
					{this.props.editingCardobaseId !== -1 && 
						<View  style={{flexDirection: 'row', justifyContent: 'space-between'}}>
							<Button title='link' color='gray' onPress={this.handleLinkButtonPress} />
							<Text>&nbsp;</Text>
							<Button title='color' color='gray' onPress={this.handleColorButtonPress} />
							<Text>&nbsp;</Text>
							<Button title='size' color='gray' onPress={this.handleSizeButtonPress} />
						</View>
					}
					<Button onPress={this.createCardobase} title='create' />
				</View>
				{ this.state.editCardobasePropsActive &&
					<ScrollView keyboardShouldPersistTaps='handled'>
						<TextInput borderColor={'green'} borderWidth={1}
						onChangeText={(text)=>{this.setState({prop_value: text})}} value={this.state.prop_value}
						onEndEditing={this.handleEditCardobaseProps} onBlur={this.handleEditCardobaseProps}/> 
					</ScrollView>
				}
				{card}
			</View>
			</ImageBackground>
			</View>
		);
	}

	changeCardoName(text) {
		let newCardoName = text;
		this.props.dispatch(changeCardoName_action(newCardoName));
		console.log('change cardo name');
	}

	createCardobase() {
		let newCardobase = {id: this.props.cardobases.length,initX: this.state.newCardobaseInitX, initY: this.state.newCardobaseInitY, 
			text: '', link: '', fontSize: 20, fontColor: 'black'};
		this.props.dispatch(createCardobase_action(newCardobase));
		this.setState({
			newCardobaseInitX: this.state.newCardobaseInitX + 10,
			newCardobaseInitY: this.state.newCardobaseInitY + 10
		});
		if(this.state.newCardobaseInitX >= 200) {
			Alert.alert('Your Cardo is too fat = =');
		}
		console.log('create new cardobase');
	}

	finishEditCardo() {
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
        // console.log(ts);
		let newCardo = {cardoId: this.props.cardoId, cardoName: this.props.cardoName, cardobases: this.props.cardobases,
			editingCardobaseId: -1, cardoTime: ts};
		// console.log('xxxxxxxxxxxx');
		this.props.dispatch(moveTempCardoToMyCardo_action(newCardo));
		this.props.dispatch(clearTeampCardo_action);
		console.log('finish edit cardo');
		this.props.navigation.goBack();
	}

	handleEditCardobasePropsActive(prop_type) {
		console.log(prop_type);
		this.setState({
			editCardobasePropsActive: !this.state.editCardobasePropsActive,
			prop_type,
		});
	}
	handleLinkButtonPress() {
		this.handleEditCardobasePropsActive('editingCardobaseLink');
	}
	handleColorButtonPress() {
		this.handleEditCardobasePropsActive('editingCardobaseFontColor');
	}
	handleSizeButtonPress() {
		this.handleEditCardobasePropsActive('editingCardobaseFontSize');
	}
	handleEditCardobaseProps() {
		console.log(this.props.editingCardobaseId);
		console.log(this.state.prop_type);
		this.props.dispatch(updataEditingCardobase_action({[this.state.prop_type]: this.state.prop_value}));
		this.props.dispatch(updateCardobase_action({id: this.props.editingCardobaseId, [this.state.prop_type]: this.state.prop_value}));
		this.handleEditCardobasePropsActive();
	}
}

const styles = {
    image: {
        flex: 1,
        resizeMode: "cover",
    }
};

export default connect(state => ({
    ...state.tempCardo
}))(CardoMaker); 