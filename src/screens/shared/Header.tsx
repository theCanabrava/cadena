import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Palette, Icon } from '../../design-system'

type HeaderProps = { title: string }
const Header = ({title}: HeaderProps) =>
{
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => console.log('Should go back')}>
                <Icon
                    source='back'
                    width={36}
                    height={36}
                    primary={Palette.mono.t50}
                />
            </TouchableOpacity>
            <Text style={styles.title}>
                {title}
            </Text>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create(
    {
        header: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: 8,
            backgroundColor: Palette.deepPurple.t900,
            zIndex: 1
        },

        title: {
            fontFamily: 'Roboto-Bold',
            fontSize: 20,
            paddingLeft: 8,
            color: Palette.mono.t50,
            textAlignVertical: 'center'
        }
    }
)