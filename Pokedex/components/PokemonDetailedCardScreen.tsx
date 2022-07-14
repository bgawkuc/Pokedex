import {View} from 'react-native';
import React from 'react';

import {PokemonDetails} from '../models/PokemonDetails';
import PokemonInformation from './PokemonInformation';

export default function PokemonDetailedCardScreen({route}: any) {
  const pokemon: PokemonDetails | null =
    route.params !== undefined ? route.params : null;

  return (
    <View>
      <PokemonInformation pokemon={pokemon} />
    </View>
  );
}
