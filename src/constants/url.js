'use strict';

export default {
    daily: 'http://gank.io/api/day/',  //eg. http://gank.io/api/day/2015/08/06
    random: 'http://gank.io/api/random/data/',  // http://gank.io/api/random/data/Android/20
    category: 'http://gank.io/api/data/', // http://gank.io/api/data/Android/10/1
    fixedDate: 'http://gank.io/api/history/content/day/', // http://gank.io/api/history/content/day/2016/05/11

    BASE_URL: "http://172.16.7.71:3000/",
    // BASE_URL: "http://192.168.0.107:3000/",
    MUSIC_BASE_URL: 'http://172.16.7.71:4000/',
    // MUSIC_BASE_URL: 'http://192.168.0.107:4000/',
    DAILY_NEWS: "https://news-at.zhihu.com/api/4/news/latest", //每日新闻
    NEWS_DETAIL: "https://news-at.zhihu.com/api/4/news/", // 新闻详情
    VIDEO_LIST: 'video_list?type=0&page=10', //视频列表
    AUDIO_URL: 'top/playlist/highquality',//网易精品歌单
    MUSIC_URL: 'playlist/detail?id=',//311692545 歌单详情
    // 歌曲详情
    SONG_DETAIL: 'song/detail?ids=',
    // 歌词
    SONG_LYRIC: 'lyric?id=',
    PLAY_URL: 'music/url?id=',
}