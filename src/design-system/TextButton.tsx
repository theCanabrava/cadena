import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon, { IconSource } from './icons';
import Palette from './Palette';

type TextButtonProps =
{
    label: string,
    onPress: () => void,
    accessibilityLabel: string,
    status?: 'active' | 'disabled',
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
            backgroundColor: STYLE_MAP.buttonColor[status]
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
            paddingHorizontal: 8
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
        disabled: Palette.grey.t600
    },

    buttonSize: {
        small: 24,
        large: 36
    },

    fontSize: {
        small: 14,
        large: 16
    }
}