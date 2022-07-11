import {Alert, TouchableHighlight, View} from 'react-native';

import React, {useEffect, useState, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons/faHeart';
import GlobalStyles from '../styles/GlobalStyles';

export default function PokemonFavouriteBtn(props: any) {
  const pokemon = props.pokemon;
  const [isFavourite, setIsFavourite] = useState(false);

  const setFavourite = useCallback(async () => {
    const pokemonString = pokemon !== null ? JSON.stringify(pokemon) : null;
    try {
      pokemonString !== null
        ? AsyncStorage.setItem('favourite', pokemonString)
        : null;
      Alert.alert('new favourite pokemon');
      setIsFavourite(true);
    } catch (err) {
      console.log(err);
    }
  }, [pokemon]);

  const deleteFavourite = () => {
    AsyncStorage.removeItem('favourite');
    setIsFavourite(false);
  };

  const changeFavouritePokemon = useCallback(async () => {
    const pokemonString = await AsyncStorage.getItem('favourite');
    const pokemonJson =
      pokemonString !== null ? JSON.parse(pokemonString) : null;
    if (
      pokemon !== null &&
      pokemonJson !== null &&
      pokemon.name === pokemonJson.name
    ) {
      deleteFavourite();
    } else if (pokemon !== null) {
      setFavourite();
    }
  }, [pokemon, setFavourite]);

  const getFavourite = useCallback(async () => {
    const pokemonString = await AsyncStorage.getItem('favourite');
    const pokemonJson =
      pokemonString !== null ? JSON.parse(pokemonString) : null;
    if (
      pokemon !== null &&
      pokemonJson !== null &&
      pokemon.name === pokemonJson.name
    ) {
      setIsFavourite(true);
    }
  }, [pokemon]);

  useEffect(() => {
    getFavourite();
  }, [props.pokemon, getFavourite]);

  return (
    <View>
      <TouchableHighlight onPress={changeFavouritePokemon}>
        <View style={GlobalStyles.favBtn}>
          {isFavourite ? (
            <FontAwesomeIcon icon={faHeart} color={'red'} size={30} />
          ) : (
            <FontAwesomeIcon icon={faHeart} color={'green'} size={30} />
          )}
        </View>
      </TouchableHighlight>
    </View>
  );
}
