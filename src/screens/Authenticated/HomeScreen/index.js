import React, {useEffect, useState} from 'react';

import {
    View,
    SafeAreaView,
    FlatList,
    Image,
    ActivityIndicator,
} from 'react-native';

import styles from './styles';

/* Custome-Component */
import {Label, Header, Ripple} from 'src/component';

/* Third-Party lib. */
import {connect} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';

/* Redux */
import Action from 'src/redux/action';

/* Utils */
import {CommonStyle, Color, ThemeUtils} from 'src/utils';
import firebase from 'src/utils/Config';

/* Navigation */
import Routes from 'src/router/Routes';

/* Images */
import user from 'src/Assets/Images/User.png';

const Home = (props) => {
    const isFocused = useIsFocused();

    /*  Life-cycles Methods */
    const [Chat, setChat] = useState([]);
    const [Loader, setLoader] = useState(true);
    const [senderId, setSenderId] = useState(props.token);
    useEffect(() => {
        getMessage();
    }, [isFocused]);

    /*  Public Interface Methods */
    const getMessage = () => {
        setLoader(true);
        firebase
            .database()
            .ref(`/V1/users/${senderId}/conversations`)
            .on('value', (snapshot) => {
                var items = [];

                console.log('Snapshot==>>', snapshot);
                setLoader(false);
                snapshot.forEach((element) => {
                    items.push({
                        Username: element.val().USERNAME,
                        Message: element.val().CONTENT,
                        timestamp: element.val().timestamp,
                        is_read: element.val().IS_READ,
                        // ChatKey: element.val().chatKey,
                        ID: element.key,
                    });
                });
                let sortItem = items.sort((a, b) => {
                    return b.timestamp > a.timestamp;
                });
                console.log('Sortitem==>>', sortItem);
                setChat(sortItem);
            });
    };

    /*  Validation Methods  */

    /*  UI Events Methods   */

    // Search
    const goToSearch = () => {
        props.navigation.navigate(Routes.Search);
    };

    //Signout from firebase
    const logOut = () => {
        firebase
            .auth()
            .signOut()
            .then(function () {
                props.setToken(null);
                console.log('Sign-out successful!==>>');
                const resetToNotAuth = CommonActions.reset({
                    index: 0,
                    routes: [{name: Routes.UnAuthenticated}],
                });
                props.navigation.dispatch(resetToNotAuth);
            })
            .catch(function (error) {
                console.log('An error happened!==>>', error);
            });
    };

    // goToChat
    const goToChat = (item) => {
        console.log('Data====>', item.ChatKey);
        props.navigation.navigate(Routes.Chat, {
            reciverId: item.ID,
            username: item.Username,
        });
    };

    /*  Custom-Component sub-render Methods */

    const listRender = (item) => {
        console.log('Token==>', props.token);
        return item.ID !== props.token ? (
            <Ripple style={styles.listContainer} onPress={() => goToChat(item)}>
                <View style={styles.subContainer}>
                    <Image source={user} style={styles.imageContainer} />
                </View>
                <View style={styles.metaInfo}>
                    <Label
                        style={styles.title}
                        bolder={true}
                        color={Color.PRIMARY_DARK}>
                        {item.Username}
                    </Label>
                    <Label
                        style={styles.title}
                        xsmall={true}
                        mt={ThemeUtils.relativeHeight(1)}
                        numberOfLines={1}>
                        {item.Message}
                    </Label>
                </View>
                <Label
                    style={styles.title}
                    xsmall={true}
                    mt={ThemeUtils.relativeHeight(1)}>
                    {item.timestamp}
                </Label>
            </Ripple>
        ) : null;
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
                <Header
                    children="WMT_CHAT"
                    home
                    goToSearch={goToSearch}
                    logOut={logOut}
                />

                <View style={styles.container}>
                    {Loader === true ? (
                        <ActivityIndicator
                            animating={Loader}
                            color={Color.PRIMARY_DARK}
                            size="large"
                        />
                    ) : (
                        <FlatList
                            data={Chat}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingBottom: ThemeUtils.relativeHeight(5),
                            }}
                            keyExtractor={(item) => item.ID}
                            renderItem={({item}) => listRender(item)}
                            ListEmptyComponent={EmptyListMessage}
                        />
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};
const mapDispatchToProps = (dispatch) => {
    return {
        setToken: (token) => dispatch(Action.setToken(token)),
    };
};
const mapStateToProps = (state) => {
    if (state === undefined) return {};
    console.log('state', state);
    return {
        token: state.token,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
