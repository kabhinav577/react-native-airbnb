import { useState } from 'react';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
} from 'react-native-reanimated';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import LocationFilter from '@/components/bookingFilter/LocationFilter';
import DateTimeFilter from '@/components/bookingFilter/DateTimeFilter';
import GuestsFilter from '@/components/bookingFilter/GuestsFilter';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const BookingModal = () => {
  const router = useRouter();
  const [openCard, setOpenCard] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState(0);

  const onClearAll = () => {
    setOpenCard(0);
    setSelectedPlace(0);
  };

  return (
    <BlurView intensity={70} style={styles.container} tint="light">
      {/* Where  */}
      <View style={styles.card}>
        {openCard !== 0 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(0)}
            style={styles.cardPreview}
          >
            <Text style={styles.previewText}>Where</Text>
            <Text style={styles.previewDate}>I'm flexible</Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard === 0 && (
          <LocationFilter
            selectedPlace={selectedPlace}
            setSelectedPlace={setSelectedPlace}
          />
        )}
      </View>

      {/* When  */}
      <View style={styles.card}>
        {openCard !== 1 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(1)}
            style={styles.cardPreview}
          >
            <Text style={styles.previewText}>When</Text>
            <Text style={styles.previewDate}>Any Week</Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard === 1 && <DateTimeFilter />}
      </View>

      {/* Who  */}
      <View style={styles.card}>
        {openCard !== 2 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(2)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            <Text style={styles.previewText}>Who</Text>
            <Text style={styles.previewDate}>Add Guests</Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard === 2 && <GuestsFilter />}
      </View>

      {/* Footer */}
      <Animated.View
        style={defaultStyles.footer}
        entering={SlideInDown.delay(200)}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity onPress={onClearAll}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'nunito-bold',
                textDecorationLine: 'underline',
              }}
            >
              Clear all
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.back()}
            style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 50 }]}
          >
            <Ionicons
              name="search"
              size={22}
              color="#fff"
              style={defaultStyles.btnIcon}
            />
            <Text style={defaultStyles.btnText}>Search</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </BlurView>
  );
};

export default BookingModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  card: {
    backgroundColor: '#fff',
    gap: 20,
    borderRadius: 14,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  cardPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  previewText: {
    fontFamily: 'nunito-semibold',
    fontSize: 16,
    color: Colors.grey,
  },
  previewDate: {
    fontFamily: 'nunito-semibold',
    fontSize: 14,
    color: Colors.dark,
  },
});
