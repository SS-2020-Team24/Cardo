import React from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, FlatList, RefreshControl} from 'react-native';
import {Icon, Fab} from 'native-base';
import {connect} from 'react-redux';
import {initCardoId} from '../states/tempCardo-actions';
import OthersCardoItem from './OthersCardoItem';

import { AsyncStorage } from 'react-native';
import {initOthersCardo} from '../states/othersCardo-action';


class OthersCardoList extends React.Component {
    static propTypes = {
        cardos: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let arr=[{cardoId: 3, cardoName: 'TTTTTT', cardobases: [{'initX': 50, 'initY': 50, 'text':'操你媽', 'editingCardobaseId': -1}]}];
        // console.log('init start');
        // AsyncStorage.getAllKeys().then((data) => {
        //     data.forEach((key) => {
        //         AsyncStorage.getItem(key).then((data) => {
        //             arr.push(JSON.parse(data));
        //             // console.log('deb');
        //             // console.log(key);
        //             // console.log(JSON.parse(data));
        //         }).catch((err) => {
        //             console.log("!!!!!!!!!!!!err");
        //         });
        //     });
        // });
        AsyncStorage.getItem("OthersCardo").then((data) => {
            // console.log(data);
            let x = {cardos: [{cardoId: 3, cardoName: 'TTTTTT', cardobases: [{'initX': 50, 'initY': 50, 'text':'操你媽', 'editingCardobaseId': -1}]}]};
            if(data === null){
                console.log(x);
                this.props.dispatch(initOthersCardo(x));
            }
            else{
                this.props.dispatch(initOthersCardo(JSON.parse(data)));
            }
        });
        // console.log("didmount");
        // console.log(JSON.stringify(arr));
        // this.props.dispatch(initMyCardo(arr));
    }

    render() {
        const cardos = this.props.cardos;

        // console.log('render');
        // console.log(this.props.cardos);
        return (
            <View style={{flex: 1}}>
            <FlatList
                style={{marginTop:10}}
                data={cardos}
                renderItem={({item}) => {
                    return <OthersCardoItem navigation={this.props.navigation} item={item} />;
                    }
                }
            />
            </View>
        );
    }
}

export default connect((state) => ({
    ...state.othersCardo
}))(OthersCardoList);
