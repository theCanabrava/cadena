import React from "react";
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Palette from "./Palette";

type InputProps = { 
    label: string, 
    placeholder: string, 
    value: string, 
    setValue: (v: string) => void, 
    accessibilityLabel: string,
    onStart?: () => void
    onDone?: () => void,
    keyboardType?: 'numeric'
}
const Input = ({
    label, 
    placeholder, 
    value, 
    setValue, 
    accessibilityLabel, 
    onStart = () => {}, 
    onDone = () => {},
    keyboardType
}: InputProps) =>
{
    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {label}
            </Text>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={Palette.grey.t600}
                style={styles.input}
                cursorColor={Palette.deepPurple.t800}
                value={value}
                onChangeText={setValue}
                accessibilityLabel={accessibilityLabel}
                onFocus={onStart}
                onBlur={onDone}
                keyboardType={keyboardType}
            />
        </View>
    )
}

export default Input;

const styles = StyleSheet.create(
    {
        container:
        {
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'stretch'
        },

        label:
        {
            fontFamily: 'Roboto-Medium',
            fontSize: 14,
            lineHeight: 16,
            color: Palette.deepPurple.t900
        },

        input:
        {
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderTopRightRadius: 8,
            borderTopLeftRadius: 8,
            borderBottomWidth: 2,
            borderColor: Palette.deepPurple.t800,
            backgroundColor: Palette.mono.t50,
            fontFamily: 'Roboto-Regular',
            fontSize: 18,
            color: Palette.grey.t900
        }


    }
)