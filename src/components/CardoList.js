import React from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, FlatList, RefreshControl} from 'react-native';
import {Icon, Fab} from 'native-base';
import {connect} from 'react-redux';
import {initCardoId} from '../states/tempCardo-actions';
import CardoItem from './CardoItem';

import { AsyncStorage } from 'react-native';
import {initMyCardo} from '../states/myCardo-actions';


class CardoList extends React.Component {
    static propTypes = {
        cardos: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
        // this.state = {
        //     refreshing: false
        // };
        this.handleFab = this.handleFab.bind(this);
        // this.handleRefresh = this.handleRefresh.bind(this);
    }

    componentDidMount() {
        let arr=[{cardoId: 3, cardoName: 'TTTTTT', cardobases: [{'initX': 50, 'initY': 50, 'text':'操你媽', 'editingCardobaseId': -1}]}];
        // console.log('init start');
        AsyncStorage.getAllKeys().then((data) => {
            data.forEach((key) => {
                AsyncStorage.getItem(key).then((data) => {
                    arr.push(JSON.parse(data));
                    // console.log('deb');
                    // console.log(key);
                    // console.log(JSON.parse(data));
                }).catch((err) => {
                    console.log("!!!!!!!!!!!!err");
                });
            });
        });
        console.log("didmount");
        console.log(JSON.stringify(arr));
        this.props.dispatch(initMyCardo(arr));
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
                    return <CardoItem navigation={this.props.navigation} item={item} />;
                    }
                }
            />
            <Fab position="bottomRight" onPress={this.handleFab}>
                    <Icon name='pencil' type='FontAwesome'/>
            </Fab>
            </View>
        );
    }

    handleFab(){
        const uuid = require('uuid/v4');
        let id = uuid();
        this.props.dispatch(initCardoId({cardoId: id, cardoName: '', cardobases: [], editingCardobaseId: -1}));
        this.props.navigation.navigate('CardoMaker');
    }
}

export default connect((state) => ({
    ...state.myCardo
}))(CardoList);
