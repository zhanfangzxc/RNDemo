import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    ListView,
    TouchableOpacity,
    Dimensions, ProgressBarAndroid,
    SectionList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import url from "../../constants/url";
import {getCurrentDate} from "../../utils/getDate";
import Toast from 'react-native-root-toast';
import NavigationUtils from "../../utils/NavigationUtils";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default class Shop extends Component {
    static navigationOptions = {
        title: '知乎日报',
        tabBarIcon: ({focused, tintColor}) => (
            <Icon name='md-list-box' size={24} color={tintColor}/>
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
        fetch(url.DAILY_NEWS)
            .then(res => {
                if (res.status === 200) {
                    let dataList = JSON.parse(res._bodyInit);
                    let stories = dataList.stories;
                    let top_stories = dataList.top_stories;
                    let data = top_stories.concat(stories);
                    this.setState({
                        loading: false,
                        data: data,
                        dataSource: this.state.dataSource.cloneWithRows(data)
                    });
                }
            }).catch(err => {
            Toast.show(JSON.stringify(err), Toast.SHORT);
        });
    }

    _renderRow(row) {
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.item}
                onPress={this.gotoDetail.bind(this, row.id)}>
                <View style={{flex: 2, alignItems: 'flex-start', marginRight: 10}}>
                    <Image style={styles.image} resizeMode='stretch'
                           source={row.image ? {uri: row.image} : {uri: row.images[0]}}/>
                </View>
                <Text style={styles.title} numberOfLines={3}>{row.title}</Text>
            </TouchableOpacity>
        )
    }

    gotoDetail(id) {
        this.props.navigation.navigate('NEWS_DETAIL', {'id': id});
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
    image: {
        width: 80,
        height: 80,
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        flex:7,
        color: '#333333',
        fontSize: 16,
        marginLeft:10,
        lineHeight: 26,
    },
    item: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#fff',
        borderRadius: 4,
        borderWidth: 1,
        marginHorizontal: 10,
        marginVertical: 6,
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'row',
    }
})