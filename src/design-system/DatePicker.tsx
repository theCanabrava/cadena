import React, {  useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import RNDatePicker from "react-native-date-picker";
import Icon from "./icons";
import Palette from "./Palette";

type DatePickerProps = { 
    label: string, 
    accessibilityLabel: string,
    obrigatory?: boolean,
    starting?: Date,
    onSelected: (d: Date) => void,
    mode?: 'date' | 'time'
}
const DatePicker = ({
    label, 
    accessibilityLabel, 
    onSelected,
    obrigatory = false,
    starting,
    mode = 'date'
}: DatePickerProps) =>
{

    const selectedStyle = {...styles.selected}
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date | undefined>(starting)
    if(!date) selectedStyle.color = Palette.grey.t600
    
    return (
        <>  
            <View  style={styles.container}>
                <Text style={styles.label}>
                    {label}
                </Text>
                <TouchableOpacity 
                    onPress={() => {setOpen(true)}} 
                    accessibilityLabel={accessibilityLabel}>
                    <View style={styles.picker}>
                        <Text style={selectedStyle}>
                            { displaySelected[mode](date) }
                        </Text>
                        <Icon
                            source={mode === 'date' ? 'calendar' : 'clock'}
                            height={24}
                            width={24}
                            primary={selectedStyle.color}
                        />
                    </View>
                </TouchableOpacity>
                {
                    obrigatory &&
                    <Text style={styles.obrigatory}>
                        *Campo obrigatório
                    </Text>
                }
            </View>
            <RNDatePicker
                modal
                open={open}
                date={date ?? new Date()}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                    onSelected(date)
                }}
                onCancel={() => {setOpen(false)}}
                mode={mode}
            />
        </>
      
    )
}

export default DatePicker;

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

        picker:
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
        }

    }
)

const displaySelected =
{
    date: (d: Date | null | undefined) =>
    {
        if(d === null || d === undefined) return '__ /__ /____'
        else return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}` 
    },

    time: (t: Date | null | undefined) =>
    {
        if(t === null || t === undefined) return '__:__'
        else return `${t.getHours()}:${String(t.getMinutes()).padStart(2, '0')}` 
    }
}