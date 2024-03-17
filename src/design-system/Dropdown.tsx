import { Dispatch, SetStateAction, ReactElement, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, TouchableWithoutFeedback, Dimensions, FlatList } from 'react-native';
import Icon from "./icons";
import Palette from "./Palette";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type DropdownProps<T> = { 
    option?: T, 
    options: T[],
    extractOption: (d: T) => {id: string, value: string},
    selectedOption: (v: T) => void, 
    label: string, 
    placeholder: string, 
    accessibilityLabel: string,
    obrigatory?: boolean,
    description?: string,
    Header?: ReactElement,
    renderCell?: (o: T, onPress: () => void) => ReactElement,
    openHandlers?: [boolean, Dispatch<SetStateAction<boolean>>],
}
function Dropdown<T> ({
    option,
    options,
    extractOption,
    selectedOption,
    label,
    placeholder,
    accessibilityLabel,
    obrigatory,
    description,
    Header,
    renderCell,
    openHandlers = useState(false),
}: DropdownProps<T>)
{

    const [ open, setOpen ] = openHandlers;
    const { bottom } = useSafeAreaInsets();
    const selectedStyle = {...styles.selected};
    if(option === undefined) selectedStyle.color = Palette.grey.t600;


    return (
        <>
            <View  style={styles.container}>
                <Text style={styles.label}>
                    {label}
                </Text>
                <TouchableOpacity onPress={() => {setOpen(true)}} accessibilityLabel={accessibilityLabel}>
                    <View style={styles.dropdown}>
                        <Text style={selectedStyle}>
                            { option === undefined ? placeholder : extractOption(option).value }
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
            <Modal
                transparent={true}
                visible={open}
                animationType='slide'
            >
                <TouchableWithoutFeedback 
                    onPress={() => setOpen(false)} 
                    accessibilityLabel='modal-cover'
                >
                    <View style={styles.modalCover}>
                        <View style={styles.modal}>
                            <FlatList 
                                ListHeaderComponent={Header}
                                ListFooterComponent={<View style={{height: bottom + 8}}/>}
                                data={options}
                                renderItem={({item}) => {

                                    const onPress = () => {
                                        setOpen(false);
                                        selectedOption(item);
                                    };

                                    if(renderCell === undefined) {
                                        const extractedOption = extractOption(item); 
                                        return (
                                            <DefaultCell 
                                                key={extractedOption.id}
                                                onPress={onPress}
                                                label={extractedOption.value}
                                            />
                                        )
                                    } else {
                                        return renderCell(item, onPress);
                                    }
                                }}
                                
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
        
    )
}

export default Dropdown;

const DefaultCell = ({label, onPress}: {label: string, onPress: () => void}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.option}>
                {label}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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

    modalCover: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'stretch'
    },

    modal: {
        height: Dimensions.get('window').height * 0.4,
        backgroundColor: Palette.mono.t50,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingTop: 8
    },

    option: 
    {
        fontFamily: 'Roboto-Regular',
        fontSize: 18,
        color: Palette.grey.t900,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },

    footer: {
        height: 16
    }
})