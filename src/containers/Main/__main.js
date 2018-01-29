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
import TabNavigator from 'react-native-tab-navigator';
import { Navigator } from 'react-native-deprecated-custom-components';
export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home'//默认选中主页
        }
    }
    render() {
        return (
            <TabNavigator>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'home'}
                    onPress={() => this.setState({ selectedTab: 'home' })}
                    renderIcon={() => <Image source={{ uri: 'icon_tabbar_homepage' }} style={styles.iconStyle} />}
                    renderSelectedIcon={() => <Image source={{ uri: 'icon_tabbar_homepage_selected' }} style={styles.iconStyle} />}
                    title='首页'>
                    <Navigator
                        initialRoute={{ name: '首页', component: Home }}
                        configureScene={
                            (route) => {
                                return Navigator.SceneConfigs
                            }
                        }>
                    </Navigator>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'shop'}
                    onPress={() => this.setState({ selectedTab: 'shop' })}
                    renderIcon={() => <Image source={{ uri: 'icon_tabbar_merchant_normal' }} style={styles.iconStyle} />}
                    renderSelectedIcon={() => <Image source={{ uri: 'icon_tabbar_merchant_selected' }} style={styles.iconStyle} />}
                    title='商家'>

                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'mine'}
                    onPress={() => this.setState({ selectedTab: 'mine' })}
                    renderIcon={() => <Image source={{ uri: 'icon_tabbar_mine' }} style={styles.iconStyle} />}
                    renderSelectedIcon={() => <Image source={{ uri: 'icon_tabbar_mine_selected' }} style={styles.iconStyle} />}
                    title='我的'>

                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'more'}
                    onPress={() => this.setState({ selectedTab: 'more' })}
                    renderIcon={() => <Image source={{ uri: 'icon_tabbar_misc' }} style={styles.iconStyle} />}
                    renderSelectedIcon={() => <Image source={{ uri: 'icon_tabbar_misc_selected' }} style={styles.iconStyle} />}
                    title='更多'>

                </TabNavigator.Item>
            </TabNavigator>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    iconStyle: {
        width: Platform.OS === 'ios' ? 30 : 25,
        height: Platform.OS === 'ios' ? 30 : 25
    }
})