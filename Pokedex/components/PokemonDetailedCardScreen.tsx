import {Image, Text, View} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faRulerVertical} from '@fortawesome/free-solid-svg-icons/faRulerVertical';
import {faScaleBalanced} from '@fortawesome/free-solid-svg-icons/faScaleBalanced';
import {faClock} from '@fortawesome/free-solid-svg-icons/faClock';

import PokemonFavouriteBtn from './PokemonFavouriteBtn';
import {PokemonDetails} from '../models/PokemonDetails';
import GlobalStyles from '../styles/GlobalStyles';

export default function PokemonDetailedCardScreen({route}: any) {
  const pokemon: PokemonDetails | null =
    route.params !== undefined ? route.params : null;

  const pokemonImg = (id: string) =>
    `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${id}.png?raw=true`;

  return (
    <View>
      {pokemon !== null ? (
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

          <View style={GlobalStyles.info}>
            <View style={GlobalStyles.infoRow}>
              <FontAwesomeIcon
                icon={faRulerVertical}
                color={'white'}
                size={20}
              />
              <Text style={GlobalStyles.infoElement}>{pokemon.height}</Text>
            </View>
            <View style={GlobalStyles.infoRow}>
              <FontAwesomeIcon
                icon={faScaleBalanced}
                color={'white'}
                size={20}
              />
              <Text style={GlobalStyles.infoElement}>{pokemon.weight}</Text>
            </View>
            <View style={GlobalStyles.infoRow}>
              <FontAwesomeIcon icon={faClock} color={'white'} size={20} />
              <Text style={GlobalStyles.infoElement}>
                {pokemon.base_experience}
              </Text>
            </View>
          </View>

          <PokemonFavouriteBtn pokemon={pokemon} />
        </View>
      ) : (
        <Text>err</Text>
      )}
    </View>
  );
}
