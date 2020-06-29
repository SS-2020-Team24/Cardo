import React from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, FlatList, RefreshControl} from 'react-native';
import {Icon, Fab} from 'native-base';
import {connect} from 'react-redux';
import {initCardoId} from '../states/tempCardo-actions';
import CardoItem from './CardoItem';


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
        // this.props.dispatch(listcardos());
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
        this.props.dispatch(initCardoId({cardoId: id, cardoName: '', cardobases: []}));
        this.props.navigation.navigate('CardoMaker');
    }
}

export default connect((state) => ({
    ...state.myCardo
}))(CardoList);
