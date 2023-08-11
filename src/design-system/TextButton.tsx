import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Palette from './Palette';

type TextButtonProps =
{
    label: string,
    onPress: () => void,
    accessibilityLabel: string
}
const TextButton = ({label, onPress, accessibilityLabel}: TextButtonProps) =>
{
    return (
        <TouchableOpacity
            onPress={onPress}
            accessibilityLabel={accessibilityLabel}
        >
            <View style={styles.button}>
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