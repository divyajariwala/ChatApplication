import React, {useState} from 'react';
import {View} from 'react-native';
import {TextField} from 'rn-material-ui-textfield';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {ThemeUtils} from 'src/utils';
import PropTypes from 'prop-types';
import styles from './styles';

export default function MaterialTextInput(props) {
    let {icEyeColor, secureTextEntry} = props;
    const [passwordVisible, setPasswordVisible] = useState(secureTextEntry);

    return (
        <TextField
            renderRightAccessory={() => {
                if (!secureTextEntry) {
                    return;
                }
                return (
                    <View style={styles.icEye}>
                        <Icon
                            color={icEyeColor}
                            name={
                                passwordVisible
                                    ? 'visibility-off'
                                    : 'visibility'
                            }
                            size={ThemeUtils.fontLarge}
                            onPress={() =>
                                setPasswordVisible((prevVal) => !prevVal)
                            }
                        />
                    </View>
                );
            }}
            {...props}
            secureTextEntry={passwordVisible}
        />
    );
}

MaterialTextInput.propTypes = {
    icEyeColor: PropTypes.string,
    ...TextField.propTypes,
};

MaterialTextInput.defaultProps = {
    ...TextField.defaultProps,
};
