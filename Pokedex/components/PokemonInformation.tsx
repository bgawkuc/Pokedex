import {View, Text, Image, TouchableHighlight, Alert} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faRulerVertical} from '@fortawesome/free-solid-svg-icons/faRulerVertical';
import {faScaleBalanced} from '@fortawesome/free-solid-svg-icons/faScaleBalanced';
import {faClock} from '@fortawesome/free-solid-svg-icons/faClock';
import {faHeart} from '@fortawesome/free-solid-svg-icons/faHeart';
import GlobalStyles from '../styles/GlobalStyles';
import {PokemonDetails, Type} from '../models/PokemonDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApiUrls} from '../api-urls/ApiUrls';

const FAVOURITE_KEY = 'favourite';

export default function PokemonInformation(props: any) {
  const [pokemon, setPokemon] = useState(props.pokemon);
  const [favouritePokemon, setFavouritePokemon] =
    useState<PokemonDetails | null>(null);

  const getPokemon = useCallback(async () => {
    props.pokemon !== undefined
      ? setPokemon(props.pokemon)
      : setPokemon(favouritePokemon);
  }, [favouritePokemon, props.pokemon]);

  // delete current favourite pokemon
  const deleteFavourite = () => {
    AsyncStorage.removeItem(FAVOURITE_KEY);
    setFavouritePokemon(null);
  };

  // set current pokemon as favourite
  const setFavourite = useCallback(async () => {
    const pokemonString = pokemon !== null ? JSON.stringify(pokemon) : null;
    try {
      pokemonString !== null
        ? AsyncStorage.setItem(FAVOURITE_KEY, pokemonString)
        : null;
      Alert.alert('new favourite pokemon');
      setFavouritePokemon(pokemon);
    } catch (err) {
      console.log(err);
    }
  }, [pokemon]);

  // set/delete current favourite pokemon
  const changeFavouritePokemon = useCallback(async () => {
    const pokemonString = await AsyncStorage.getItem(FAVOURITE_KEY);
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

  // get current favourite pokemon
  const getFavourite = useCallback(async () => {
    const pokemonString = await AsyncStorage.getItem(FAVOURITE_KEY);
    const pokemonJson =
      pokemonString !== null ? JSON.parse(pokemonString) : null;
    if (pokemonJson !== null) {
      setFavouritePokemon({
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
    getPokemon();
    getFavourite();
  }, [getFavourite, getPokemon]);

  const pokemonImg = (id: string) =>
    ApiUrls.IMAGE_URL_START + `${id}` + ApiUrls.IMAGE_URL_END;

  return (
    <View>
      {pokemon !== undefined && pokemon !== null ? (
        <View style={GlobalStyles.card}>
          <Text style={GlobalStyles.name}>{pokemon.name} </Text>

          <View style={GlobalStyles.imgContainer}>
            <Image
              style={GlobalStyles.img}
              source={{
                uri: pokemonImg(pokemon.id),
              }}
            />
          </View>

          <View style={GlobalStyles.cardDetails}>
            <View style={[GlobalStyles.type, GlobalStyles.cardElement]}>
              {pokemon.types.map((el: Type) => (
                <View
                  key={el.type.name}
                  style={GlobalStyles.typeNameBackground}>
                  <Text style={GlobalStyles.typeName}>{el.type.name}</Text>
                </View>
              ))}
            </View>

            <Text style={[GlobalStyles.about, GlobalStyles.cardElement]}>
              About
            </Text>

            <View style={[GlobalStyles.info, GlobalStyles.cardElement]}>
              <View style={GlobalStyles.infoCol}>
                <View style={GlobalStyles.infoRow}>
                  <FontAwesomeIcon icon={faRulerVertical} size={20} />
                  <Text style={GlobalStyles.infoRowValue}>
                    {pokemon.height}
                  </Text>
                </View>
                <Text>Height</Text>
              </View>

              <View style={GlobalStyles.infoCol}>
                <View style={GlobalStyles.infoRow}>
                  <FontAwesomeIcon icon={faScaleBalanced} size={20} />
                  <Text style={GlobalStyles.infoRowValue}>
                    {pokemon.weight}
                  </Text>
                </View>
                <Text>Weight</Text>
              </View>

              <View style={GlobalStyles.infoCol}>
                <View style={GlobalStyles.infoRow}>
                  <FontAwesomeIcon icon={faClock} size={20} />
                  <Text style={GlobalStyles.infoRowValue}>
                    {pokemon.base_experience}
                  </Text>
                </View>
                <Text>Experience</Text>
              </View>
            </View>

            {props.pokemon !== undefined ? (
              <View>
                <TouchableHighlight onPress={changeFavouritePokemon}>
                  <View style={[GlobalStyles.favBtn, GlobalStyles.cardElement]}>
                    {favouritePokemon !== null &&
                    favouritePokemon.name === pokemon.name ? (
                      <FontAwesomeIcon icon={faHeart} color={'red'} size={30} />
                    ) : (
                      <FontAwesomeIcon
                        icon={faHeart}
                        color={'green'}
                        size={30}
                      />
                    )}
                  </View>
                </TouchableHighlight>
              </View>
            ) : (
              <View style={[GlobalStyles.favBtn, GlobalStyles.cardElement]}>
                <TouchableHighlight onPress={deleteFavourite}>
                  <FontAwesomeIcon icon={faHeart} color={'red'} size={30} />
                </TouchableHighlight>
              </View>
            )}
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
