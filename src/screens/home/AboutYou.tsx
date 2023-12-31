import { View, Text, StyleSheet } from 'react-native';
import { Icon, Palette, TextButton } from '../../design-system';
import Label from './shared/Label';

const AboutYou = () =>
{
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Sobre você:
            </Text>
            <Text style={styles.text}>
                Continue se esforçando!
            </Text>
            <View style={styles.content}>
                <ProfileBadge />
                <Label title='Já foi escalar' value='3 vezes'/>
                <Label title='Escala' value='5 vias por seção'/>
                <Label title='Modalidade favorita' value='Top Rope'/>
                <Label title='Graduação média' value='5' color={Palette.orange.t900}/>
            </View>
            <ClimbUpTo grade='6B' palette={Palette.green}/>
            <View style={styles.buttonContainer}>
                <TextButton
                    label="VER PERFIL"
                    onPress={() => {}}
                    accessibilityLabel='ver-perfil'
                    size='small'
                    sourceLeft='profile'
                    status='secondary'
                />
            </View>
        </View>
    )
}

export default AboutYou;

const ProfileBadge = () => {
    return (
        <View style={profileStyles.container}>
            <View style={profileStyles.picture}>
                <Icon
                    source='camera'
                    primary={Palette.orange.t600}
                    height={40}
                    width={40}
                />
            </View>
            <View>
                <Text style={profileStyles.username}>
                    Nome de Usuário
                </Text>
                <Text style={profileStyles.climbs}>
                    Escala há menos de 1 mês
                </Text>
            </View>
        </View>
    )
}

const ClimbUpTo = ({grade, palette}: {grade: string, palette: { t50: string, t900: string}}) => {


    const containerStyle = {
        ...climbUpToStyles.container,
        backgroundColor: palette.t50
    };

    const gradeStyle = {
        ...climbUpToStyles.grade,
        color: palette.t900
    };

    return (
        <View style={containerStyle}>
            <Text style={climbUpToStyles.label}>
                Consegue escalar:
            </Text>
            <Text style={gradeStyle}>
                {grade}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            borderRadius: 16,
            backgroundColor: Palette.mono.t50,
            justifyContent: 'flex-start',
            alignItems: 'stretch',
            marginTop: 24,
            marginHorizontal: 24,
            paddingVertical: 16,
            paddingHorizontal: 8,
        },

        content: {
            justifyContent: 'flex-start',
            alignItems: 'stretch',
            paddingHorizontal: 8
        },

        title: {
            fontFamily: 'Roboto-Bold',
            fontSize: 16,
            color: Palette.grey.t900
        },

        text: {
            fontFamily: 'Roboto-Regular',
            fontSize: 14,
            lineHeight: 20,
            color: Palette.grey.t900,
            marginBottom: 8
        },

        buttonContainer: {
            alignSelf: 'flex-end',
            marginTop: 16,
            paddingHorizontal: 8
        }
    }
)

const profileStyles = StyleSheet.create(
    {
        container: {
            flexDirection: 'row',
            gap: 12,
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginBottom: 8
        },

        picture: {
            height: 64,
            width: 64,
            borderRadius: 32,
            backgroundColor: Palette.orange.t300,
            justifyContent: 'center',
            alignItems: 'center'
        },

        username: {
            fontFamily: 'Roboto-Bold',
            fontSize: 16,
            color: Palette.grey.t900,
        },

        climbs: {
            fontFamily: 'Roboto-Regular',
            fontSize: 14,
            color: Palette.grey.t900,
        }


    }
)

const climbUpToStyles = StyleSheet.create({

    container: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        backgroundColor: Palette.green.t50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },

    label: {
        fontFamily: 'Roboto-Bold',
        fontSize: 14,
        color: Palette.grey.t900,
        marginBottom: 2
    },

    grade: {
        fontFamily: 'Roboto-Bold',
        fontSize: 24,
        color: Palette.green.t900
    }

})