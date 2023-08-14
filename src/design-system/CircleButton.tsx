import React from "react";
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon, { IconSource } from "./icons";
import Palette from "./Palette";

type CircleButtonProps =
{
    iconSource: IconSource,
    onPress: () => void,
    accessibilityLabel: string,
}
const CircleButton = ({onPress, accessibilityLabel, iconSource}: CircleButtonProps) => (
    <TouchableOpacity
        accessibilityLabel={accessibilityLabel}
        onPress={onPress}
    >
        <View style={styles.button}>
            <Icon
                source={iconSource}
                height={80}
                width={80}
                primary={Palette.green.t100}
            />
        </View>
    </TouchableOpacity>
)

export default CircleButton;

const styles = StyleSheet.create(
    {
        button: {
            justifyContent: 'center',
            alignItems: 'center',
            height: 128,
            width: 128,
            borderRadius: 64,
            backgroundColor: Palette.green.t600
        }
    }
)

