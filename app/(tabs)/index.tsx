import { useMemo, useState } from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';

import Listings from '@/components/listings/Listings';
import ExploreHeader from '@/components/ExploreHeader';
import ListingsMap from '@/components/listings/ListingsMap';

import listingData from '@/assets/data/airbnb-listings.json';
import listingGeoData from '@/assets/data/airbnb-listings.geo.json';

const Page = () => {
  const [category, setCategory] = useState('Tiny homes');

  const items = useMemo(() => listingData as any, []);

  const geoItems = useMemo(() => listingGeoData as any, []);

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
      {/* <Listings listings={items} category={category} /> */}
      <ListingsMap listings={geoItems} />
    </View>
  );
};

export default Page;
