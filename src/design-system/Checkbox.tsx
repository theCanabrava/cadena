import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from './icons';
import Palette from './Palette';

type CheckboxProps =
{
    label: string,
    onChecked: (c: boolean) => void,
    accessibilityLabel: string
}
const Checkbox = ({label, onChecked, accessibilityLabel}: CheckboxProps) =>
{
    const [ checked, setChecked ] = useState(false);

    return (
        <TouchableOpacity
            onPress={() => {
                setChecked(!checked)
                onChecked(!checked)
            }}
            accessibilityLabel={accessibilityLabel}
        >
            <View style={styles.container}>
                <Icon
                    source={checked ? 'check-filled' : 'check-empty'}
                    height={16}
                    width={16}
                    primary={Palette.deepPurple.t900}
                />
                <Text style={styles.text}>
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
        color: Palette.deepPurple.t900
    }
})