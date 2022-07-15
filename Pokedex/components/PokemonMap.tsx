import {Button, StyleSheet, TextInput, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {PokemonMarker} from '../models/PokemonMarker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PokemonMap(this: any) {
  const [markers, setMarkers] = useState<PokemonMarker[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState('');
  const [display, setDisplay] = useState(true);

  const region = {
    latitude: 50.049683,
    longitude: 19.944544,
    latitudeDelta: 0.0422,
    longitudeDelta: 0.0621,
  };

  const addNewMarker = async (marker: {
    latitude: number;
    longitude: number;
  }) => {
    const markersString = await AsyncStorage.getItem('markers');
    const markersArray =
      markersString !== null ? JSON.parse(markersString) : [];

    function findObject(
      arr: PokemonMarker[],
      newMarker: {latitude: number; longitude: number},
    ) {
      const element = arr.find(oldMarker => {
        return (
          newMarker.latitude === oldMarker.latitude &&
          newMarker.longitude === oldMarker.longitude
        );
      });
      return typeof element === 'object' ? true : false;
    }

    // can't add two pins at the same coordinates
    if (!findObject(markersArray, marker)) {
      markersArray.push({
        name: selectedPokemon,
        latitude: marker.latitude,
        longitude: marker.longitude,
        markerId: markers.length,
      });

      AsyncStorage.setItem('markers', JSON.stringify(markersArray));
      setMarkers(markersArray);
    }
  };

  const getMarkers = useCallback(async () => {
    const markersString = await AsyncStorage.getItem('markers');
    const markersArray =
      markersString !== null ? JSON.parse(markersString) : [];
    setMarkers(markersArray);
  }, []);

  useEffect(() => {
    getMarkers();
  }, [getMarkers]);

  return (
    <View style={styles.container}>
      {display ? (
        <View style={styles.input}>
          <TextInput
            style={styles.input}
            onChangeText={setSelectedPokemon}
            value={selectedPokemon}
            placeholder="Pokemon name"
          />
          <Button
            title="Add"
            onPress={() => {
              setDisplay(false);
            }}
            color={'#a69995'}
          />
        </View>
      ) : null}

      <MapView
        style={styles.map}
        initialRegion={region}
        onPress={event => addNewMarker(event.nativeEvent.coordinate)}>
        {markers.map(marker => (
          <Marker
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.name}
            key={marker.markerId}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  input: {
    borderColor: 'gray',
    width: '70d%',
    zIndex: 10,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
