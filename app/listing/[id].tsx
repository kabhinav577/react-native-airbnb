import { View, Text } from 'react-native';
import React from 'react';
import { useGlobalSearchParams } from 'expo-router';

const ListingIdPage = () => {
  const { id } = useGlobalSearchParams<{ id: string }>();

  return (
    <View>
      <Text>ListingIdPage</Text>
    </View>
  );
};

export default ListingIdPage;
