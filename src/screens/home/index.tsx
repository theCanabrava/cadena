import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useClimbingStore } from '../../business-logic/climbing';
import State from '../../business-logic';
import { Palette } from '../../design-system';
import Icon from '../../design-system/icons';
import { HomeNavigationProps } from '../../navigator/HomeStack';
import AboutYou from './AboutYou';
import Latest from './Latest';
import LetsStart from './LetsStart';
import Progress from './Progress';

const Home = () => {

    const { sessions } = useClimbingStore();
    const newUser = sessions.length === 0;

    return (
        <View style={styles.container}>
            <Header/>
            <ScrollView>
            { newUser && <LetsStart/> }
            {
                !newUser && 
                <>
                    <Progress/>
                    <Latest/>
                    <AboutYou/>
                </>
            }
            <View style={{flex: 1}}/>
                <Text style={styles.footer}>
                    Cadena 2023 - <Text style={styles.footerLink}>Termos de uso</Text>
                </Text>
            </ScrollView>
        </View>
    )
}

export default Home;

const Header = () => {

    const navigation = useNavigation<HomeNavigationProps>();

    return (
        <View style={styles.header}>
            <TouchableOpacity>
                <Icon
                    source='drawer'
                    width={36}
                    height={36}
                    primary={Palette.mono.t50}
                />
            </TouchableOpacity>
            <View style={styles.headerTexts}>
                <Text style={styles.headerTitle}>
                    Cadena
                </Text>
                <TouchableOpacity>
                    <View style={styles.drawer}>
                        <View style={styles.gymContainer}>
                            <Text style={styles.gymName}>
                                Rokaz - Savassi
                            </Text>
                            <Text style={styles.gymLocation}>
                                Belo Horizonte - MG, Brasil
                            </Text>
                        </View>
                        <Icon
                            source='chevron-down'
                            width={26}
                            height={26}
                            primary={Palette.mono.t50}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('home/new-climb')}>
                <Icon
                    source='logo'
                    width={36}
                    height={36}
                    primary={Palette.mono.t50}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Palette.deepPurple.t50,
        alignItems: 'stretch'
    },

    header: {
        backgroundColor: Palette.deepPurple.t900,
        flexDirection: 'row',
        padding: 8
    },

    headerTexts: {
        flexDirection: 'column',
        paddingHorizontal: 8,
        flex: 1,
        alignItems: 'stretch'
    },

    headerTitle: {
        fontFamily: 'Roboto-Bold',
        color: Palette.mono.t50,
        fontSize: 24,
        lineHeight: 36,
        height: 36
    },

    drawer: {
        marginVertical: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    gymContainer: {
        flexDirection: 'column',
    },

    gymName: {
        fontFamily: 'Roboto-Medium',
        color: Palette.mono.t50,
        fontSize: 14,
        lineHeight: 14
    },

    gymLocation: {
        fontFamily: 'Roboto-Regular',
        color: Palette.mono.t50,
        fontSize: 12,
        lineHeight: 12
    },

    footer: {
        fontFamily: 'Roboto-Regular',
        color: Palette.grey.t900,
        fontSize: 12,
        paddingBottom: 8,
        textAlign: 'center',
        marginTop: 29
    },

    footerLink: {
        color: Palette.deepPurple.t900
    }
})