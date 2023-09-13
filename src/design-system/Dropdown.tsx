import React, { Dispatch, SetStateAction, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Icon from "./icons";
import Palette from "./Palette";

type Option = { id: string, value: string }
type InputProps = { 
    label: string, 
    placeholder: string, 
    option: Option, 
    selectedOption: (v: Option) => void, 
    accessibilityLabel: string,
    options: Option[],
    openHandlers?: [boolean, Dispatch<SetStateAction<boolean>>],
    obrigatory?: boolean,
    description?: string,
    action?: {
        title: string,
        onPress: () => void
    },
    shift?: {
        x: number,
        y: number
    }
}
const Input = ({
    label, 
    placeholder, 
    option, 
    selectedOption, 
    accessibilityLabel, 
    options, 
    openHandlers = useState(false),
    obrigatory = false,
    description,
    action,
    shift = {x: 0, y: 0}
}: InputProps) =>
{
    const [ open, setOpen ] = openHandlers
    const [ position, setPosition ] = useState({left: 0, top: 0, width: 0})

    const selectedStyle = {...styles.selected}
    if(option.value === '') selectedStyle.color = Palette.grey.t600

    const elements = action ? options.length + 1 : options.length;
    const optionsStyle = { 
        ...styles.optionsContainer, 
        ...position, 
        maxHeight: options.length >= 5 ? 150 : (32.8 * elements)
    }

    const optionElements = options.map(o =>
        {
            return (
                <TouchableOpacity
                    onPress={() => 
                    {
                        selectedOption(o);
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
                            left: ev.nativeEvent.layout.x + shift.x,
                            top: ev.nativeEvent.layout.y+53 + shift.y,
                            width: ev.nativeEvent.layout.width
                        }
                    )
                }}
            >
                <Text style={styles.label}>
                    {label}
                </Text>
                <TouchableOpacity onPress={() => setOpen(!open)} accessibilityLabel={accessibilityLabel}>
                    <View style={styles.dropdown}>
                        <Text style={selectedStyle}>
                            { option.value != "" ? option.value : placeholder }
                        </Text>
                        <Icon
                            source='chevron-down'
                            height={24}
                            width={24}
                            primary={Palette.grey.t900}
                            rotation={open ? 180 : 0}
                        />
                    </View>
                </TouchableOpacity>
                {
                    obrigatory &&
                    <Text style={styles.obrigatory}>
                        *Campo obrigatório
                    </Text>
                }
                {
                    description &&
                    <Text style={styles.description}>
                        {description}
                    </Text>
                }
            </View>
            {
                open && 
                <View style={styles.optionsCover}>
                    <ScrollView
                        style={optionsStyle}
                        nestedScrollEnabled
                    >
                        {
                            action &&
                            <TouchableOpacity onPress={action.onPress}>
                                <Text style={styles.action}>
                                    {action.title}
                                </Text>
                            </TouchableOpacity>
                        }
                        {optionElements}
                    </ScrollView>
                </View>
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

        obrigatory: 
        {
            fontFamily: 'Roboto-Regular',
            fontSize: 10,
            color: Palette.red.t600
        },

        description: 
        {
            fontFamily: 'Roboto-Regular',
            fontSize: 10,
            marginHorizontal: 2,
            color: Palette.grey.t900
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

        action: 
        {
            fontFamily: 'Roboto-Regular',
            fontSize: 18,
            color: Palette.deepPurple.t900,
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
            borderBottomRightRadius: 8,
            zIndex: 1
        }

    }
)