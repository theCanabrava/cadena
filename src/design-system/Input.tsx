import React from "react";
import { View, Text, TextInput, StyleSheet } from 'react-native';

type InputProps = { label: string, placeholder: string, value: string, setValue: (v: string) => void, accessibilityLabel: string }
const Input = ({}: InputProps) =>
{
    return (
        <View>
            <Text style={{color: 'red'}}>
                TODO! - text input
            </Text>
        </View>
    )
}

export default Input;