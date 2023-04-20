import React, {useState, useEffect, useRef} from 'react';

import {
    View,
    SafeAreaView,
    FlatList,
    Image,
    Text,
    TextInput,
    Animated,
} from 'react-native';

import styles from './styles';

/* Custome-Component */
import {Label, Header, Ripple, Hr} from 'src/component';

/* Third-Party lib. */
import {connect} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import InvertibleScrollView from 'react-native-invertible-scroll-view';

/* Redux */
import Action from 'src/redux/action';

/* Utils */
import {CommonStyle, Color, ThemeUtils} from 'src/utils';
import firebase from 'src/utils/Config';

// const
const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const Chat = ({route, token, navigation, user}) => {
    const {reciverId, username} = route.params;

    //Current Date
    var today = new Date(),
        time = today.getHours() + ':' + today.getMinutes();

    let date = today.getDate() + 'th ' + monthNames[today.getMonth()];
    const flatList = useRef(null);
    //Unique Key for store chat
    // var chatKey1 = firebase
    //     .database()
    //     .ref(`Users/ChatRooms/${token}/${id}`)
    //     .push()
    //     .getKey();

    /*  Life-cycles Methods */
    const [messages, setMessages] = useState([]);
    const [sendMessage, setSendMessage] = useState('');
    // const [chatkey, setChatKey] = useState(chatKey);
    const [senderId, setSenderId] = useState(token);
    const [ReciverId, setReciverId] = useState(reciverId);
    const isFocused = useIsFocused();

    /* Initalize animated value */
    const animationvalue = new Animated.Value(0);

    useEffect(() => {
        // console.log('Parameter', chatKey);

        // getData();
        verifyUser();
    }, []);

    /*  Public Interface Methods */
    const opacity = animationvalue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 1, 0],
        useNativeDriver: true,
    });
    const animation = () => {
        animationvalue.setValue(0);
        Animated.timing(animationvalue, {
            toValue: 1,
            duration: 5000,
            // easing,
        }).start();
    };
    // createNewRoom
    // const createNewRoom = () => {
    //     if (chatkey === undefined) {
    //         console.log('WithRoom');
    //         firebase.database().ref(`Users/ChatRooms/${token}/${id}`).set({
    //             chatKey: chatKey1,
    //             name: username,
    //             lastmessage: sendMessage.trimEnd(),
    //             timestamp: time,
    //         });
    //         firebase.database().ref(`Users/ChatRooms/${id}/${token}`).set({
    //             chatKey: chatKey1,
    //             name: user,
    //             lastmessage: sendMessage.trimEnd(),
    //             timestamp: time,
    //         });
    //         storeMessage(chatKey1);
    //         setChatKey(chatKey1);
    //         // chatkey = chatKey1;
    //     } else {
    //         console.log('Without Room');
    //         storeMessage(chatKey1);
    //         setChatKey(chatKey1);
    //     }
    // };

    // // storeMessage
    // const storeMessage = (chatKey1) => {
    //     console.log('Send Message==>>', sendMessage);
    //     if (chatkey === undefined) {
    //         firebase.database().ref(`Users/Chat/${chatKey1}`).push({
    //             Message: msendMessage.trimEnd(),
    //             SenderId: token,
    //             ReciverId: id,
    //             MessageDate: date,
    //             timestamp: time,
    //         });
    //         firebase.database().ref(`Users/ChatRooms/${token}/${id}`).update({
    //             lastmessage: sendMessage.trimEnd(),
    //             timestamp: time,
    //         });
    //         firebase.database().ref(`Users/ChatRooms/${id}/${token}`).update({
    //             lastmessage: sendMessage.trimEnd(),
    //             timestamp: time,
    //         });
    //     } else {
    //         firebase.database().ref(`Users/Chat/${chatkey}`).push({
    //             Message: sendMessage.trimEnd(),
    //             SenderId: token,
    //             ReciverId: id,
    //             MessageDate: date,
    //             timestamp: time,
    //         });
    //         firebase.database().ref(`Users/ChatRooms/${token}/${id}`).update({
    //             timestamp: time,
    //             lastmessage: sendMessage.trimEnd(),
    //         });
    //         firebase.database().ref(`Users/ChatRooms/${id}/${token}`).update({
    //             lastmessage: sendMessage.trimEnd(),
    //             timestamp: time,
    //         });
    //     }
    // };

    // const getData = () => {
    //     setChatKey(chatKey);
    //     console.log('ChatKey123==>>', chatkey);

    //     firebase
    //         .database()
    //         .ref(`Users/Chat/${chatkey}`)
    //         .on('value', (snapshot) => {
    //             var items = [];
    //             console.log('Snapshot123==>>', snapshot);
    //             snapshot.forEach((element) => {
    //                 items.push({
    //                     Message: element.val().Message,
    //                     Sender: element.val().SenderId,
    //                     Reciver: element.val().ReciverId,
    //                     timestamp: element.val().timestamp,
    //                     ID: element.key,
    //                     Date: element.val().MessageDate,
    //                 });
    //             });
    //             setMessages(items);
    //             console.log('Items==>>', items);
    //         });
    // };

    const getChatData = async () => {
        var getKeyForChatData;
        await firebase
            .database()
            .ref(`/V1/users/${senderId}/conversations/${ReciverId}`)
            .update({
                IS_READ: true,
            });

        await firebase
            .database()
            .ref(`/V1/users/${senderId}/conversations/${ReciverId}`)
            .once('value')
            .then((snapshot) => {
                console.log('Snapshot ==>>', snapshot);
                getKeyForChatData = snapshot.val().KEY;
            });

        await firebase
            .database()
            .ref(`V1/conversations/${getKeyForChatData}`)
            .on('value', async (snapshot) => {
                var items = [];

                snapshot.forEach((element) => {
                    items.push({
                        CONTENT: element.val().CONTENT,
                        SENDER_ID: element.val().SENDER_ID,
                        SENDER_NAME: element.val().SENDER_NAME,
                        TIMESTAMP: element.val().TIMESTAMP,
                        RECIVER_ID: element.val().RECIVER_ID,
                        TYPE: element.val().TYPE,
                    });
                });
                setMessages(items);
            });
    };

    /*  Validation Methods  */

    // verifyUser
    const verifyUser = async () => {
        var sender, recivier;
        firebase
            .database()
            .ref(`/V1/users/${senderId}/conversations/${ReciverId}`)
            .once('value')
            .then((snapshot) => {
                sender = snapshot.val();
            });

        await firebase
            .database()
            .ref(`/V1/users/${ReciverId}/conversations/${senderId}`)
            .once('value')
            .then((snapshot) => {
                recivier = snapshot.val();
            });
        console.log(sender, recivier);
        if ((sender && recivier) === null) {
            const newReference = await firebase.database().ref('/users').push();
            console.log('newReference', newReference);
            await firebase
                .database()
                .ref(`/V1/users/${senderId}/conversations/${ReciverId}`)
                .set({
                    KEY: newReference.key.toString(),
                    USERNAME: username,
                });

            await firebase
                .database()
                .ref(`/V1/users/${ReciverId}/conversations/${senderId}`)
                .set({
                    KEY: newReference.key.toString(),
                    USERNAME: user,
                })
                .then(() => console.log('Data set.'));
        } else {
            getChatData();
        }
    };

    /*  UI Events Methods   */
    const onSend = () => {
        setSendMessage('');

        firebase
            .database()
            .ref(`/V1/users/${ReciverId}/conversations/${senderId}`)
            .once('value')
            .then((snapshot) => {
                firebase
                    .database()
                    .ref(`/V1/conversations/${snapshot.val().KEY}`)
                    .push({
                        CONTENT: sendMessage.trim(),
                        SENDER_NAME: username,
                        SENDER_ID: senderId,
                        TIMESTAMP: time,
                        TYPE: 'text',
                        RECIVER_ID: ReciverId,
                    });
                firebase
                    .database()
                    .ref(`/V1/users/${ReciverId}/conversations/${senderId}`)
                    .update({
                        CONTENT: sendMessage.trim(),
                        IS_READ: false,
                    });
                firebase
                    .database()
                    .ref(`/V1/users/${senderId}/conversations/${ReciverId}`)
                    .update({
                        CONTENT: sendMessage.trim(),
                        IS_READ: true,
                    })

                    .then(() => {
                        setSendMessage('');
                        getChatData();
                    });
            });

        // createNewRoom();
    };

    const goBack = () => {
        navigation.goBack();
    };
    /*  Custom-Component sub-render Methods */

    const listRender = (item) => {
        return (
            <View style={styles.itemContainer}>
                <View
                    style={
                        token === item.SENDER_ID ? null : styles.reciverSide
                    }>
                    <Label
                        children={
                            token === item.SENDER_ID ? null : item.CONTENT
                        }
                        style={
                            token === item.SENDER_ID ? null : styles.reciverText
                        }
                    />
                    <Label
                        xsmall={true}
                        ms={ThemeUtils.relativeWidth(3)}
                        color={Color.BLACK}
                        children={
                            token === item.SENDER_ID ? null : item.TIMESTAMP
                        }
                    />
                </View>
                <View
                    style={
                        token === item.SENDER_ID
                            ? styles.senderSubContainer
                            : null
                    }>
                    <View
                        style={
                            token === item.SENDER_ID ? styles.senderSide : null
                        }>
                        <Label
                            children={
                                token === item.SENDER_ID ? item.CONTENT : null
                            }
                            style={
                                token === item.SENDER_ID
                                    ? styles.senderText
                                    : null
                            }
                        />
                        <Label
                            xsmall={true}
                            ms={ThemeUtils.relativeWidth(3)}
                            color={Color.TEXT_PLACEHOLDER}
                            children={
                                token === item.SENDER_ID ? item.TIMESTAMP : null
                            }
                        />
                    </View>
                </View>
            </View>
        );
    };
    return (
        <SafeAreaView style={CommonStyle.safeArea} forceInset={{top: 'never'}}>
            <View style={CommonStyle.master_full_flex}>
                <Header children={username} chat back={goBack} />

                <View style={styles.listContainer}>
                    <View style={{height: '90%'}}>
                        <Animated.View
                            style={[
                                styles.animatedView,
                                {
                                    opacity: opacity,
                                },
                            ]}>
                            <Label
                                children={'test'}
                                align="center"
                                style={styles.lable}
                            />
                        </Animated.View>

                        <InvertibleScrollView
                            inverted
                            style={{zIndex: 10}}
                            showsVerticalScrollIndicator={false}
                            scrollEventThrottle={16}
                            onScroll={animation}
                            ref={flatList}
                            onContentSizeChange={() => {
                                flatList.current.scrollTo({
                                    y: 0,
                                    animated: true,
                                });
                            }}>
                            <FlatList
                                data={messages}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={styles.contentContainer}
                                keyExtractor={(item) => item.ID}
                                inverted={-1}
                                scrollToIndex={animation}
                                renderItem={({item}) => listRender(item)}
                            />
                        </InvertibleScrollView>
                    </View>
                    <View style={styles.bottomContainer}>
                        <TextInput
                            placeholder={'Enter your message...'}
                            style={styles.textinputContainer}
                            value={sendMessage}
                            multiline={true}
                            onChangeText={(message) => {
                                setSendMessage(message);
                            }}
                        />
                        <Ripple
                            style={styles.sendLable}
                            rippleContainerBorderRadius={20}
                            onPress={onSend}
                            disabled={sendMessage === '' ? true : false}>
                            <Label
                                children="Send"
                                color={
                                    sendMessage === ''
                                        ? Color.TEXT_PLACEHOLDER
                                        : Color.BLACK
                                }
                            />
                        </Ripple>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};
const mapStateToProps = (state) => {
    if (state === undefined) return {};
    console.log('state', state);
    return {
        token: state.token,
        user: state.user,
    };
};

export default connect(mapStateToProps, null)(Chat);
