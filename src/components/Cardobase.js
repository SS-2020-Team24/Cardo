import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, TextInput, Linking, Button, ScrollView
} from 'react-native';

import Draggable from 'react-native-draggable';

import {connect} from 'react-redux';

import {
	updateCardobase as updateCardobase_action,
	updataEditingCardobase as updataEditingCardobase_action
} from '../states/tempCardo-actions' 

class Cardobase extends React.Component {
    static propTypes = {
        initState: PropTypes.object.isRequired,

        editingCardobaseId: PropTypes.number.isRequired,
        editingCardobaseFontSize: PropTypes.number.isRequired,
        editingCardobaseFontColor: PropTypes.string.isRequired,
        editingCardobaseLink: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
        	id: -1,
			initX: 0,
			initY: 100,
			x: 100,
			y: 100,
			text: "",
			link: '',
			fontSize: 30,
			fontColor: 'black',

			inputState: false,
			viewMode: false,
        };

        this.handleShortPress = this.handleShortPress.bind(this);
        this.handleRelease = this.handleRelease.bind(this);
        this.handleEditToolPress = this.handleEditToolPress.bind(this);
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
			<Draggable x={this.state.initX} y={this.state.initY} onShortPressRelease={this.handleShortPress} onDragRelease={this.handleRelease} 
				minX ={this.state.viewMode ? this.state.initX : -12345} maxX={this.state.viewMode ? this.state.initX : 12345}
				minY ={this.state.viewMode ? this.state.initY : -12345} maxY={this.state.viewMode ? this.state.initY : 12345}>
				{this.state.inputState === false ? 
					<Text style={{fontSize: (this.state.id === this.props.editingCardobaseId ? this.props.editingCardobaseFontSize : this.state.fontSize), 
							color: (this.state.id === this.props.editingCardobaseId ? this.props.editingCardobaseFontColor : this.state.fontColor)}}>{this.state.text === "" ? "Please input something" : this.state.text}</Text> :
						<ScrollView keyboardShouldPersistTaps='handled'>
							<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
								<Button title='op' color='gray' onPress={this.handleEditToolPress} />
									<TextInput borderColor={'blue'} borderWidth={1}
										fontSize={this.state.id === this.props.editingCardobaseId ? this.props.editingCardobaseFontSize : this.state.fontSize}
										style={{color: (this.state.id === this.props.editingCardobaseId ? this.props.editingCardobaseFontColor : this.state.fontColor)}}
										onChangeText={(text)=>{this.setState({text: text})}} value={this.state.text}
										onEndEditing={this.handleShortPress} onBlur={this.handleShortPress}
									/> 
							</View>
						</ScrollView>
				} 
			</Draggable>
		);
	}
	
	handleShortPress() {
		console.log('deb now');
		console.log(this.state);
		if(this.state.viewMode === true) {
			if(this.state.link !== '') {
				Linking.canOpenURL(this.state.link).then(supported => {
					if (!supported) {
						console.log('fail to open ' + this.state.link);
					}
					else {
						return Linking.openURL(this.state.link);
					}
				});
				console.log('press successssssssss wtih view mode');
			}
		}
		else {
			if(this.state.id === this.props.editingCardobaseId) {
				this.setState({
					link: this.props.editingCardobaseLink,
					fontColor: this.props.editingCardobaseFontColor,
					fontSize: this.props.editingCardobaseFontSize
				});
			}
			this.setState({
				inputState: !this.state.inputState
			}, () => {
				let newCardobase = {id: this.state.id, initX: this.state.x, initY: this.state.y, text: this.state.text};
				this.props.dispatch(updateCardobase_action(newCardobase));
				console.log('cardobase update tempCardo');
			});
			console.log('press successssssssss wtih edit mode');
		}
	}

	handleRelease(event, gestureState, bounds) {
		if(this.state.viewMode === false) {
			this.setState({
				x: bounds.left,
				y: bounds.top,
			}, () => {
				let newCardobase = {id: this.state.id, initX: this.state.x, initY: this.state.y, text: this.state.text};
				this.props.dispatch(updateCardobase_action(newCardobase));
				console.log('cardobase update tempCardo');
			});
		}
		console.log('release successssssssss');
	}

	handleEditToolPress() {
		console.log('succes with ');
		console.log(this.props);
		this.props.dispatch(updataEditingCardobase_action({editingCardobaseId: this.state.id, editingCardobaseFontSize: this.state.fontSize,
        editingCardobaseFontColor: this.state.fontColor, editingCardobaseLink: this.state.link}));
	}
}

const styles = {
};

export default connect(state => ({
    ...state.tempCardo
}))(Cardobase); 