import {StyleSheet} from 'react-native';
import {ThemeUtils, Color} from 'src/utils';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: ThemeUtils.relativeWidth(10),
        justifyContent: 'center',
        backgroundColor: Color.HOME_COLOR,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: ThemeUtils.relativeWidth(10),
    },
});
