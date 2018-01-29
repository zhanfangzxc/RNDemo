import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    TouchableOpacity,
    Dimensions, ProgressBarAndroid
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import GridView from 'react-native-super-grid';
import url from '../../constants/url';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
export default class More extends Component {
    static navigationOptions = {
        title: '精品歌单',
        tabBarIcon: ({focused, tintColor}) => (
            <Icon name='md-cube' size={24} color={tintColor}/>
        )
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: []
        }
    }

    componentDidMount() {
        let fetchUrl = url.MUSIC_BASE_URL + url.AUDIO_URL;
        fetch(fetchUrl)
            .then(res => {
                if (res.status === 200) {
                    let data = JSON.parse(res._bodyInit).playlists;
                    this.setState({
                        loading: false,
                        data: data
                    });
                }
            }).catch(err => {
            alert(JSON.stringify(err));
        })
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
                <GridView renderItem={this._renderItem.bind(this)} items={this.state.data}/>
            </View>
        );
    }

    gotoDetail(id) {
        this.props.navigation.navigate('MUSIC_LIST', {'id': id});

    }

    _renderItem(item) {
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.item}
                onPress={this.gotoDetail.bind(this, item.id)}>
                <View>
                    <Image style={{width: 145, height: 145, marginBottom: 10}} source={{uri: item.coverImgUrl}}/>
                    <Text numberOfLines={2}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ddd',
    },
    iconStyle: {
        width: Platform.OS === 'ios' ? 30 : 25,
        height: Platform.OS === 'ios' ? 30 : 25
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    item: {
        backgroundColor: '#fff',
        flex: 1,
        height:220,
        borderRadius: 4,
        borderStyle: 'solid',
        borderColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'column',
        flexWrap: 'wrap'
    }
})