import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
} from 'react-native';
import Home from '../Home/home';
import More from '../Music/music';
import Mine from '../Video/video';
import Shop from '../News/news';
import Splash from '../../splash';
import NewsDetail from '../News/NewsDetail';
import VideoDetail from '../Video/VideoDetail';
import MusicList from '../Music/MusicList';
import PlayerScene from '../Music/PlayerScene';
import {StackNavigator, TabNavigator} from 'react-navigation';

const TabContainer = TabNavigator({
    // Home: {screen: Home},
    Shop: {screen: Shop},
    Mine: {screen: Mine},
    More: {screen: More},
}, {
    lazy: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
        activeTintColor: '#ed5100',
        inactiveTintColor: '#999999',
        showIcon: true,
        style: {
            backgroundColor: '#fff'
        },
        indicatorStyle: {
            opacity: 0
        },
        tabStyle: {
            padding: 0
        }
    }
});

const Main = StackNavigator({
    Splash: {screen: Splash},
    Home: {
        screen: TabContainer,
        navigationOptions: {
            headerLeft: null
        }
    },
    NEWS_DETAIL: {
        screen: NewsDetail,
        navigationOptions: {
            headerText: '日报详情'
        }
    },
    VIDEO_DETAIL: {
        screen: VideoDetail
    },
    MUSIC_LIST: {
        screen: MusicList
    },
    PLAYER_SCENE: {
        screen: PlayerScene
    },
}, {
    headerMode: 'screen',
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#3e9ce9'
        },
        headerTitleStyle: {
            color: '#fff',
            fontSize: 20
        },
        headerTintColor: '#fff'
    }
});

export default Main;