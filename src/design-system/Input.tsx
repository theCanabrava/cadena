import React from "react";
import { View, Text, TextInput, StyleSheet, Platform, Keyboard } from 'react-native';
import Palette from "./Palette";

type InputProps = { 
    label: string, 
    placeholder: string, 
    value: string, 
    setValue: (v: string) => void, 
    accessibilityLabel: string,
    onStart?: () => void
    onDone?: () => void,
    keyboardType?: 'numeric',
    multiline?: boolean
}
const Input = ({
    label, 
    placeholder, 
    value, 
    setValue, 
    accessibilityLabel, 
    onStart = () => {}, 
    onDone = () => {},
    keyboardType,
    multiline = false
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
                style={multiline ? styles.inputMultiline : styles.input}
                cursorColor={Palette.deepPurple.t800}
                value={value}
                onChangeText={setValue}
                accessibilityLabel={accessibilityLabel}
                onFocus={onStart}
                onBlur={() => {
                    onDone();
                    Keyboard.dismiss();
                }}
                keyboardType={keyboardType}
                multiline={multiline}
                textAlignVertical={multiline ? 'top' : undefined}
                returnKeyType='done'
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
            height: Platform.OS === 'ios' ? 38 : undefined,
            color: Palette.grey.t900
        },

        inputMultiline:
        {
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 8,
            backgroundColor: Palette.mono.t50,
            fontFamily: 'Roboto-Regular',
            fontSize: 14,
            lineHeight: 21,
            height: 96,
            color: Palette.grey.t900,
        }


    }
)