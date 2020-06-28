import React from 'react';
import PropTypes from 'prop-types';

import {
  View, Text, Button
} from 'react-native';

import Cardobase from './Cardobase'

import {connect} from 'react-redux';

import {
	createCardobase as createCardobase_action, 
} from '../states/tempCardo-actions'

class CardoMaker extends React.Component {
    static propTypes = {
    	cardobases: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);

		this.createCardobase = this.createCardobase.bind(this);
    }

	componentWillMount() {
	}

	render() { 
		let card = this.props.cardobases.map(p => (
				<Cardobase initState={p}/>
			));		
		return (
			<View>
				<Button onPress={this.createCardobase} title='Create New Cardobase' />
				{card}
			</View>
		);
	}

	createCardobase() {
		let newCardobase = {x: 100, y: 100, text: 'AAA'};
		this.props.dispatch(createCardobase_action(newCardobase));
		console.log('create new cardobase');
	}
}

const styles = { 
};

export default connect(state => ({
    ...state.tempCardo
}))(CardoMaker); 