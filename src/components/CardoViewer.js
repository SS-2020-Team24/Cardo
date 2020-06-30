import React from 'react';
import PropTypes from 'prop-types';

import {
  View, Text, ImageBackground, Image
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
				<Cardobase initState={{...p, viewMode: true}}/>
			));		
		return (
			<View style={{flex: 1}}>
            <ImageBackground  source={require('../images/background.jpg')} style={styles.image}>
				{card}
            </ImageBackground>
			</View>
		);
    }
}

const styles = {
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    }
};

export default connect(state => ({
    ...state.tempCardo
}))(CardoViewer);

