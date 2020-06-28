import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, TextInput
} from 'react-native';

import Draggable from 'react-native-draggable';

export default class Cardobase extends React.Component {
    static propTypes = {
        initState: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.state = {
			initX: 100,
			initY: 100,
			x: 100,
			y: 100,
			text: "",
			active: true,
			disabled: false
        };

        this.handleShortPress = this.handleShortPress.bind(this);
        this.handleRelease = this.handleRelease.bind(this);
    }

	componentWillMount() {
		if(this.props.initState !== undefined) {
			this.setState({
				...this.props.initState,
				x: this.props.initState.initX,
				y: this.props.initState.initY
			});
		}
	}

	render() { 
		return (
			<View>
				<Draggable x={this.state.initX} y={this.state.initY} disabled={this.state.disabled} onShortPressRelease={this.handleShortPress} onDragRelease={this.handleRelease} >
					{this.state.active ? 
						<Text>{this.state.text === "" ? "Please input something" : this.state.text}</Text> :
						<TextInput borderColor={'blue'} borderWidth={1}
							onChangeText={(text)=>{this.setState({text: text})}} value={this.state.text}
							onEndEditing={this.handleShortPress}
						/> 
					} 
				</Draggable>
			</View>
		);
	}
	
	handleShortPress() {
		this.setState({
			active: !this.state.active
		});
	}

	handleRelease(event, gestureState, bounds) {
		this.setState({
			x: bounds.left,
			y: bounds.top
		});
	}
}

const styles = { 
};