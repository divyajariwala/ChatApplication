import React from 'react';
import {View, Text, Image} from 'react-native';

/* third-party library */
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

/* utils */
import {ThemeUtils, Color} from 'src/utils';

/* customecomponet */
import Lable from 'src/component/ui/Label';
import Ripple from 'src/component/ui/Ripple';

/* Images */
import user from 'src/Assets/Images/User.png';

import styles from './styles';

const Header = (props) => {
    return (
        <View style={styles.container}>
            <Ripple
                style={styles.homeIcon}
                onPress={props.home ? props.logOut : props.back}
                rippleContainerBorderRadius={20}>
                <Icon
                    color={Color.PRIMARY_DARK}
                    name={props.home ? 'logout' : 'arrow-back'}
                    size={ThemeUtils.fontXXLarge}
                />
            </Ripple>
            {/* {props.chat ? (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={user} style={styles.imageContainer} />
                </View>
            ) : null} */}

            <View style={styles.titleContainer}>
                <Lable
                    children={props.children}
                    color={Color.PRIMARY_DARK}
                    bolder={true}
                    large={true}
                    align="center"
                />
            </View>

            <View style={styles.rightIcon}>
                <Ripple
                    style={styles.iconStyle}
                    rippleContainerBorderRadius={20}
                    onPress={() => props.goToSearch()}>
                    <Icon
                        color={Color.PRIMARY_DARK}
                        name={props.home ? 'search' : null}
                        size={ThemeUtils.fontXXLarge}
                    />
                </Ripple>
            </View>
        </View>
    );
};

export default Header;
