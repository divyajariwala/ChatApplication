import React, {useRef, useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';

/* Custome Components */
import {Label, RoundButton, MaterialTextInput, Ripple} from 'src/component';

/* Utils */
import {
    CommonStyle,
    ThemeUtils,
    Messages,
    Constants,
    showMessage,
    Color,
} from 'src/utils';
import firebase from 'src/utils/Config';

/* Third-Party */
import {Controller, useForm} from 'react-hook-form';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {CommonActions} from '@react-navigation/native';
import {connect} from 'react-redux';

/* Redux */
import Action from 'src/redux/action';

/* Navigation */
import Routes from 'src/router/Routes';

import styles from './styles';

const Register = (props) => {
    /*  Life-cycles Methods */
    const [Loader, setLoader] = useState(false);
    const {
        register,
        setValue,
        control,
        reset,
        clearErrors,
        getValues,
        errors,
        handleSubmit,
        watch,
    } = useForm();

    /*  Public Interface Methods */
    /*  Validation Methods  */
    const password = useRef({});
    password.current = watch('password', '');

    // filed validation
    const registerValidation = (data) => {
        console.log('onSubmitted', data);
        onSubmit(data);
    };

    /*  UI Events Methods   */

    // Register User
    const onSubmit = (userdetails) => {
        const {Username, email, password} = userdetails;
        setLoader(true);
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((res) => {
                res.user.updateProfile({
                    userName: Username,
                });
                console.log('User registered successfully!');
                userList(Username, res.user.uid);
                props.setToken(res.user.uid);
                props.setUser(Username);
                setLoader(false);

                showMessage('User Register', Constants.MessageType.SUCCESS);
                const resetToAuth = CommonActions.reset({
                    index: 0,
                    routes: [{name: Routes.Authenticated}],
                });
                props.navigation.dispatch(resetToAuth);
            })
            .catch((error) => {
                console.log('Error', error);
                setLoader(false);
                showMessage('Fail Register ', Constants.MessageType.FAILED);
            });
    };

    // create user
    const userList = (Username, Id) => {
        firebase
            .database()
            .ref(`V1/RegisterUser`)
            .push({Username, Id})
            .then((data) => {
                console.log('data ', data);
            })
            .catch((error) => {
                console.log('error ', error);
            });
    };

    // Login

    const goToLogin = () => {
        props.navigation.navigate(Routes.Login);
    };
    /*  Custom-Component sub-render Methods */

    return (
        <SafeAreaView style={CommonStyle.safeArea} forceInset={{top: 'never'}}>
            <View style={styles.container}>
                <Label
                    children="Let's get Started!"
                    mb={ThemeUtils.relativeHeight(5)}
                    xlarge={true}
                    align="center"
                />
                <Controller
                    control={control}
                    render={({onChange, onBlur, value}) => (
                        <MaterialTextInput
                            onFocus={() => clearErrors('Username')}
                            error={errors.Username?.message}
                            value={value}
                            tintColor={Color.PRIMARY_DARK}
                            label={'Username'}
                            onBlur={onBlur}
                            onChangeText={onChange}
                        />
                    )}
                    name={'Username'}
                    defaultValue={''}
                    rules={{
                        required: Messages.Errors.firstNameBlank,

                        maxLength: {
                            value: 20,
                            message: Messages.Errors.firstNameLength,
                        },
                    }}
                />

                <Controller
                    control={control}
                    render={({onChange, onBlur, value}) => (
                        <MaterialTextInput
                            onFocus={() => clearErrors('email')}
                            error={errors.email?.message}
                            value={value}
                            tintColor={Color.PRIMARY_DARK}
                            label={'Email-address'}
                            onBlur={onBlur}
                            onChangeText={onChange}
                        />
                    )}
                    name={'email'}
                    defaultValue={''}
                    rules={{
                        required: Messages.Errors.emailBlank,
                        pattern: {
                            value: Constants.Regex.PASSWORD,
                            message: Messages.Errors.emailValidity,
                        },
                    }}
                />
                <Controller
                    control={control}
                    render={({onChange, onBlur, value}) => (
                        <MaterialTextInput
                            onFocus={() => clearErrors('password')}
                            error={errors.password?.message}
                            value={value}
                            tintColor={Color.PRIMARY_DARK}
                            label={'Password'}
                            secureTextEntry
                            onBlur={onBlur}
                            onChangeText={onChange}
                        />
                    )}
                    name={'password'}
                    defaultValue={''}
                    rules={{
                        required: Messages.Errors.pwdBlank,
                        minLength: {
                            value: 8,
                            message: Messages.Errors.pwdLengthMinimum,
                        },
                    }}
                />
                <Controller
                    control={control}
                    render={({onChange, onBlur, value}) => (
                        <MaterialTextInput
                            onFocus={() => clearErrors('cpassword')}
                            error={errors.cpassword?.message}
                            value={value}
                            tintColor={Color.PRIMARY_DARK}
                            label={'Confirm-Password'}
                            secureTextEntry
                            onBlur={onBlur}
                            onChangeText={onChange}
                        />
                    )}
                    name={'cpassword'}
                    defaultValue={''}
                    rules={{
                        required: Messages.Errors.pwdConfirmation,
                        // validate: (value) =>
                        //     value === cpassword.current ||
                        //     'The passwords do not match',
                    }}
                />
                <View style={styles.btnContainer}>
                    <RoundButton
                        click={handleSubmit(registerValidation)}
                        width={'100%'}
                        border_radius={10}
                        animation={Loader}
                        backgroundColor={Color.PRIMARY_DARK}
                        textColor={Color.WHITE}
                        mt={ThemeUtils.relativeRealHeight(4)}
                        style={CommonStyle.full_flex}>
                        {'Register'}
                    </RoundButton>
                </View>
                <Ripple style={styles.iconContainer} onPress={goToLogin}>
                    <Icon
                        name="arrow-back"
                        size={ThemeUtils.fontXXLarge}
                        onPress
                    />
                </Ripple>
            </View>
        </SafeAreaView>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        setToken: (token) => dispatch(Action.setToken(token)),
        setUser: (user) => dispatch(Action.setUser(user)),
    };
};
const mapStateToProps = (state) => {
    if (state === undefined) return {};
    console.log('state', state);
    return {
        token: state.token,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
