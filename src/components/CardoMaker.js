import React from 'react';
import PropTypes from 'prop-types';

import {
  View, Text, Button, TextInput
} from 'react-native';

import Cardobase from './Cardobase'

import {connect} from 'react-redux';

import {
	createCardobase as createCardobase_action,
	changeCardoName as changeCardoName_action,
	clearCardo as clearTeampCardo_action
} from '../states/tempCardo-actions'

import {
	finishEditCardo as moveTempCardoToMyCardo_action
} from '../states/myCardo-actions'

class CardoMaker extends React.Component {
    static propTypes = {
    	cardoId: PropTypes.string.isRequired,
    	cardoName: PropTypes.string.isRequired,
    	cardobases: PropTypes.array.isRequired,
    	cardos: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);

		this.changeCardoName = this.changeCardoName.bind(this);
		this.createCardobase = this.createCardobase.bind(this);
		this.finishEditCardo = this.finishEditCardo.bind(this);
    }

	componentWillMount() {
	}

	render() { 
		let card = this.props.cardobases.map(p => (
				<Cardobase initState={p}/>
			));		
		let test = this.props.cardos.map(cardo => (
				<Text> {cardo.cardoId} {cardo.cardoName} {cardo.cardobases.length}</Text>
			));
		return (
			<View>
				<Button onPress={this.createCardobase} title='Create New Cardobase' />
				<Button onPress={this.finishEditCardo} title='finish' />
				<TextInput borderColor={'red'} borderWidth={1}
					onChangeText={this.changeCardoName} value={this.props.cardoName}
				/> 
				<Text>Cardo ID is {this.props.cardoId}</Text>
				{test}
				<Text>-----</Text>
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
		let newCardobase = {id: this.props.cardobases.length,initX: 100, initY: 100, text: 'AAA'};
		this.props.dispatch(createCardobase_action(newCardobase));
		console.log('create new cardobase');
	}

	finishEditCardo() {
		let newCardo = {cardoId: this.props.cardoId, cardoName: this.props.cardoName, cardobases: this.props.cardobases};
		this.props.dispatch(moveTempCardoToMyCardo_action(newCardo));
		this.props.dispatch(clearTeampCardo_action);
		console.log('finish edit cardo');
		this.props.navigation.goBack();
	}
}

const styles = { 
};

export default connect(state => ({
    ...state.tempCardo,
    ...state.myCardo
}))(CardoMaker); 