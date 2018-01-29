import React from 'react';
import {
    Dimensions,
    Animated
} from 'react-native';
import store from 'react-native-simple-store';
import NavigationUtils from './utils/NavigationUtils';

const splashImg = require('./imgs/img/splash.png');
const maxHeight = Dimensions.get('window').height;
const maxWidth = Dimensions.get('window').width;

export default class Splash extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            bounceValue: new Animated.Value(1)
        };
    }

    componentDidMount() {
        const {navigate} = this.props.navigation;
        Animated.timing(this.state.bounceValue, {
            toValue: 1.2,
            duration: 1000
        }).start();
        this.timer = setTimeout(() => {
            NavigationUtils.reset(this.props.navigation, 'Home');
        }, 2000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        return (
            <Animated.Image
                style={{
                    width: maxWidth,
                    height: maxHeight,
                    transform: [{scale: this.state.bounceValue}]
                }}
                source={splashImg}/>
        )
    }
}