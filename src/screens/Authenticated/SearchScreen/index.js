import React, {useEffect, useState} from 'react';

import {View, SafeAreaView, FlatList, TextInput, Image} from 'react-native';

import styles from './styles';

/* Custome-Component */
import {Label, Header, Ripple} from 'src/component';

/* Third-Party */
import {useIsFocused} from '@react-navigation/native';
import {connect} from 'react-redux';

/* Utils */
import {CommonStyle, ThemeUtils} from 'src/utils';
import firebase from 'src/utils/Config';

/* Navigation */
import Routes from 'src/router/Routes';

/* Redux */
import Action from 'src/redux/action';

/* Images */
import user from 'src/Assets/Images/User.png';

const Search = (props) => {
    const isFocused = useIsFocused();

    /*  Life-cycles Methods */

    const [User, setUser] = useState([]);
    const [fullData, setFullData] = useState([]);
    const [SearchQuery, setSearchQuery] = useState('');
    const [chatKey, setChatKey] = useState();

    useEffect(() => {
        getUser();
    }, [isFocused]);

    // get register users
    const getUser = () => {
        firebase
            .database()
            .ref(`V1/RegisterUser`)
            .once('value')
            .then((snapshot) => {
                console.log('Snapshot====>', snapshot);
                var items = [];
                snapshot.forEach((element) => {
                    element.val().Id === props.token
                        ? null
                        : items.push({
                              Username: element.val().Username,

                              ID: element.val().Id,
                          });
                });
                var user = items.includes(props.token);
                console.log('User==>>', user);
                setUser(items);
                setFullData(items);
                console.log('Data====>', items);
            });
    };
    /*  Public Interface Methods */

    /*  Validation Methods  */

    /*  UI Events Methods   */

    // Go-Back

    const Goback = () => {
        props.navigation.goBack();
    };

    // search-filetr
    const searchUser = (searchText) => {
        setSearchQuery(searchText);

        let filteredData = fullData.filter(function (item) {
            return item.Username.toLowerCase().includes(
                searchText.toLowerCase(),
            );
        });
        setUser(filteredData);
    };

    // goToChat
    const goToChat = (item) => {
        console.log('Data====>', props.token);
        props.navigation.navigate(Routes.Chat, {
            reciverId: item.ID,
            username: item.Username,
        });
        // firebase
        //     .database()
        //     .ref(`Users/ChatRooms`)
        //     .once('value')
        //     .then((snapshot) => {
        //         if (snapshot.hasChild(props.token)) {
        //             console.log('Child Existe');
        //             firebase
        //                 .database()
        //                 .ref(`Users/ChatRooms/${props.token}`)
        //                 .once('value')
        //                 .then((snapshot) => {
        //                     if (snapshot.hasChild(item.ID)) {
        //                         console.log('Inner Child', item.ID);
        //                         console.log('Snaplot', snapshot);
        //                         snapshot.forEach((element) => {
        //                             console.log(element.val().name);
        //                             console.log();
        //                             if (element.val().name === item.Username) {
        //                                 var chatKey = element.val().chatKey;
        //                                 console.log(
        //                                     'Pass chat key ==>>',
        //                                     chatKey,
        //                                 );
        //                                 props.navigation.navigate(Routes.Chat, {
        //                                     id: item.ID,
        //                                     username: item.Username,
        //                                     chatKey: chatKey,
        //                                 });
        //                             }
        //                         });
        //                     } else {
        //                         console.log("name don'es match");
        //                         props.navigation.navigate(Routes.Chat, {
        //                             id: item.ID,
        //                             username: item.Username,
        //                         });
        //                     }
        //                 });
        //         }
        //     });
    };

    /*  Custom-Component sub-render Methods */

    const listRender = (item) => {
        return (
            <Ripple style={styles.listContainer} onPress={() => goToChat(item)}>
                <View style={styles.subContainer}>
                    <Image source={user} style={styles.imageContainer} />
                </View>
                <View style={styles.metaInfo}>
                    <Label style={styles.title}>{item.Username}</Label>
                </View>
            </Ripple>
        );
    };

    // empty component
    const EmptyListMessage = () => {
        return (
            <View style={styles.emptycontainer}>
                <Label children="No Data Found" />
            </View>
        );
    };
    return (
        <SafeAreaView style={CommonStyle.safeArea} forceInset={{top: 'never'}}>
            <View style={CommonStyle.master_full_flex}>
                <Header children="Search" back={Goback} />
                <View style={styles.container}>
                    <TextInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        clearButtonMode="always"
                        value={SearchQuery}
                        onChangeText={searchUser}
                        placeholder="Search User..."
                        style={styles.searchBox}
                    />
                    <FlatList
                        data={User}
                        keyExtractor={(item) => item.ID}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingBottom: ThemeUtils.relativeHeight(5),
                        }}
                        renderItem={({item}) => listRender(item)}
                        ListEmptyComponent={EmptyListMessage}
                    />
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
    };
};

export default connect(mapStateToProps, null)(Search);
