import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Palette from './Palette';

type TextButtonProps =
{
    label: string,
    onPress: () => void,
    accessibilityLabel: string,
    status?: 'active' | 'disabled'
}
const TextButton = ({label, onPress, accessibilityLabel, status = 'active'}: TextButtonProps) =>
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
                <Text style={styles.label}>
                    {label}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default TextButton;

const styles = StyleSheet.create(
    {
        button: 
        {
            justifyContent: 'center',
            alignItems: 'center',
            height: 36,
            backgroundColor: Palette.green.t600,
            borderRadius: 8
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
        active: Palette.green.t600,
        disabled: Palette.grey.t600
    }
}