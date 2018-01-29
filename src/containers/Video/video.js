import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    ListView, ProgressBarAndroid, Dimensions, TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import url from '../../constants/url';

const width = Dimensions.get('window').width;
export default class Mine extends Component {
    static navigationOptions = {
        title: '视频列表',
        tabBarIcon: ({focused, tintColor}) => (
            <Icon name='md-cube' size={24} color={tintColor}/>
        )
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: [],
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        }
    }

    componentDidMount() {
        let fetchUrl = url.BASE_URL + url.VIDEO_LIST;
        fetch(fetchUrl)
            .then(res => {
                if (res.status === 200) {
                    let data = JSON.parse(res._bodyInit).data;
                    this.setState({
                        loading: false,
                        data: data,
                        dataSource: this.state.dataSource.cloneWithRows(data)
                    });
                }
            }).catch(err => {
            alert(JSON.stringify(err));
        })
    }

    //绘制列表
    _renderRow(row) {
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.item}
                onPress={this.gotoDetail.bind(this, row.mp4_url, row.cover)}>
                <Image style={styles.image} resizeMode='stretch'
                       source={{uri: row.cover}}/>
                <Text style={styles.title} numberOfLines={3}>{row.title}</Text>
            </TouchableOpacity>
        )
    }

    gotoDetail(url, cover) {
        this.props.navigation.navigate('VIDEO_DETAIL', {'url': url, 'cover': cover});
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
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(this)}
                    //初始化首页显示的个数
                    initialListSize={4}
                    //控制垂直滚动条是否可见
                    showsVerticalScrollIndicator={false}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    iconStyle: {
        width: Platform.OS === 'ios' ? 30 : 25,
        height: Platform.OS === 'ios' ? 30 : 25
    },
    container: {
        backgroundColor: '#ddd',
    },
    image: {
        width: width - 40,
        height: 190,
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        marginTop: 10,
        color: '#333333',
        fontSize: 16
    },
    item: {
        backgroundColor: '#fff',
        flex: 1,
        borderRadius: 4,
        borderStyle: 'solid',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginHorizontal: 10,
        marginVertical: 6,
        borderColor: '#ccc',
        flexDirection: 'column',
        flexWrap: 'wrap'
    }
})