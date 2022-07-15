import React from 'react';

import AllPokemons from './components/AllPokemons';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PokemonDetailedCard from './components/PokemonDetailedCard';
import PokemonCard from './components/PokemonCard';
import FavouritePokemon from './components/PokemonFavourite';
import PokemonMap from './components/PokemonMap';
import {Type} from './models/PokemonDetails';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  FavouritePokemon: undefined;
  PokemonMap: undefined;
  PokemonDetailedCard: {
    name: string;
    height: number;
    weight: number;
    base_experience: number;
    id: string;
    types: Type[];
  };
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AllPokemons"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#a69995',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 20,
          },
        }}>
        <Stack.Screen
          name="Pokedex"
          component={AllPokemons}
          options={{title: 'Pokedex'}}
        />
        <Stack.Screen
          name="FavouritePokemon"
          component={FavouritePokemon}
          options={{title: 'Favourite pokemon'}}
        />
        <Stack.Screen name="PokemonCard" component={PokemonCard} />
        <Stack.Screen
          name="PokemonDetailedCard"
          component={PokemonDetailedCard}
          options={{title: 'Pokemon details'}}
        />
        <Stack.Screen
          name="PokemonMap"
          component={PokemonMap}
          options={{title: 'Pokemon map'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
