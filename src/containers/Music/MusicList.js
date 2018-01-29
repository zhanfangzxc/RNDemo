import React, {Component} from 'react';
import {
    View,
    Text,
    ListView,
    TouchableOpacity,
    Image, ProgressBarAndroid,
    StyleSheet,
    Dimensions
} from 'react-native';
import url from '../../constants/url';
import screen from '../../utils'

const width = Dimensions.get('window').width;

export default class MusicList extends Component {

    static navigationOptions = {
        title: '歌曲列表'
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
        let fetchUrl = url.MUSIC_BASE_URL + url.MUSIC_URL + this.props.navigation.state.params.id;
        fetch(fetchUrl)
            .then(res => {
                if (res.status === 200) {
                    let data = JSON.parse(res._bodyInit).playlist.tracks;
                    this.setState({
                        loading: false,
                        data: data,
                        dataSource: this.state.dataSource.cloneWithRows(data)
                    })
                }
            }).catch(err => {
            alert(JSON.stringify(err))
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

    gotoDetail(id) {
        this.props.navigation.navigate('PLAYER_SCENE', {'id': id});
    }

    _renderRow(row) {
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={this.gotoDetail.bind(this, row.id)}>
                <Image style={styles.image} resizeMode='stretch'
                       source={{uri: row.al.picUrl}}/>
                <View style={{flex:1,flexDirection:'column'}}>
                    <Text style={styles.title} numberOfLines={3}>{row.name}</Text>
                    <Text style={styles.title} numberOfLines={3}>{row.ar[0].name}</Text>
                    <Text style={styles.title} numberOfLines={3}>{row.al.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        backgroundColor: '#ddd',
    },
    image: {
        width: 60,
        height: 60,
    },
    title: {
        flex:7,
        color: '#333333',
        fontSize: 12,
        marginLeft: 10,
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