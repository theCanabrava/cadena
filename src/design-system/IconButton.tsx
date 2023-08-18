import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon, { IconSource } from './icons';
import Palette from './Palette';

type IconButtonProps =
{
    source: IconSource
    onPress: () => void,
    accessibilityLabel: string,
    status?: 'active' | 'disabled'
}
const IconButton = ({source, onPress, accessibilityLabel, status = 'active'}: IconButtonProps) =>
{
    const [ buttonStyle, setButtonStyle ] = useState({...styles.button})

    useEffect(() =>
    {
        setButtonStyle(b => 
        ({
            ...b,
            backgroundColor: STYLE_MAP.buttonColor[status]
        }))
    }, [status])

    return (
        <TouchableOpacity
            onPress={onPress}
            accessibilityLabel={accessibilityLabel}
            disabled={status === 'disabled'}
        >
            <View style={buttonStyle}>
                <Icon
                    source={source}
                    primary={Palette.mono.t50}
                    width={24}
                    height={24}
                />
            </View>
        </TouchableOpacity>
    )
}

export default IconButton;

const styles = StyleSheet.create(
    {
        button: 
        {
            justifyContent: 'center',
            alignItems: 'center',
            height: 36,
            width: 36,
            backgroundColor: Palette.green.t600,
            borderRadius: 8,
        },

        label:
        {
            fontFamily: 'Roboto-Bold',
            fontSize: 16,
            color: Palette.mono.t50,
            paddingHorizontal: 8
        }
    }
)

const STYLE_MAP =
{
    buttonColor: {
        active: Palette.red.t600,
        disabled: Palette.grey.t600
    }
}