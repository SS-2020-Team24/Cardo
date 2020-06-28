import React from 'react';
import PropTypes from 'prop-types';

import {
  View, Text
} from 'react-native';

import Cardobase from './Cardobase'

import {connect} from 'react-redux';

class CardoViewer extends React.Component {
    static propTypes = {
        cardoName: PropTypes.string.isRequired,
    	cardobases: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
		let card = this.props.cardobases.map(p => (
				<Cardobase initState={{...p, disabled: true}}/>
			));		
		return (
			<View>
				<Text>View My Cardo</Text>
                <Text>{this.props.cardoName}</Text>
				{card}
			</View>
		);
    }
}

const styles = {
};

export default connect(state => ({
    ...state.tempCardo
}))(CardoViewer);

