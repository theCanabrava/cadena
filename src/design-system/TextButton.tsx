import React, { useEffect, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon, { IconSource } from './icons';
import Palette from './Palette';

type TextButtonProps =
{
    label: string,
    onPress: () => void,
    accessibilityLabel: string,
    status?: 'active' | 'outlined' | 'carefull' | 'secondary',
    disabled?: boolean,
    size?: 'small' | 'large',
    sourceLeft?: IconSource,
    debug?: boolean
}
const TextButton = ({
    label, 
    onPress, 
    accessibilityLabel, 
    status = 'active', 
    size = 'large',
    sourceLeft,
    disabled = false,
    debug = false
}: TextButtonProps) =>
{
    //const [ buttonStyle, setButtonStyle ] = useState({...styles.button})
    //const [ labelStyle, setLabelStyle ] = useState({...styles.label})
    const styleString = useMemo(() => {
        if (disabled && status === 'outlined') return 'outline-disabled';
        else if (disabled) return 'disabled';
        else return status; 
    }, [disabled, status])

    const buttonStyle = useMemo(() => ({
        ...styles.button,
        backgroundColor: STYLE_MAP.buttonColor[styleString],
        borderWidth: STYLE_MAP.borderWidth[styleString],
        borderColor: STYLE_MAP.fontColor[styleString],
        height: STYLE_MAP.buttonSize[size]
    }), [styleString, size]);

    const labelStyle = useMemo(() => ({
        ...styles.label,
        color: STYLE_MAP.fontColor[styleString],
        fontSize: STYLE_MAP.fontSize[size]
    }), [styleString, size]);

    if(debug) {
        console.log(`Status: ${status}, diasbled: ${disabled}`)
        console.log('Style string', styleString);
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            accessibilityLabel={accessibilityLabel}
            disabled={disabled}
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
        'outline-disabled': Palette.mono.t50,
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
        'outline-disabled': Palette.grey.t600,
        outlined: Palette.deepPurple.t900,
        carefull: Palette.mono.t50
    },

    borderWidth: {
        active: 0,
        secondary: 0,
        disabled: 0,
        'outline-disabled': 1,
        outlined: 1,
        carefull: 0
    }
}