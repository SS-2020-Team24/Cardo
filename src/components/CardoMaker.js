import React from 'react';
import PropTypes from 'prop-types';

import {
  View, Text, Button, TextInput, ScrollView
} from 'react-native';

import Cardobase from './Cardobase'

import {connect} from 'react-redux';

import {
	createCardobase as createCardobase_action,
	changeCardoName as changeCardoName_action,
	clearCardo as clearTeampCardo_action,
	updateCardobaseLink as updateCardobaseLink_action
} from '../states/tempCardo-actions'

import {
	finishEditCardo as moveTempCardoToMyCardo_action
} from '../states/myCardo-actions'

import { AsyncStorage } from 'react-native';

class CardoMaker extends React.Component {
    static propTypes = {
    	cardoId: PropTypes.string.isRequired,
    	cardoName: PropTypes.string.isRequired,
    	cardobases: PropTypes.array.isRequired,

        editingCardobaseId: PropTypes.number.isRequired
    	// cardos: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
        	editCardobaseLinkActive: false,
        	link: ""
        };

		this.changeCardoName = this.changeCardoName.bind(this);
		this.createCardobase = this.createCardobase.bind(this);
		this.finishEditCardo = this.finishEditCardo.bind(this);

		this.handleEditCardobaseLinkActive = this.handleEditCardobaseLinkActive.bind(this);
		this.handleEditCardobaseLink = this.handleEditCardobaseLink.bind(this);
    }

	render() { 
		let card = this.props.cardobases.map(p => (
				<Cardobase initState={{...p}}/>
			));		
		// let test = this.props.cardos.map(cardo => (
		// 		<Text> {cardo.cardoId} {cardo.cardoName} {cardo.cardobases.length}</Text>
		// 	));
		// 		{test}
		return (
			<View>
				<TextInput borderColor={'red'} borderWidth={1}
					onChangeText={this.changeCardoName} value={this.props.cardoName}
				/> 
				<Text>Cardo ID is {this.props.cardoId}</Text>
				<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
					<Button onPress={this.finishEditCardo} title='done' />
					{
						this.props.editingCardobaseId !== -1 && <Button title='link' onPress={this.handleEditCardobaseLinkActive} />
					}
					<Button onPress={this.createCardobase} title='create' />
				</View>
				{ this.state.editCardobaseLinkActive &&
					<ScrollView keyboardShouldPersistTaps='handled'>
						<TextInput borderColor={'green'} borderWidth={1}
						onChangeText={(text)=>{this.setState({link: text})}} value={this.state.link}
						onEndEditing={this.handleEditCardobaseLink} onBlur={this.handleEditCardobaseLink}/> 
					</ScrollView>
				}
				{card}
			</View>
		);
	}

	changeCardoName(text) {
		let newCardoName = text;
		this.props.dispatch(changeCardoName_action(newCardoName));
		console.log('change cardo name');
	}

	createCardobase() {
		let newCardobase = {id: this.props.cardobases.length,initX: 100, initY: 100, text: '', link: 'https://www.facebook.com/profile.php?id=100009072129765'};
		this.props.dispatch(createCardobase_action(newCardobase));
		console.log('create new cardobase');
	}

	finishEditCardo() {
		let newCardo = {cardoId: this.props.cardoId, cardoName: this.props.cardoName, cardobases: this.props.cardobases,
			editingCardobaseId: -1};
		AsyncStorage.setItem(this.props.cardoId, JSON.stringify(newCardo));

		this.props.dispatch(moveTempCardoToMyCardo_action(newCardo));
		this.props.dispatch(clearTeampCardo_action);
		console.log('finish edit cardo');
		this.props.navigation.goBack();
	}

	handleEditCardobaseLinkActive() {
		this.setState({
			editCardobaseLinkActive: !this.state.editCardobaseLinkActive
		});
	}
	handleEditCardobaseLink() {
		console.log(this.props.editingCardobaseId);
		console.log(this.state.link);
		this.props.dispatch(updateCardobaseLink_action(this.props.editingCardobaseId, this.state.link));
		this.handleEditCardobaseLinkActive();
	}
}

const styles = { 
};

export default connect(state => ({
    ...state.tempCardo
    // ,...state.myCardo
}))(CardoMaker); 