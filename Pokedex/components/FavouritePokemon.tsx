import {Image, Text, TouchableHighlight, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PokemonDetails} from '../models/PokemonDetails';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons/faHeart';
import {faRulerVertical} from '@fortawesome/free-solid-svg-icons/faRulerVertical';
import {faScaleBalanced} from '@fortawesome/free-solid-svg-icons/faScaleBalanced';
import {faClock} from '@fortawesome/free-solid-svg-icons/faClock';
import GlobalStyles from '../styles/GlobalStyles';

export default function FavouritePokemon() {
  const [favouritePokemon, setFavouritePokemon] = useState(null);
  const [favouritePokemonObj, setFavouritePokemonObj] =
    useState<PokemonDetails | null>(null);

  const deleteFavourite = () => {
    AsyncStorage.removeItem('favourite');
    setFavouritePokemon(null);
  };

  const pokemonImg = (id: string) =>
    `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${id}.png?raw=true`;

  const getFavourite = useCallback(async () => {
    const pokemonString = await AsyncStorage.getItem('favourite');
    const pokemonJson =
      pokemonString !== null ? JSON.parse(pokemonString) : null;
    if (pokemonJson !== null) {
      setFavouritePokemon(pokemonJson);
      setFavouritePokemonObj({
        name: pokemonJson.name,
        height: pokemonJson.height,
        weight: pokemonJson.weight,
        base_experience: pokemonJson.base_experience,
        id: pokemonJson.id,
        types: pokemonJson.types,
      });
    } else {
      setFavouritePokemon(null);
    }
  }, []);

  useEffect(() => {
    getFavourite();
  }, [getFavourite]);

  return (
    <View>
      {favouritePokemon !== null && favouritePokemonObj !== null ? (
        <View>
          <View style={GlobalStyles.card}>
            <Text style={GlobalStyles.name}>{favouritePokemonObj.name} </Text>
            <View style={GlobalStyles.imgContainer}>
              <Image
                style={GlobalStyles.img}
                source={{
                  uri: pokemonImg(favouritePokemonObj.id),
                }}
              />
            </View>

            <View style={GlobalStyles.info}>
              <View style={GlobalStyles.infoRow}>
                <FontAwesomeIcon
                  icon={faRulerVertical}
                  color={'white'}
                  size={20}
                />
                <Text style={GlobalStyles.infoElement}>
                  {favouritePokemonObj.height}
                </Text>
              </View>
              <View style={GlobalStyles.infoRow}>
                <FontAwesomeIcon
                  icon={faScaleBalanced}
                  color={'white'}
                  size={20}
                />
                <Text style={GlobalStyles.infoElement}>
                  {favouritePokemonObj.weight}
                </Text>
              </View>
              <View style={GlobalStyles.infoRow}>
                <FontAwesomeIcon icon={faClock} color={'white'} size={20} />
                <Text style={GlobalStyles.infoElement}>
                  {favouritePokemonObj.base_experience}
                </Text>
              </View>
            </View>

            <View style={GlobalStyles.favBtn}>
              <TouchableHighlight onPress={deleteFavourite}>
                <FontAwesomeIcon icon={faHeart} color={'red'} size={30} />
              </TouchableHighlight>
            </View>
          </View>
        </View>
      ) : (
        <View style={[GlobalStyles.card, GlobalStyles.emptyCard]}>
          <Text style={[GlobalStyles.name]}>No favourite</Text>
        </View>
      )}
    </View>
  );
}
