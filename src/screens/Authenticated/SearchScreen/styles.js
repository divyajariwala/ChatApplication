import {StyleSheet} from 'react-native';
import {ThemeUtils, Color} from 'src/utils';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.HOME_COLOR,
        paddingHorizontal: ThemeUtils.relativeWidth(5),
    },
    searchBox: {
        backgroundColor: Color.WHITE,
        paddingHorizontal: ThemeUtils.relativeWidth(5),
        paddingVertical: ThemeUtils.relativeHeight(1.5),
        borderColor: Color.PRIMARY_DARK,
        borderWidth: 0.2,
        borderRadius: 10,
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
        width: '30%',
    },
    metaInfo: {
        width: '60%',
        justifyContent: 'center',
    },
    imageContainer: {height: 70, width: 70},
    emptycontainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
});
