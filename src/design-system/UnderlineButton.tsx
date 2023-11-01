import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Palette from './Palette';

type UnderlineButtonProps = {
    label: string,
    status: 'selected' | 'unselected',
    onPress: () => void,
    accessibilityLabel: string
}
const UnderlineButton = ({label, status, onPress, accessibilityLabel}: UnderlineButtonProps) => {

    const viewStyle = {
        ...styles.container,
        borderBottomColor: status === 'selected' ? Palette.deepPurple.t900 : Palette.deepPurple.t300
    }

    const textStyle = {
        ...styles.text,
        color: status === 'selected' ? Palette.deepPurple.t900 : Palette.deepPurple.t300
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            accessibilityLabel={accessibilityLabel}
        >
            <View style={viewStyle}>
                <Text style={textStyle}>
                    {label}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default UnderlineButton;

const styles = StyleSheet.create(
    {
        container: {
            width: 56,
            height: 16,
            borderBottomWidth: 1,
            borderBottomColor: Palette.deepPurple.t900,
            justifyContent: 'center',
            alignItems: 'center'
        },

        text: {
            fontFamily: 'Roboto-Regular',
            fontSize: 16,
            lineHeight: 16,
            color: Palette.deepPurple.t900
        }
    }
)