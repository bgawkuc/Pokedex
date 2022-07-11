import React from 'react';

import AllPokemons from './components/AllPokemons';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PokemonDetailedCardScreen from './components/PokemonDetailedCardScreen';
import PokemonCard from './components/PokemonCard';
import FavouritePokemon from './components/FavouritePokemon';
import PokemonMap from './components/PokemonMap';

const Stack = createNativeStackNavigator();

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
        }}>
        <Stack.Screen name="Pokedex" component={AllPokemons} />
        <Stack.Screen name="FavouritePokemon" component={FavouritePokemon} />
        <Stack.Screen name="PokemonCard" component={PokemonCard} />
        <Stack.Screen
          name="PokemonDetailedCardScreen"
          component={PokemonDetailedCardScreen}
        />
        <Stack.Screen name="PokemonMap" component={PokemonMap} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({});
