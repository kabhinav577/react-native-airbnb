import { useEffect, useRef, useState } from 'react';
import { View, Text, ListRenderItem } from 'react-native';
import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from '@gorhom/bottom-sheet';

import ListingItem from './ListingItem';
import { defaultStyles } from '@/constants/Styles';

interface Props {
  listings: any[];
  refresh: number;
  category: string;
}

const Listings = ({ listings: items, refresh, category }: Props) => {
  const listRef = useRef<BottomSheetFlatListMethods>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Update the view to scroll the list back top
  useEffect(() => {
    if (refresh) {
      scrollListTop();
    }
  }, [refresh]);

  const scrollListTop = () => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  // Use for "updating" the views data after category changed
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  // Render one listing row for the FlatList
  const renderRow: ListRenderItem<any> = ({ item }) => (
    <ListingItem item={item} />
  );

  return (
    <View style={defaultStyles.container}>
      <BottomSheetFlatList
        renderItem={renderRow}
        data={loading ? [] : items}
        ref={listRef}
        ListHeaderComponent={
          <Text style={defaultStyles.info}>{items.length} homes</Text>
        }
      />
    </View>
  );
};

export default Listings;
