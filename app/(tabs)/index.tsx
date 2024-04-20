import { useMemo, useState } from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';

import ExploreHeader from '@/components/ExploreHeader';
import Listings from '@/components/listings/Listings';

import listingData from '@/assets/data/airbnb-listings.json';

const Page = () => {
  const [category, setCategory] = useState('Tiny homes');

  const items = useMemo(() => listingData as any, []);

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
      <Listings listings={items} category={category} />
    </View>
  );
};

export default Page;
