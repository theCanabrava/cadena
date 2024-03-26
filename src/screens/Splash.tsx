import { StyleSheet, View, ActivityIndicator, Text } from "react-native"
import { Icon, Palette } from "../design-system";

const Splash = () => {

    const loading: boolean = true;

    return (
        <View style={styles.screen}>
            <View style={styles.badge}>
                <Icon
                    source="logo"
                    width={60}
                    height={60}
                    primary={Palette.deepPurple.t600}
                />
                <Text style={styles.title}>
                    Cadena
                </Text>
            </View>
            {
                loading && <ActivityIndicator color={Palette.deepPurple.t900} size='large'/>
            }
        </View>
    )
}

export default Splash;

const styles = StyleSheet.create({

    screen: {
        flex: 1,
        backgroundColor: Palette.deepPurple.t50,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 48
    },

    title: {
        fontFamily: 'Roboto-Bold',
        fontSize: 36,
        color: Palette.deepPurple.t600,
    },

    badge: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8
    }

})