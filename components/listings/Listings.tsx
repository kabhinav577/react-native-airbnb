import { Listing } from '@/interfaces/listing';
import { useEffect, useState } from 'react';
import { View, FlatList, ListRenderItem } from 'react-native';
import ListingItem from './ListingItem';

interface Props {
  listings: any[];
  category: string;
}

const Listings = ({ listings: items, category }: Props) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Reload Category', items.length);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const renderRow: ListRenderItem<Listing> = ({ item }) => {
    return <ListingItem item={item} />;
  };

  return (
    <View>
      <FlatList
        data={loading ? [] : items}
        renderItem={renderRow}
        keyExtractor={(item) => item.id}
        refreshing={loading}
      />
    </View>
  );
};

export default Listings;
