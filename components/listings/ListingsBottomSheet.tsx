import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useMemo, useRef, useState } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

import Listings from './Listings';
import { Listing } from '@/interfaces/listing';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  lsitings: Listing[];
  category: string;
}

const ListingsBottomSheet = ({ lsitings, category }: Props) => {
  const [refresh, setRefresh] = useState(0);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['10%', '100%'], []);

  const onShowMap = () => {
    bottomSheetRef.current?.collapse();
    setRefresh(refresh + 1);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      handleIndicatorStyle={{ backgroundColor: Colors.grey }}
      style={styles.sheetContainer}
    >
      <View style={styles.contentContainer}>
        <Listings listings={lsitings} refresh={refresh} category={category} />
        <View style={styles.absoluteView}>
          <TouchableOpacity onPress={onShowMap} style={styles.btn}>
            <Text style={{ fontFamily: 'nunito-semibold', color: '#fff' }}>
              Map
            </Text>
            <Ionicons
              name="map"
              size={20}
              style={{ marginLeft: 10 }}
              color={'#fff'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

export default ListingsBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  absoluteView: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: Colors.dark,
    padding: 14,
    height: 50,
    borderRadius: 30,
    flexDirection: 'row',
    marginHorizontal: 'auto',
    alignItems: 'center',
  },
  sheetContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});
