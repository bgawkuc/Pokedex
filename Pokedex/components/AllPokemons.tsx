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
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons/faHeart';
import {faEarthAsia} from '@fortawesome/free-solid-svg-icons/faEarthAsia';
import {RootStackParamList} from '../App';
import {ApiUrls} from '../api-urls/ApiUrls';

export default function AllPokemons() {
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [url, setUrl] = useState(ApiUrls.FIVE_FIRST_POKEMONS_URL);

  const loadPokemons = async () => {
    const res = await axios.get(url);
    if (res !== null) {
      setAllPokemons([...allPokemons, ...res.data.results]);
      setUrl(res.data.next);
    }
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  // navigation
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const loadFavouritePokemon = () => {
    navigation.navigate('FavouritePokemon');
  };

  const loadPokemonMap = () => {
    navigation.navigate('PokemonMap');
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
            onEndReached={loadPokemons}
            onEndReachedThreshold={-0.1}
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
