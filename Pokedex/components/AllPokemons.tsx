import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

import PokemonCard from './PokemonCard';
import {Pokemon} from '../models/Pokemon';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons/faHeart';
import {faEarthAsia} from '@fortawesome/free-solid-svg-icons/faEarthAsia';

type RootStackParamList = {
  FavouritePokemon: {};
};

type RootStackParamList2 = {
  PokemonMap: {};
};

export default function AllPokemons() {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=5&offset=';
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const loadMorePokemons = async () => {
    if (isLoading && count < 1155) {
      setCount(count + 5);
      const res = await axios.get(url + `${count}`);
      setAllPokemons([...allPokemons, ...res.data.results]);
      setIsLoading(false);
    }
  };

  const loadPokemons = async () => {
    const res = await axios.get(url + '0');
    setCount(count + 5);
    setAllPokemons(res.data.results);
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  // favourite route
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const loadFavouritePokemon = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'FavouritePokemon',
      }),
    );
  };

  // map route
  const navigation2 = useNavigation<StackNavigationProp<RootStackParamList2>>();

  const loadPokemonMap = () => {
    navigation2.dispatch(
      CommonActions.navigate({
        name: 'PokemonMap',
      }),
    );
  };

  return (
    <View>
      {allPokemons.length === 0 ? (
        <Text>Loading pokemons</Text>
      ) : (
        <View>
          <View style={styles.menu}>
            <TouchableHighlight onPress={loadFavouritePokemon}>
              <FontAwesomeIcon icon={faHeart} color={'#a69995'} size={30} />
            </TouchableHighlight>
            <TouchableHighlight onPress={loadPokemonMap}>
              <FontAwesomeIcon icon={faEarthAsia} color={'#a69995'} size={30} />
            </TouchableHighlight>
          </View>

          <FlatList
            data={allPokemons}
            renderItem={({item: pokemon}) => (
              <PokemonCard name={pokemon.name} url={pokemon.url} />
            )}
            keyExtractor={pokemon => pokemon.name}
            onEndReached={loadMorePokemons}
            onEndReachedThreshold={-0.1}
            onScrollBeginDrag={() => {
              setIsLoading(true);
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 20,
  },
});
