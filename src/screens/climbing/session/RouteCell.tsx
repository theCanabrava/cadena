import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import State from '../../../business-logic';
import { Icon, Palette } from '../../../design-system';

const RouteCell = ({id}: {id: string}) => {

    const { attempts } = State.stateHooks.useClimbingStore(s => s.currentSession);
    const index = attempts.findIndex(a => a.id === id);

    if(index === -1) return null;

    const { route, dificulty, status } = attempts[index];
    const { palette } = route!.grade;

    const cellStyle = { ...styles.cell, backgroundColor: palette.t50, borderColor: palette.t600 };
    const routePictureStyle = { ...styles.routePicture, backgroundColor: palette.t600 };
    const cellHeaderStyle = { ...styles.cellHeader, borderColor: palette.t300 };
    const cellTitleStyle = { ...styles.cellTitle, color: palette.t900 };
    const routeNumberStyle = { ...styles.routeNumber, color: palette.t300 };
    
    return (
        <View style={cellStyle}>
            <View style={routePictureStyle}>
                <Icon
                    source='camera'
                    height={48}
                    width={48}
                    primary={Palette.mono.t50}
                />
            </View>
            <View style={styles.cellContent}>
                <View style={cellHeaderStyle}>
                    <Text style={cellTitleStyle}>
                        {route!.grade!.name} - {route?.name}
                    </Text>
                    <TouchableOpacity style={styles.editCell} onPress={() => {}}>
                        <Icon
                            source='edit'
                            height={16}
                            width={16}
                            primary={palette.t600}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.section}>
                    Esforço: <Text style={styles.sectionValue}>{dificulty}</Text>
                </Text>
                <Text style={styles.section}>
                    {STATUS_MAP[status]}
                </Text>
            </View>
            <Text style={routeNumberStyle}>
                #{index+1}
            </Text>
        </View>
    )

}

export default RouteCell;

const STATUS_MAP = {
    unfinished: 'Não finalizado',
    worked: 'Trabalhado',
    redpoint: 'Cadena',
    onsight: 'Onsight'
}

const styles = StyleSheet.create(
    {
        cell: {
            flexDirection: 'row',
            padding: 8,
            gap: 8,
            borderRadius: 8,
            borderWidth: 2,
            backgroundColor: Palette.deepPurple.t50,
            borderColor: Palette.deepPurple.t600,
            marginHorizontal: 16,
            marginBottom: 16
        },

        routePicture: {
            justifyContent: 'center',
            alignItems: 'center',
            height: 60,
            width: 60,
            backgroundColor: Palette.deepPurple.t600,
            borderRadius: 4
        },

        cellContent: {
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
            flex: 1
        },

        cellHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            borderBottomWidth: 1,
            borderBottomColor: Palette.deepPurple.t300
        },

        cellTitle: {
            fontFamily: 'Roboto-Bold',
            fontSize: 16,
            color: Palette.deepPurple.t900
        },

        editCell: {
            paddingBottom: 0
        },

        section: {
            fontFamily: 'Roboto-Bold',
            fontSize: 12,
            color: Palette.grey.t900
        },

        sectionValue: {
            fontFamily: 'Roboto-Regular'
        },

        routeNumber: {
            position: 'absolute',
            right: 6,
            bottom: -2,

            fontFamily: 'Roboto-Bold',
            fontSize: 32,
            color: Palette.deepPurple.t300
        }
    }
)