'use strict';

import {Dimensions} from 'react-native';

const deviceHeightDp = Dimensions.get('window').height;

const uiHeightPx = 592;

export default function px2dp(uiElementPx) {
    return uiElementPx * deviceHeightDp / uiHeightPx;
}