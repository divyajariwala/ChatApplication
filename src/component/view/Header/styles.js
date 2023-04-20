import {StyleSheet} from 'react-native';
import {Color, ThemeUtils} from 'src/utils';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: ThemeUtils.NAV_HEIGHT,
        width: '100%',
        backgroundColor: Color.HOME_COLOR,
    },
    title: {
        textAlign: 'center',
        color: Color.WHITE,
    },
    titleContainer: {
        width: '60%',
        justifyContent: 'center',
    },
    rightIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '20%',
        justifyContent: 'flex-end',
        marginLeft: 10,
    },
    iconStyle: {
        paddingHorizontal: ThemeUtils.relativeRealWidth(4),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    homeIcon: {
        width: '20%',
        paddingHorizontal: ThemeUtils.relativeRealWidth(4),
        justifyContent: 'center',
    },
    imageContainer: {height: 45, width: 45},
});
