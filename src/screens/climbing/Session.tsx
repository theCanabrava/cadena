import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Palette, TextButton } from '../../design-system';
import Header from '../shared/Header';

const Session = () =>
{
    return (
        <View style={styles.container}>
            <Header title='Rokaz - Savassi'/>
            <ScrollView style={styles.formContainer}>
                <SessionDetails/>
                <View style={styles.addContainer}>
                    <TextButton
                        label='ADICIONAR VIA'
                        onPress={() => {}}
                        accessibilityLabel='adicionar-via'
                        status='outlined'
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>
                        Vamos escalar!
                    </Text>
                    <Text style={styles.text}>
                        Registre as vias que você escalar aqui clicando no botão “Adicionar via”.
                    </Text>
                    <View style={styles.imagePlaceholder}/>
                </View>
            </ScrollView>
                <View style={styles.endContainer}>
                    <TextButton
                        label='FINALIZAR SEÇÃO'
                        onPress={() => {}}
                        accessibilityLabel='finalizar'
                        status='carefull'
                    />
                </View>
        </View>
    )
}

const SessionDetails = () =>
{
    return (
        <View style={styles.details}>
            <Text style={styles.detailTitle}>
                Data: <Text style={styles.detailValue}>24/03/2023</Text>
            </Text>
            <View style={styles.timeRow}>
                <Text style={styles.detailTitle}>
                    Início: <Text style={styles.detailValue}>08:00</Text>
                </Text>
                <Text style={[styles.detailTitle, styles.end]}>
                    Fim: <Text style={styles.detailValue}>09:00</Text>
                </Text>
                <Text style={[styles.detailTitle, styles.detailPurple, styles.remaining]}>
                    Restante: <Text style={styles.detailValue}>00:47</Text>
                </Text>
            </View>
            <Text style={styles.detailTitle}>
                Vias escaladas: <Text style={styles.detailValue}>3</Text>
            </Text>
            <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                    <View style={styles.filled}/>
                    <View style={styles.unfilled}/>
                </View>
                <Text style={styles.ammount}>
                    10
                </Text>
            </View>
        </View>
    );
}

export default Session;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        flex: 1,
        backgroundColor: Palette.mono.t50
    },

    formContainer: { flex: 1 },

    details: {
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        margin: 16,
        borderBottomWidth: 2,
        borderBottomColor: Palette.deepPurple.t800
    },

    detailTitle: {
        fontFamily: 'Roboto-Bold',
        fontSize: 14,
        color: Palette.grey.t900,
        marginBottom: 8
    },

    detailValue: {
        fontFamily: 'Roboto-Regular',
    },

    detailPurple: {
        color: Palette.deepPurple.t900
    },

    timeRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    end: {
        marginLeft: 14
    },

    remaining: {
        flex: 1,
        textAlign: 'right'
    },

    progressContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    progressBar: {
        flex: 1,
        marginRight: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Palette.green.t200,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        overflow: 'hidden'
    },

    filled: {
        flex: 0.3,
        backgroundColor: Palette.green.t600,
        borderRadius: 4
    },

    unfilled: { flex: 0.7 },

    ammount: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: Palette.green.t600
    },

    addContainer: {
        marginHorizontal: 16,
        marginBottom: 24
    },

    textContainer: {
        marginHorizontal: 16
    },

    title: {
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        color: Palette.grey.t900
    },

    text: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        lineHeight: 18,
        color: Palette.grey.t900,
        marginBottom: 8
    },

    imagePlaceholder: {
        alignSelf: 'center',
        height: 154,
        width: 154,
        backgroundColor: Palette.green.t300,
        borderRadius: 77,
        marginBottom: 8
    },

    endContainer: {
        margin: 24,
        justifyContent: 'center',
        alignItems: 'stretch'
    }
})

