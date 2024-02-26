import { Modal, StyleSheet, Text, View, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Dimensions } from "react-native";
import { Icon, Palette } from "../design-system";
import State from "../business-logic";
import { ClimbingGym } from "../business-logic/api";

const GymModal = () =>
{
    const { displayGymSelector, climbingGyms } = State.stateHooks.useProfileStore();
    const renderedContracts = climbingGyms.map(g =>
    (
        <GymCell
            key={g.id}
            gym={g}
        />
    ))

    return (
        <>
            {
                displayGymSelector &&  <View style={styles.cover}/>
            }
            <Modal
                animationType="slide"
                transparent={true}
                visible={displayGymSelector}
                onRequestClose={() => State.dispatch.profileActions.toggleGymModal(false)}
            >
                <TouchableWithoutFeedback
                    onPress={() => State.dispatch.profileActions.toggleGymModal(false)}
                >
                    <View style={styles.container}>
                        <TouchableWithoutFeedback>
                            <View style={styles.view}>
                                <ScrollView>
                                { renderedContracts }
                                </ScrollView>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    )
}


type GymCellProps =
{
    gym: ClimbingGym
}
const GymCell = ({gym}: GymCellProps) =>
{
    const selectInstalation = () =>
    {
        State.dispatch.profileActions.selectGym(gym);
        State.dispatch.profileActions.toggleGymModal(false);
    }

    return (
        <TouchableOpacity onPress={selectInstalation}>
            <View style={styles.cell}>
                <View>
                    <Text style={styles.gym}>
                        {gym.name}
                    </Text>
                    <Text style={styles.address}>
                        {gym.address === '' ? 'Endereço não informado' : gym.address}
                    </Text>
                </View>
                <Icon
                    source="previous"
                    primary={Palette.grey.t700}
                    height={22}
                    width={22}
                    rotation={180}
                />
            </View>
        </TouchableOpacity>
    )
}

export default GymModal;

const styles = StyleSheet.create(
    {
        container:
        {
            justifyContent: 'flex-end',
            alignItems: 'stretch',
            flex: 1
        },

        cover: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#00000030'
        },

        view:
        {
            backgroundColor: Palette.grey.t50,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 24,
            paddingBottom: 40,
            maxHeight: Dimensions.get('window').height - 180
        },

        //Celula de instalação
        cell:
        {
            paddingVertical: 16,
            marginHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomColor: Palette.grey.t200,
            borderBottomWidth: 1,
            alignItems: 'center'
        },

        address:
        {
            fontFamily: 'Montserrat-Medium',
            fontSize: 14,
            lineHeight: 20,
            color: Palette.grey.t700
        },

        gym:
        {
            fontFamily: 'Montserrat-Regular',
            fontSize: 13,
            lineHeight: 18,
            color: Palette.grey.t900
        }
    }
)