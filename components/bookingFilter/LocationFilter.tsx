import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';

import Colors from '@/constants/Colors';
import { places } from '@/assets/data/places';

interface Props {
  selectedPlace: number;
  setSelectedPlace: (index: number) => void;
}

const LocationFilter = ({ selectedPlace, setSelectedPlace }: Props) => {
  return (
    <>
      <Animated.Text entering={FadeIn} style={styles.cardHeader}>
        Where to?
      </Animated.Text>
      <Animated.View style={styles.cardBody}>
        <View style={styles.searchSection}>
          <Ionicons
            name="location-outline"
            size={24}
            color="black"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Search destination"
            placeholderTextColor={Colors.grey}
          />
        </View>
      </Animated.View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 25, paddingLeft: 20, marginBottom: 20 }}
      >
        {places.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{}}
            onPress={() => setSelectedPlace(index)}
          >
            <Image
              source={item.img}
              style={
                selectedPlace === index ? styles.placeSelected : styles.place
              }
            />
            <Text
              style={
                selectedPlace === index
                  ? styles.placeTextSelected
                  : styles.placeText
              }
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};

export default LocationFilter;

const styles = StyleSheet.create({
  cardHeader: {
    fontFamily: 'nunito-bold',
    fontSize: 24,
    padding: 20,
  },
  cardBody: {
    paddingHorizontal: 20,
  },
  searchSection: {
    height: 50,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 4,
  },
  inputField: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 10,
    fontSize: 24,
    color: Colors.grey,
  },
  place: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  placeSelected: {
    width: 120,
    height: 120,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.grey,
  },
  placeText: {
    fontFamily: 'nunito-regular',
    fontSize: 14,
    color: Colors.dark,
    textAlign: 'center',
    paddingTop: 10,
  },
  placeTextSelected: {
    fontFamily: 'nunito-semibold',
    fontSize: 16,
    color: Colors.dark,
    textAlign: 'center',
    paddingTop: 10,
  },
});
