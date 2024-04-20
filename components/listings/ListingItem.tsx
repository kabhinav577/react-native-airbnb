import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

import { Listing } from '@/interfaces/listing';

interface Props {
  item: Listing;
}

const ListingItem = ({ item }: Props) => {
  return (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <Animated.View
          style={styles.listing}
          entering={FadeInRight}
          exiting={FadeOutLeft}
        >
          <Image
            source={{
              uri: item.medium_url
                ? item.medium_url
                : 'https://cpworldgroup.com/wp-content/uploads/2021/01/placeholder.png',
            }}
            style={styles.image}
          />
          <TouchableOpacity
            style={{ position: 'absolute', top: 30, right: 30 }}
          >
            <Ionicons name="heart-outline" size={24} color="black" />
          </TouchableOpacity>

          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ fontFamily: 'nunito-bold', fontSize: 16 }}>
              {item.name}
            </Text>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
            >
              <Ionicons name="star" size={16} color="black" />
              <Text>{item.review_scores_rating / 20}</Text>
            </View>
          </View>

          <Text style={{ fontFamily: 'nunito-regular', fontSize: 14 }}>
            {item.room_type}
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Text style={{ fontFamily: 'nunito-semibold', fontSize: 14 }}>
              $ {item.price}
            </Text>
            <Text style={{ fontFamily: 'nunito-regular', fontSize: 14 }}>
              / night
            </Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );
};

export default ListingItem;

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: 16,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
});
