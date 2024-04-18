import { View } from 'react-native';
import { Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import Listings from '@/components/Listings';
import { useState } from 'react';

const Page = () => {
  const [category, setCategory] = useState('Tiny homes');
  const onDataChanged = (category: string) => {
    setCategory(category);
  };
  return (
    <View
      style={{
        flex: 1,
        marginTop: 130,
      }}
    >
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      <Listings listings={[]} category={category} />
    </View>
  );
};

export default Page;
