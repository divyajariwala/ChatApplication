import React, {useEffect, useState} from 'react';

import {SafeAreaView, View} from 'react-native';

import {MaterialTextInput, RoundButton, Label, Ripple} from 'src/component';

import {Controller, useForm} from 'react-hook-form';
import {connect} from 'react-redux';
import {CommonActions} from '@react-navigation/native';

import {
    CommonStyle,
    Constants,
    Messages,
    ThemeUtils,
    showMessage,
    Color,
} from 'src/utils';
import firebase from 'src/utils/Config';

/* Navigation */
import Routes from 'src/router/Routes';

import Action from 'src/redux/action';

import styles from './styles';

const Login = (props) => {
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
    } = useForm();

    /*  Public Interface Methods */
    /*  Validation Methods  */
    /*  UI Events Methods   */

    // User Login
    const onSubmit = (userDetails) => {
        const {email, password} = userDetails;
        setLoader(true);
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((res) => {
                console.log('Response ==>>', res);
                console.log('User logged-in successfully!==>>', res.user.uid);
                props.setToken(res.user.uid);
                setLoader(false);
                showMessage(
                    'User login successfully',
                    Constants.MessageType.SUCCESS,
                );

                const resetToAuth = CommonActions.reset({
                    index: 0,
                    routes: [{name: Routes.Authenticated}],
                });
                props.navigation.dispatch(resetToAuth);
            })
            .catch((error) => {
                setLoader(false);
                showMessage('Invalid Details', Constants.MessageType.FAILED);
                console.log('Error', error);
            });
    };

    // Register
    const onRegister = () => {
        props.navigation.navigate(Routes.Register);
    };

    /*  Custom-Component sub-render Methods */

    return (
        <SafeAreaView style={CommonStyle.safeArea} forceInset={{top: 'never'}}>
            <View style={styles.container}>
                <Label
                    children="Welcome! to WMT-CHAT"
                    mb={ThemeUtils.relativeHeight(5)}
                    xlarge={true}
                    align="center"
                />
                <Controller
                    control={control}
                    render={({onChange, onBlur, value}) => (
                        <MaterialTextInput
                            onFocus={() => clearErrors('email')}
                            error={errors.email?.message}
                            tintColor={Color.PRIMARY_DARK}
                            value={value}
                            label={'Email'}
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
                    rules={{required: 'Password is required.'}}
                />
                <View style={styles.btnContainer}>
                    <RoundButton
                        click={handleSubmit(onSubmit)}
                        width={'100%'}
                        border_radius={10}
                        animation={Loader}
                        backgroundColor={Color.PRIMARY_DARK}
                        textColor={Color.WHITE}
                        mt={ThemeUtils.relativeRealHeight(4)}
                        style={CommonStyle.full_flex}>
                        {'Login'}
                    </RoundButton>
                </View>

                <Label
                    children="Forgot Password?"
                    mt={ThemeUtils.relativeHeight(2)}
                    align="center"
                />
                <Label
                    children="OR"
                    mt={ThemeUtils.relativeHeight(8)}
                    align="center"
                />
                <Ripple onPress={onRegister}>
                    <Label
                        children="Sign up here"
                        mt={ThemeUtils.relativeHeight(2)}
                        align="center"
                    />
                </Ripple>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
