import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import axios from 'axios';
import {PokemonDetails} from '../models/PokemonDetails';
import {Pokemon} from '../models/Pokemon';
import {RootStackParamList} from '../App';

export default function PokemonCard({name, url}: Pokemon) {
  const pokemonDetailsLink = `https://pokeapi.co/api/v2/pokemon/${name}`;
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    null,
  );

  function pokemonImg() {
    const id = url.split('/')[url.split('/').length - 2];
    return `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${id}.png?raw=true`;
  }

  const loadPokemonDetails = useCallback(async () => {
    if (pokemonDetailsLink !== null) {
      const res = await axios.get(pokemonDetailsLink);
      setPokemonDetails(res.data);
    }
  }, [pokemonDetailsLink]);

  useEffect(() => {
    loadPokemonDetails();
  }, [loadPokemonDetails]);

  // navigation
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const loadOnePokemon = () => {
    if (pokemonDetails !== null) {
      navigation.navigate('PokemonDetailedCard', {
        name: pokemonDetails.name,
        height: pokemonDetails.height,
        weight: pokemonDetails.weight,
        base_experience: pokemonDetails.base_experience,
        id: pokemonDetails.id,
        types: pokemonDetails.types,
      });
    }
  };

  return (
    <View style={styles.card}>
      {pokemonDetails !== null ? (
        <TouchableOpacity onPress={loadOnePokemon} style={styles.cardElements}>
          <View style={styles.info}>
            <Text style={styles.name}>{name} </Text>
            <Text style={styles.type}>{pokemonDetails.types[0].type.name}</Text>
          </View>

          <Image
            style={styles.img}
            source={{
              uri: pokemonImg(),
            }}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 120,
    height: 120,
    marginTop: 10,
    paddingRight: '5%',
  },
  card: {
    width: '90%',
    left: '5%',
    height: 140,
    backgroundColor: '#dececa',
    marginBottom: 10,
    borderRadius: 20,
  },
  cardElements: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    marginLeft: '10%',
  },
  name: {
    color: 'white',
    fontSize: 26,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  type: {
    textTransform: 'uppercase',
    marginTop: 5,
    marginLeft: 5,
  },
});
