import React from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, FlatList} from 'react-native';
import {Icon, Fab} from 'native-base';
import {connect} from 'react-redux';

import CardoItem from './CardoItem';


class CardoList extends React.Component {
    static propTypes = {
    };

    constructor(props) {
        super(props);
        this.state = {
        FlatListItems: [{name:'Patrick star'},{name:'Gallileo'},{name:'Einsten'},{name:'Peterson'},{name:'Schwarzenneger'},{name:'Dostoyevsky'},{name:'Dostoyevsky'},{name:'Dostoyevsky'},{name:'Dostoyevsky'},{name:'Dostoyevsky'},{name:'Dostoyevsky'},{name:'Dostoyevsky'},{name:'Dostoyevsky'},{name:'Dostoyevsky'},{name:'Dostoyevsky'},{name:'Dostoyevsky'},{name:'Dostoyevsky'},{name:'Dostoyevsky'},{name:'Dostoyevsky'}],
        test: {
            name:'hey'
        }
        };
        this.handleFab = this.handleFab.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(listcardos());
    }

    render() {
        const {cardos} = this.props;
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
        console.log('handleFab');
        this.props.navigation.navigate('CardoMaker', {name:"abc"});
    }
    // handleRefresh() {
    //     const {dispatch, searchText} = this.props;
    //     dispatch(listPosts(searchText));
    // }
}

export default connect((state) => ({
    cardos: state.myCardo.cardos
}))(CardoList);