import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from './icons';
import Palette from './Palette';

type CheckboxProps =
{
    label: string,
    isChecked?: boolean
    onChecked: (c: boolean) => void,
    accessibilityLabel: string,
    disabled?: boolean
}
const Checkbox = ({label, isChecked, onChecked, accessibilityLabel, disabled = false}: CheckboxProps) =>
{
    const [ checked, setChecked ] = useState(false);
    const color = disabled ? Palette.grey.t600 : Palette.deepPurple.t900;

    let validCheck = isChecked !== undefined ? isChecked : checked;

    return (
        <TouchableOpacity
            onPress={() => {
                setChecked(!validCheck)
                onChecked(!validCheck)
            }}
            accessibilityLabel={accessibilityLabel}
            disabled={disabled}
        >
            <View style={styles.container}>
                <Icon
                    source={validCheck ? 'check-filled' : 'check-empty'}
                    height={16}
                    width={16}
                    primary={color}
                />
                <Text style={[styles.text, { color }]}>
                    {label}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default Checkbox;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    text: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        color: Palette.deepPurple.t900,
        paddingLeft: 2
    }
})