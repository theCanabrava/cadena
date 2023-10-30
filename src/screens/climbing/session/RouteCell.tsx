import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Palette } from '../../../design-system';

const routes = [
    { id: '1', name: 'Arestless', grade: '4', efort: 1, status: 'Encadenado', palette: Palette.deepPurple },
    { id: '2', name: 'Arestida', grade: '5+', efort: 2, status: 'Encadenado', palette: Palette.red },
    { id: '3', name: 'Arestuda', grade: '6B', efort: 3, status: 'Trabalhado', palette: Palette.green },
    { id: '4', name: 'Twister', grade: '7A', efort: 5, status: '', palette: {...Palette.grey, t300: Palette.grey.t400}  },
]
type RouteCellProps = {
    palette: {
        t50: string,
        t300: string,
        t600: string,
        t900: string
    }
}
const RouteCell = ({id}: {id: string}) => {

    const { name, grade, palette, efort, status } = routes.find(r => r.id === id) ?? routes[0];

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
                        {grade} - {name}
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
                    Esforço: <Text style={styles.sectionValue}>{efort}</Text>
                </Text>
                <Text style={styles.section}>
                    {status}
                </Text>
            </View>
            <Text style={routeNumberStyle}>
                #{id}
            </Text>
        </View>
    )

}

export default RouteCell;

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