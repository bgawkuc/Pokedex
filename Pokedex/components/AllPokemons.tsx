import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
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
import {Input} from 'react-native-elements';

export default function AllPokemons() {
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [url, setUrl] = useState(ApiUrls.FIVE_FIRST_POKEMONS_URL);
  const [searchPokemon, setSearchPokemon] = useState<Pokemon[]>([]);
  const [searchWorking, setSearchWorking] = useState(false);

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

  // search bar (search only through loaded pokemons)
  const handleSearch = (text: string) => {
    text.length > 0 ? setSearchWorking(true) : setSearchWorking(false);
    const filteredData: Pokemon[] = [];

    allPokemons.map((pokemon: Pokemon) => {
      if (pokemon.name.includes(text)) {
        filteredData.push(pokemon);
      }
    });
    setSearchPokemon(filteredData);
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

          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={text => handleSearch(text)}
            placeholder="Search"
            clearButtonMode="always"
            style={styles.searchBar}
          />

          <FlatList
            data={searchWorking ? searchPokemon : allPokemons}
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
  searchBar: {
    width: '90%',
    height: 30,
    fontSize: 16,
    marginLeft: '5%',
    marginBottom: 20,
    textAlign: 'center',
    borderRadius: 12,
    backgroundColor: 'white',
  },
});
