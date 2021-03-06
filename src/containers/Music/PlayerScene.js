import React, {PureComponent} from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Animated,
    Easing,
    TouchableWithoutFeedback,
    Text,
    ScrollView, ImageBackground
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from 'react-native-slider';
import {TextTool, Separator, ModalMenu, MenuRow} from '../../components';
import {screen, color} from '../../utils';
import url from '../../constants/url';
import Video from "react-native-video";
import * as tools from "../../utils/tools";

const {Normal, Tip, H3} = TextTool;

export default class PlayerScene extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        header: <View style={{width: 0, height: 0}}/>,
    });

    constructor() {
        super();
        this.state = {
            detail: {},
            lyric: '',
            lyricArr: [],
            currentLrc: '',     // 当前歌词
            showLyic: false,
            lyricScroll: 0,// 初始歌词滚动条位置
            playing: true,
            currentTime: '',
            playTime: '',
            sliderProgress: 0,
            playUrl: '',
            duration: 0,
            ff: 0,
        };
        this.animatedValue = new Animated.Value(0);
        this.animatedTop = new Animated.Value(0);
    }

    componentDidMount() {
        let currentPlayId = this.props.navigation.state.params.id;
        this.songDetail(currentPlayId);
        this.songLyric(currentPlayId);
        this.playUrl(currentPlayId);
    }

    componentWillReceiveProps(nextProps) {
        const lyric = this.state.lyric;
        if (this.state.lyric) {    // 匹配当前歌词，并且逐行上滑
            console.log(lyric.match(new RegExp(`\\[${this.state.currentTime}\\.\\d+\\].*`, 'g')));
            const currentLrc = lyric.match(new RegExp(`\\[${this.state.currentTime}\\.\\d+\\].*`, 'g'));
            if (currentLrc) {
                this.setState({currentLrc: currentLrc[0]});
                this.setState({
                    lyricScroll: this.state.lyricScroll += 20,
                }, () => this.lyricScroll && this.lyricScroll.scrollTo({
                    x: 0,
                    y: lyricArr.findIndex(v => v === currentLrc[0]) * 20,
                    animated: true
                }))
            }
        }
        this.player.seek(this.state.ff);
    }

    circling = () => {
        this.animatedValue.setValue(0);
        Animated.timing(this.animatedValue, {
            toValue: 1,
            duration: 12000,
            easing: Easing.linear
        }).start(() => this.circling());
    };
    topAnimate = (start = 0, end = 1) => {
        this.animatedTop.setValue(start);
        Animated.timing(this.animatedTop, {
            toValue: end,
            duration: 150,
            easing: Easing.linear
        }).start();
    };
    goBack = () => {
        const backAction = NavigationActions.back();
        console.log(backAction);
        this.props.navigation.goBack();
    };
    test = () => {
        this.props.dispatch(setPlayId('186003'))
    };
    songDetail = id => {
        fetch(url.MUSIC_BASE_URL + url.SONG_DETAIL + id)
            .then(res => {
                if (res.status === 200) {
                    let detail = JSON.parse(res._bodyInit).songs[0];
                    this.setState({
                        detail: detail,
                    });
                    this.props.navigation.setParams({name: detail.name, artists: detail.ar.map(v => v.name).join('、')});
                    this.circling();    // 旋转图片
                }
            }).catch(err => {
            alert(err);
        });
    };
    songLyric = id => {
        fetch(url.MUSIC_BASE_URL + url.SONG_LYRIC + id)
            .then(res => {
                if (res.status === 200) {
                    const lyric = JSON.parse(res._bodyInit).lrc.lyric;
                    const lyricArr = lyric.split(/\n/);
                    this.setState({
                        lyric,
                        lyricArr
                    });
                }
            }).catch(err => {
            alert(err);
        });
    };
    playUrl = id => {
        fetch(url.MUSIC_BASE_URL + url.PLAY_URL + id)
            .then(res => {
                if (res.status === 200) {
                    const playUrl = JSON.parse(res._bodyInit).data[0].url;
                    this.setState({
                        playUrl: playUrl
                    });
                }
            }).catch(err => {
            alert(err);
        });
    }
    sliderChange = value => {
        const duration = this.state.duration;
        this.setState({
            sliderProgress: value,
            ff: duration * value
        })
        // this.player.seek(this.state.ff);
    };
    showLyric = () => {
        this.setState({
            showLyic: !this.state.showLyic
        })
    };
    playing = () => {
        this.setState({
            playing: !this.state.playing
        });
    };
    loadStart = () => {
    };
    setDuration = (obj) => {
        this.setState({
            duration: obj.duration,
            playTime: tools.transTime(obj.duration),
            playing: true,
        })
    };
    setTime = (time) => {
        const duration = this.state.duration;
        this.setState({
            currentTime: tools.transTime(time.currentTime),
            sliderProgress: time.currentTime / duration
        });
        const lyric = this.state.lyric;
        if (this.state.lyric) {    // 匹配当前歌词，并且逐行上滑
            console.log(lyric.match(new RegExp(`\\[${this.state.currentTime}\\.\\d+\\].*`, 'g')));
            const currentLrc = lyric.match(new RegExp(`\\[${this.state.currentTime}\\.\\d+\\].*`, 'g'));
            const lyricArr = this.state.lyricArr;
            if (currentLrc) {
                this.setState({
                    currentLrc: currentLrc[0],
                    lyricScroll: this.state.lyricScroll += 20,
                });
                // this.lyricScroll.scrollTo({
                //     x: 0,
                //     y: lyricArr.findIndex(v => v === currentLrc[0]) * 20,
                //     animated: true
                // });
                // this.setState({currentLrc: currentLrc[0]});
                // this.setState({
                //     lyricScroll: this.state.lyricScroll += 20,
                // }, () => this.lyricScroll && this.lyricScroll.scrollTo({
                //     x: 0,
                //     y: lyricArr.findIndex(v => v === currentLrc[0]) * 20,
                //     animated: true
                // }))
            }
        }
    };
    onEnd = () => {
    };
    videoError = () => {
    };
    onBuffer = () => {
    };
    onTimedMetadata = () => {
    };

    render() {
        const interpolatedAnimation = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });
        const topAnimation = this.animatedTop.interpolate({
            inputRange: [0, 1],
            outputRange: [screen.height, 0]
        });
        const modalMenus = [
            {leftIcon: 'folder-plus', title: '收藏到歌单'},
            {leftIcon: 'music-note', title: '相似推荐'},
            {leftIcon: 'account', title: '歌手：周杰伦'},
            {leftIcon: 'album', title: '专辑：JAY'},
            {leftIcon: 'link-variant', title: '来源：JAY'},
            {leftIcon: 'music-circle', title: '音质', subTitle: '开通会员畅想更高音质'},
            {leftIcon: 'clock', title: '定时关闭'},
            {leftIcon: 'car', title: '打开驾驶模式'},
        ];
        // console.log(this.props.currentPlay);
        const {detail, currentLrc, showLyic, lyricArr} = this.state;
        const {params} = this.props.navigation.state;
        // const {currentPlay} = this.props;
        return (
            <View style={styles.container}>
                <Image
                    style={{width: screen.width, height: screen.height, position: 'absolute', zIndex: 1, opacity: 0.8}}
                    blurRadius={8}
                    source={{uri: this.state.detail.al && this.state.detail.al.picUrl + '?param=200y200'}}/>
                {/*<View style={{width: screen.width, height: screen.height, position: 'absolute', zIndex: 2, opacity: 0.3, backgroundColor: '#9e9e9e'}} />*/}
                <View style={{zIndex: 5, flex: 1}}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={this.goBack}>
                            <Icon name="ios-arrow-back-outline" size={25} color={color.white}/>
                        </TouchableOpacity>
                        <View style={{justifyContent: 'space-between', alignItems: 'center'}}>
                            <Normal color={color.white}>{params.name}</Normal>
                            <Tip color={color.white} style={{fontSize: 9}}>{params.artists}</Tip>
                        </View>
                        <TouchableOpacity onPress={this.test}>
                            <Icon name="ios-redo-outline" size={25} color={color.white}/>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.cdContainer} onPress={this.showLyric}>
                        {
                            showLyic ? (
                                <View style={styles.cdContainer}>
                                    <ScrollView style={{width: screen.width}} contentContainerStyle={{
                                        alignItems: 'center',
                                        paddingTop: '30%',
                                        paddingBottom: '30%'
                                    }} ref={lyricScroll => this.lyricScroll = lyricScroll}
                                                contentOffset={{x: 0, y: this.state.lyricScroll}}>
                                        {
                                            lyricArr.map((v, i) => (
                                                <Normal color={v === currentLrc ? color.theme : color.white} key={i}
                                                        style={{
                                                            paddingTop: 5,
                                                            paddingBottom: 5
                                                        }}>{v.replace(/\[.*\]/g, '')}</Normal>
                                            ))
                                        }
                                    </ScrollView>

                                </View>
                            ) : (
                                <View style={styles.cdContainer}>
                                    <View style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 34,
                                        width: screen.width,
                                        alignItems: 'center',
                                        zIndex: 18
                                    }}>
                                        <Image source={require('../../imgs/img/needle-ip6.png')}
                                               style={{width: 100, height: 140}}/>
                                    </View>
                                    <ImageBackground source={require('../../imgs/img/disc-ip6.png')} style={{
                                        width: screen.width - 40,
                                        height: screen.width - 40,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Animated.Image
                                            source={{uri: detail.al && detail.al.picUrl + '?param=200y200'}}
                                            style={[{
                                                width: screen.width - 152,
                                                height: screen.width - 152,
                                                borderRadius: (screen.width - 152) / 2
                                            }, {
                                                transform: [
                                                    {rotate: interpolatedAnimation},
                                                ]
                                            }]}
                                        />
                                    </ImageBackground>
                                    <Video
                                        source={{uri: this.state.playUrl}}   // Can be a URL or a local file.
                                        ref={(ref) => {
                                            this.player = ref
                                        }}                                      // Store reference
                                        rate={1.0}                              // 0 is paused, 1 is normal.
                                        volume={1.0}                            // 0 is muted, 1 is normal.
                                        muted={false}                           // Mutes the audio entirely.
                                        paused={!this.state.playing}                          // Pauses playback entirely.
                                        resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
                                        currentTime={this.state.ff}
                                        repeat={true}                           // Repeat forever.
                                        playInBackground               // Audio continues to play when app entering background.
                                        playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
                                        progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
                                        ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
                                        onLoadStart={this.loadStart}            // Callback when video starts to load
                                        onLoad={this.setDuration}               // Callback when video loads
                                        onProgress={this.setTime}               // Callback every ~250ms with currentTime
                                        onEnd={this.onEnd}                      // Callback when playback finishes
                                        onError={this.videoError}               // Callback when video cannot be loaded
                                        onBuffer={this.onBuffer}                // Callback when remote video is buffering
                                        onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
                                        style={{width: 50, height: 50}}
                                    />
                                </View>
                            )
                        }
                    </TouchableOpacity>
                    <View style={styles.topBtn}>
                        <TouchableOpacity
                            onPress={() => this.lyricScroll.scrollTo({x: 0, y: 10, animated: true})}>
                            <Icon name="ios-heart-outline" size={25} color={color.white}/>
                        </TouchableOpacity>
                        <Icon name="ios-cloud-download-outline" size={25} color={color.white}/>
                        <Icon name="ios-chatbubbles-outline" size={25} color={color.white}/>
                        <TouchableOpacity onPress={() => this.modalMenu.topAnimate(0, 1)}><Icon
                            name="md-more" size={25}
                            color={color.white}/></TouchableOpacity>
                    </View>
                    <View style={styles.sliderBtn}>
                        <Tip style={{width: 35}} color={color.white}>{this.state.currentTime}</Tip>
                        <Slider
                            maximumTrackTintColor={color.white}
                            minimumTrackTintColor={color.theme}
                            thumbStyle={styles.thumb}
                            trackStyle={{height: 2}}
                            style={{width: screen.width - 100}}
                            value={this.state.sliderProgress}
                            onValueChange={value => this.sliderChange(value)}
                        />
                        <Tip style={{width: 35}} color="#ffffff">{this.state.playTime}</Tip>
                    </View>
                    <View style={styles.footerBtn}>
                        <Icon name="ios-repeat-outline" size={30} color={color.white}/>
                        <Icon name="ios-skip-backward-outline" size={30} color={color.white}/>
                        {
                            this.state.playing ? (
                                    <TouchableOpacity onPress={() => this.playing(false)}>
                                        <Icon name="ios-pause-outline" size={30} color={color.white}/>
                                    </TouchableOpacity>
                                ) :
                                (
                                    <TouchableOpacity onPress={() => this.playing(true)}>
                                        <Icon name="ios-play-outline" size={30} color={color.white}/>
                                    </TouchableOpacity>
                                )
                        }
                        <Icon name="ios-skip-forward-outline" size={30} color={color.white}/>
                        <Icon name="ios-list-outline" size={30} color={color.white}/>
                    </View>
                </View>
                <ModalMenu ref={modalMenu => this.modalMenu = modalMenu}>
                    <View style={{height: 40, paddingLeft: 8, justifyContent: 'center'}}>
                        <Text style={{fontSize: 12}}>歌曲：测试</Text>
                    </View>
                    <Separator/>
                    <ScrollView>
                        {
                            modalMenus.map((v, i) => (
                                <MenuRow key={i} leftIcon={v.leftIcon} title={v.title} subTitle={v.subTitle}/>
                            ))
                        }
                        <MenuRow/>
                    </ScrollView>
                </ModalMenu>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    headerContainer: {
        height: 50,
        width: screen.width,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: screen.onePixel,
        borderColor: 'rgba(245, 245, 245, 0.21)'
    },
    cdContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topBtn: {
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    sliderBtn: {
        height: 40,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    thumb: {
        width: 20,
        height: 20,
        backgroundColor: color.theme,
        borderColor: color.white,
        borderWidth: 7,
        borderRadius: 10,
    },
    footerBtn: {
        height: 50,
        width: screen.width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    }
});

