import {StyleSheet} from 'react-native';
import {ThemeUtils, Color} from 'src/utils';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.HOME_COLOR,
        paddingHorizontal: ThemeUtils.relativeWidth(5),
    },
    listContainer: {
        paddingHorizontal: ThemeUtils.relativeWidth(5),
        paddingVertical: ThemeUtils.relativeHeight(1.5),
        backgroundColor: Color.WHITE,
        borderRadius: 10,
        marginTop: ThemeUtils.relativeHeight(3),
        flexDirection: 'row',
    },
    subContainer: {
        width: '20%',
        justifyContent: 'center',
    },
    metaInfo: {
        width: '70%',
        justifyContent: 'center',
    },
    imageContainer: {height: 45, width: 45},
    emptycontainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
});
