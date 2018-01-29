import React, {Component} from 'react';
import {Dimensions, View} from 'react-native';
import VideoPlayer from './VideoPlayer';

export default class VideoDetail extends Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <VideoPlayer
                    source={{uri: this.props.navigation.state.params.url}}
                    onError={() => {
                        alert('加载失败');
                    }}
                    onBack={() => {
                        this.props.navigation.goBack()
                    }}
                />
            </View>
        )
    }
}
