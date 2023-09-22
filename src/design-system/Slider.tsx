import { View, Text, StyleSheet } from 'react-native';
import Palette from './Palette';
import {Slider as RNSlider} from '@miblanchard/react-native-slider';

type ProgressProps = {
    value: number,
    setValue: (n: number) => void,
    label: string,
    accessibilityLabel: string,
    minimun?: number,
    maximun?: number
}
const Slider = ({value, setValue, label, accessibilityLabel, minimun = 1, maximun = 5}: ProgressProps) => {

    return (
        <View style={styles.progress} accessibilityLabel={accessibilityLabel}>
            <Text style={styles.label}>
                {label}: <Text style={styles.value}>{value}</Text>
            </Text>
            <RNSlider
                value={[value]}
                minimumValue={minimun}
                maximumValue={maximun}
                onValueChange={(v) => setValue(v[0])}
                minimumTrackTintColor={Palette.deepPurple.t900}
                maximumTrackTintColor={Palette.deepPurple.t300}
                thumbTintColor={Palette.deepPurple.t600}
                thumbStyle={styles.thumb}
                trackStyle={styles.track}
                step={1}
            />
        </View>
    )
}

export default Slider;

const styles = StyleSheet.create({
    progress: {
        flexDirection: 'column',
        alignItems: 'stretch',
    },

    label: {
        fontFamily: 'Roboto-Bold',
        fontSize: 14,
        color: Palette.deepPurple.t900
    },

    value: {
        fontFamily: 'Roboto-Regular',
    },

    thumb: {
        width: 24, 
        height: 24, 
        borderRadius: 12,
        marginVertical: 6
    },

    track: {
        height: 8, 
        borderRadius: 4
    }
})