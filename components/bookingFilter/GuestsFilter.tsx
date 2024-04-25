import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const guestsGroups = [
  {
    name: 'Adults',
    text: 'Ages 13 or above',
    count: 0,
  },
  {
    name: 'Children',
    text: 'Ages 2-12',
    count: 0,
  },
  {
    name: 'Infants',
    text: 'Under 2',
    count: 0,
  },
  {
    name: 'Pets',
    text: 'Pets allowed',
    count: 0,
  },
];

const GuestsFilter = () => {
  const [guests, setGuests] = useState(guestsGroups);

  const addCount = (index: number) => {
    const newGuests = [...guests];
    newGuests[index].count += 1;
    setGuests(newGuests);
  };

  const removeCount = (index: number) => {
    const newGuests = [...guests];
    if (newGuests[index].count === 0) return;
    newGuests[index].count -= 1;
    setGuests(newGuests);
  };

  return (
    <>
      <Animated.Text style={styles.cardHeader} entering={FadeIn}>
        Who's coming?
      </Animated.Text>
      <Animated.View style={styles.cardBody}>
        {guests.map((item, index) => (
          <View
            style={[
              styles.guestItem,
              index + 1 < guestsGroups.length ? styles.itemBorder : null,
            ]}
            key={index}
          >
            <View>
              <Text style={styles.guestName}>{item.name}</Text>
              <Text style={styles.guestText}>{item.text}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
              }}
            >
              <TouchableOpacity onPress={() => removeCount(index)}>
                <Ionicons
                  name="remove-circle-outline"
                  size={26}
                  color={guests[index].count > 0 ? Colors.grey : '#cdcdcd'}
                />
              </TouchableOpacity>
              <Text style={styles.countText}>{guests[index].count}</Text>
              <TouchableOpacity onPress={() => addCount(index)}>
                <Ionicons
                  name="add-circle-outline"
                  size={26}
                  color={Colors.grey}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </Animated.View>
    </>
  );
};

export default GuestsFilter;

const styles = StyleSheet.create({
  cardHeader: {
    fontFamily: 'nunito-bold',
    fontSize: 24,
    padding: 20,
  },
  cardBody: {
    padding: 20,
  },
  guestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  itemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.grey,
  },
  guestName: {
    fontFamily: 'nunito-semibold',
    fontSize: 14,
  },
  guestText: {
    fontFamily: 'nunito-regular',
    fontSize: 14,
    color: Colors.grey,
  },
  countText: {
    fontFamily: 'nunito-regular',
    fontSize: 16,
    minWidth: 20,
    textAlign: 'center',
  },
});
