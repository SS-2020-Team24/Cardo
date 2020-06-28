import React from 'react';
import PropTypes from 'prop-types';
// import {
//     View,
//     FlatList, RefreshControl
// } from 'react-native';
import {
SafeAreaView,
StyleSheet,
ScrollView,
View,
Text,
StatusBar,
FlatList
} from 'react-native';
import {Icon, Fab} from 'native-base';
import InfiniteScrollView from 'react-native-infinite-scroll-view';

import CardItem from './CardItem';

import {connect} from 'react-redux';

class CardList extends React.Component {
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
    }

    render() {
        return (
            <View style={{flex: 1}}>
            <FlatList
                style={{marginTop:10}}
                data={this.state.FlatListItems}
                renderItem={({item}) => {
                    return <CardItem navigation={this.props.navigation} item={item} />;
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
        this.props.navigation.navigate('QRcodeScreen', {name:"abc"});
    }
    // handleRefresh() {
    //     const {dispatch, searchText} = this.props;
    //     dispatch(listPosts(searchText));
    // }

    // handleLoadMore() {
    //     const {listingMorePosts, dispatch, posts, searchText} = this.props;
    //     const start = posts[posts.length - 1].id;
    //     if (listingMorePosts !== start)
    //         dispatch(listMorePosts(searchText, start));
    // }
}

export default connect((state) => ({
    // searchText: state.search.searchText,
    // listingPosts: state.post.listingPosts,
    // listingMorePosts: state.post.listingMorePosts,
    // posts: state.post.posts,
    // hasMorePosts: state.post.hasMore
}))(CardList);
