import {StyleSheet} from 'react-native';
import {ThemeUtils, Color} from 'src/utils';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.HOME_COLOR,
        paddingHorizontal: ThemeUtils.relativeWidth(5),
    },
    lineSeparator: {
        height: 1,
        backgroundColor: Color.TEXT_PLACEHOLDER,
    },
    bottomContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: ThemeUtils.relativeWidth(3),
        justifyContent: 'center',
        alignItems: 'center',
    },
    textinputContainer: {
        backgroundColor: Color.WHITE,
        paddingHorizontal: ThemeUtils.relativeWidth(3),
        borderColor: Color.PRIMARY_DARK,
        borderWidth: 0.2,
        borderRadius: 10,
        width: '85%',
        // height: '65%',
    },
    listContainer: {
        // flex: 1,
        paddingHorizontal: ThemeUtils.relativeWidth(3),
    },
    sendLable: {
        marginLeft: ThemeUtils.relativeWidth(3),
        justifyContent: 'center',
    },
    reciverSide: {
        backgroundColor: Color.SHADOW_COLOR,
        marginTop: ThemeUtils.relativeHeight(1),
        borderRadius: 12,
        padding: ThemeUtils.relativeWidth(2.5),
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        maxWidth: ThemeUtils.relativeWidth(80),
    },
    senderSide: {
        backgroundColor: Color.PRIMARY_DARK,
        padding: ThemeUtils.relativeWidth(2.5),
        borderRadius: 12,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignSelf: 'flex-end',
    },
    senderText: {
        color: Color.WHITE,
    },
    reciverText: {
        color: Color.BLACK,
    },
    itemContainer: {
        paddingHorizontal: ThemeUtils.relativeWidth(3),
    },
    senderSubContainer: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    animatedView: {
        backgroundColor: Color.PRIMARY_DARK,
        borderRadius: 15,
        borderWidth: 1,
        marginHorizontal: ThemeUtils.relativeWidth(35),
    },
    lable: {
        color: Color.WHITE,
    },
    contentContainer: {
        paddingTop: ThemeUtils.relativeHeight(5),
        flexDirection: 'column-reverse',
    },
});
