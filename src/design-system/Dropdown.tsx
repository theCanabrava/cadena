import React, { useState } from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Palette from "./Palette";

type InputProps = { label: string, placeholder: string, value: string, setValue: (v: string) => void, accessibilityLabel: string }
const Input = ({label, placeholder, value, setValue, accessibilityLabel}: InputProps) =>
{
    const [ open, setOpen ] = useState(false)
    const [ position, setPosition ] = useState({left: 0, top: 0, width: 0})

    const selectedStyle = {...styles.selected}
    if(value === '') selectedStyle.color = Palette.grey.t600

    const optionsStyle = { ...styles.optionsContainer, ...position }
    console.log('OPTIONS', optionsStyle)

    return (
        <>
            <View 
                style={styles.container}
                onLayout={ev =>
                {
                    console.log(ev.nativeEvent.layout)
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
                <TouchableOpacity onPress={() => setOpen(true)}>
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
            <Modal
                animationType='none'
                visible={open}
                transparent={true}
            >
                <TouchableWithoutFeedback 
                    onPress={() => setOpen(false)}
                > 
                    <View style={styles.optionsCover}>
                        <TouchableOpacity style={optionsStyle}>
                            <Text> TODO - Opções de dropdown e ícones de dropdown</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
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

        optionsCover: {
            flex: 1
            
        },

        optionsContainer: {
            backgroundColor: Palette.mono.t50,
            height: 100,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8
        }


    }
)