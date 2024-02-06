import React, { useEffect, useState, createRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import State from '../../business-logic';
import { IconButton, Palette, TextButton } from '../../design-system';
import Icon from '../../design-system/icons';
import Form from './Form';
import uuid from 'react-native-uuid';
import wait from '../../design-system/wait';
import { ClimbingGym } from '../../business-logic/api';

const AddGym = () =>
{
  const { climbingGyms } = State.stateHooks.useProfileStore();
  const [page, setPage] = useState(climbingGyms.length);
  const scrollRef = createRef<FlatList>();

  const scrollTo = (p: number) => scrollRef.current?.scrollToIndex({index: p, animated: true});

  useEffect(() => {
    if(climbingGyms.length === 0) {
      State.dispatch.profileActions.editGym({
        id: String(uuid.v4()),
        name: '',
        address: '',
        type: 'gym'
      })
    }
  }, [climbingGyms]);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>
            Aonde você escala?
        </Text>
        <Text style={styles.info}>
            Cadastre os ginásios e trilhas aonde você escala.
        </Text>

        <FlatList
          ref={scrollRef}
          data={climbingGyms}
          renderItem={
            ({item}) =>
            (
              <View style={styles.gymItem}>
                <Form id={item.id}/>
              </View>
            )
          }
          horizontal
          pagingEnabled={true}
          keyExtractor={(item) => item.id}
          onScroll={(e) => {
              const x = e.nativeEvent.contentOffset.x;
              const page = Math.round(x/Dimensions.get('window').width);
              setPage(page)
          }}
          getItemLayout={(_, index) => ({
            length: Dimensions.get('window').width, //  WIDTH + (MARGIN_HORIZONTAL * 2)
            offset: Dimensions.get('window').width * (index),  //  ( WIDTH + (MARGIN_HORIZONTAL*2) ) * (index)
            index,
          })}
          showsHorizontalScrollIndicator={false}
        />

        <View style={styles.dashboard}>
          <View style={styles.horizontalButtons}>
            <View style={styles.moreContainer}>
              <TextButton
                label='CADASTRAR MAIS'
                onPress={async () => {
                  State.dispatch.profileActions.editGym({
                    id: String(uuid.v4()),
                    name: '',
                    address: '',
                    type: 'gym'
                  })

                  scrollTo(climbingGyms.length-1);
                }}
                accessibilityLabel='cadastrar-mais'
              />
            </View>
            <IconButton 
              source='trash'
              onPress={async () => {
                if(page === climbingGyms.length -1 ) {
                  scrollTo(page-1);
                  await wait(200);
                }
                State.dispatch.profileActions.removeGym(climbingGyms[page])
              }}
              accessibilityLabel='excluir-academia'
              status={climbingGyms.length > 1 ? 'active' : 'disabled'}
            />
          </View>
          <TextButton
            label='CONTINUAR'
            onPress={async() => {
              await State.dispatch.profileActions.submitGyms();
              await State.dispatch.profileActions.logIn();
            }}
            accessibilityLabel='continuar'
            status={getRegisterStatus(climbingGyms)}
          />
        </View>
      </View>
      {
        page > 0 &&
        <TouchableOpacity 
          style={styles.previousGym}
          onPress={() => scrollTo(page-1)}
        >
          <Icon 
            source='previous'
            height={36}
            width={36}
            primary={Palette.deepPurple.t600}
          />
        </TouchableOpacity>
      }
      {
        page < (climbingGyms.length-1) &&
        <TouchableOpacity 
          style={styles.nextGym}
          onPress={() => scrollTo(page+1)}
        >
          <Icon 
            source='previous'
            height={36}
            width={36}
            rotation={180}
            primary={Palette.deepPurple.t600}
          />
        </TouchableOpacity>
      }
    </>
  )
  
}

export default AddGym;

const getRegisterStatus = (gyms: ClimbingGym[]): "active" | "disabled" => {
  for(let gym of gyms) {
    if(gym.name === '') return 'disabled';
    else if(gym.type !== "gym" && gym.type !== "craig") return "disabled";
  }
  return 'active';
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      paddingVertical: 24,
      backgroundColor: Palette.deepPurple.t50,
      alignItems: 'stretch'
    },

    title: {
      fontFamily: 'Roboto-Bold',
      color: Palette.deepPurple.t800,
      fontSize: 24,
      textAlign: 'left',
      paddingHorizontal: 24
    },

    info: {
        fontFamily: 'Roboto-Regular',
        color: Palette.deepPurple.t800,
        fontSize: 12,
        textAlign: 'left',
        marginBottom: 8,
        paddingHorizontal: 24
    },

    dashboard: {
      height: 56.8,
      justifyContent: 'flex-end', 
      alignItems: 'stretch',
      overflow: 'visible',
      paddingHorizontal: 24
    },

    horizontalButtons: {
      flexDirection: 'row',
      marginBottom: 16
    },

    moreContainer: {
      flex: 1,
      marginRight: 16,
      flexDirection:'column',
      alignContent: 'stretch'
    },

    gymItem: {
      flex: 1, 
      width: Dimensions.get('window').width
    },

    previousGym: {
      position: 'absolute',
      width: 36,
      height: 36,
      top: Dimensions.get('window').height / 2 - 18,
      left: 24
    },

    nextGym: {
      position: 'absolute',
      width: 36,
      height: 36,
      top: Dimensions.get('window').height / 2 - 18,
      right: 24
    }
  }
)