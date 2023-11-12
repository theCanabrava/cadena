import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon, { IconSource } from './icons';
import Palette from './Palette';

type TextButtonProps =
{
    label: string,
    onPress: () => void,
    accessibilityLabel: string,
    status?: 'active' | 'disabled' | 'outlined' | 'carefull' | 'secondary',
    size?: 'small' | 'large',
    sourceLeft?: IconSource
}
const TextButton = ({
    label, 
    onPress, 
    accessibilityLabel, 
    status = 'active', 
    size = 'large',
    sourceLeft
}: TextButtonProps) =>
{
    const [ buttonStyle, setButtonStyle ] = useState({...styles.button})
    const [ labelStyle, setLabelStyle ] = useState({...styles.label})

    useEffect(() =>
    {
        setButtonStyle(b => 
        ({
            ...b,
            backgroundColor: STYLE_MAP.buttonColor[status],
            borderWidth: STYLE_MAP.borderWidth[status]
        }))

        setLabelStyle(l =>
        ({
            ...l,
            color: STYLE_MAP.fontColor[status]
        }))
    }, [status])

    useEffect(() =>
    {
        setButtonStyle(b => 
        ({
            ...b,
            height: STYLE_MAP.buttonSize[size]
        }))

        setLabelStyle(l => 
        ({
            ...l,
            fontSize: STYLE_MAP.fontSize[size]
        }))
    }, [size])

    return (
        <TouchableOpacity
            onPress={onPress}
            accessibilityLabel={accessibilityLabel}
            disabled={status === 'disabled'}
        >
            <View style={buttonStyle}>
                {
                    sourceLeft &&
                    <View style={styles.leftIconContainer}>
                        <Icon
                            source={sourceLeft!}
                            height={STYLE_MAP.buttonSize[size]}
                            width={STYLE_MAP.buttonSize[size]}
                            primary={Palette.mono.t50}
                        />
                    </View>
                }
                <Text style={labelStyle}>
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
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 36,
            backgroundColor: Palette.green.t600,
            borderRadius: 8,
            paddingHorizontal: 8,
            borderColor: Palette.deepPurple.t900,
            borderWidth: 0
        },

        label:
        {
            fontFamily: 'Roboto-Bold',
            fontSize: 16,
            color: Palette.mono.t50,
            paddingHorizontal: 8
        },

        leftIconContainer:
        {
            paddingLeft: 8
        }
    }
)

const STYLE_MAP =
{
    buttonColor: {
        active: Palette.green.t600,
        secondary: Palette.deepPurple.t600,
        disabled: Palette.grey.t600,
        outlined: Palette.mono.t50,
        carefull: Palette.red.t600
    },

    buttonSize: {
        small: 24,
        large: 36
    },

    fontSize: {
        small: 14,
        large: 16
    },

    fontColor: {
        active: Palette.mono.t50,
        secondary: Palette.mono.t50,
        disabled: Palette.mono.t50,
        outlined: Palette.deepPurple.t900,
        carefull: Palette.mono.t50
    },

    borderWidth: {
        active: 0,
        secondary: 0,
        disabled: 0,
        outlined: 1,
        carefull: 0
    }
}