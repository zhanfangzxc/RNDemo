import React, {Component} from 'react';
import {
    View,
    WebView,
    Text,
    ProgressBarAndroid,
    StyleSheet,
    Dimensions, Image,
    TouchableOpacity,hahah
    BackHandler,
    Platform,
} from 'react-native';
import url from "../../constants/url";
import Toast from "react-native-root-toast";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default class NewsDetail extends Component {
    static navigationOptions = {
        title: '新闻详情',
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            css: '',
            detail: '',
            backButtonEnabled: true,
        }
    }

    componentDidMount() {
        var fetchUrl = url.NEWS_DETAIL + this.props.navigation.state.params.id;
        fetch(fetchUrl)
            .then((response) => response.json())
            .then((responseJson) => {
                fetch('http://daily.zhihu.com/css/share.css?v=5956a')
                    .then((responseCSS) => {
                        let metaData = '<>',
                            cssLink = '<style>' + responseCSS._bodyInit + '</style>',
                            imgLink = '<div class="img-wrap"><h1 class="headline-title">' + responseJson.title + '</h1><span class="img-source"></span><img src="' + responseJson.image + '" alt=""><div class="img-mask"></div></div>';
                        this.setState({
                            loading: false,
                            detail: cssLink + responseJson.body.replace(/<div class=\"img-place-holder\"><\/div>/, imgLink),
                            css: responseJson.css[0]
                        })
                    })
            });
    }

    render() {

        if (this.state.loading) {
            return (
                <View style={styles.empty}>
                    <ProgressBarAndroid/>
                    <Text>loading...</Text>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <WebView bounces={false}
                         scalesPageToFit={true}
                         domStorageEnabled={true}
                         javaScriptEnabled={true}
                    //如果不加上baseUrl:'' WebView加载html就会出现乱码
                         source={{baseUrl: '', html: this.state.detail}}
                         style={{width: width, height: height}}>

                </WebView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});