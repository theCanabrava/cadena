import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Palette from "./Palette";

type InputProps = { 
    label: string, 
    placeholder: string, 
    value: string, 
    setValue: (v: string) => void, 
    accessibilityLabel: string,
    options: { id: string, value: string }[]
}
const Input = ({label, placeholder, value, setValue, accessibilityLabel, options}: InputProps) =>
{
    const [ open, setOpen ] = useState(false)
    const [ position, setPosition ] = useState({left: 0, top: 0, width: 0})

    const selectedStyle = {...styles.selected}
    if(value === '') selectedStyle.color = Palette.grey.t600

    const optionsStyle = { 
        ...styles.optionsContainer, 
        ...position, 
        maxHeight: options.length >= 5 ? 150 : (32.8 * options.length)
    }

    const optionElements = options.map(o =>
        {
            return (
                <TouchableOpacity
                    onPress={() => 
                    {
                        setValue(o.value);
                        setOpen(false);
                    }}
                    key={o.id}
                >
                    <Text 
                        style={styles.option}
                    >
                        {o.value}
                    </Text>
                </TouchableOpacity>
            )
        })

    return (
        <>
            <View 
                style={styles.container}
                onLayout={ev =>
                {
                    setPosition(
                        {
                            left: ev.nativeEvent.layout.x,
                            top: ev.nativeEvent.layout.y+53,
                            width: ev.nativeEvent.layout.width
                        }
                    )
                }}
            >
                <Text style={styles.label}>
                    {label}
                </Text>
                <TouchableOpacity onPress={() => setOpen(true)} accessibilityLabel={accessibilityLabel}>
                    <View style={styles.dropdown}>
                        <Text style={selectedStyle}>
                            { value != "" ? value : placeholder}
                        </Text>
                        <Text style={selectedStyle}>
                            V
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            {
                open && 
                <TouchableWithoutFeedback 
                    onPress={() => setOpen(false)}
                > 
                    <View style={styles.optionsCover}>
                        <ScrollView
                            style={optionsStyle}
                            nestedScrollEnabled
                        >
                            {optionElements}
                        </ScrollView>
                    </View>
                </TouchableWithoutFeedback>
            }
        </>
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

        dropdown:
        {
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderTopRightRadius: 8,
            borderTopLeftRadius: 8,
            borderBottomWidth: 2,
            borderColor: Palette.deepPurple.t800,
            backgroundColor: Palette.mono.t50,
            color: Palette.grey.t900,

            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 37.7
        },

        selected: 
        {
            fontFamily: 'Roboto-Regular',
            fontSize: 18,
            color: Palette.grey.t900,
        },

        option: 
        {
            fontFamily: 'Roboto-Regular',
            fontSize: 18,
            color: Palette.grey.t900,
            paddingHorizontal: 8,
            paddingVertical: 4
        },

        optionsCover: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        },

        optionsContainer: {
            backgroundColor: Palette.mono.t50,
            maxHeight: 150,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8
        }

    }
)