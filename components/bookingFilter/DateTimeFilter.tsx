import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import DatePicker from 'react-native-modern-datepicker';
import Colors from '@/constants/Colors';

const DateTimeFilter = () => {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <>
      <Animated.Text style={styles.cardHeader} entering={FadeIn}>
        When's your trip?
      </Animated.Text>
      <Animated.View style={styles.cardBody}>
        <DatePicker
          options={{
            defaultFont: 'nunito-regular',
            headerFont: 'nunito-bold',
            borderColor: 'transparent',
            mainColor: Colors.primary,
          }}
          current={today}
          selected={today}
          mode="calendar"
          minuteInterval={30}
          style={{ borderRadius: 10 }}
        />
      </Animated.View>
    </>
  );
};

export default DateTimeFilter;

const styles = StyleSheet.create({
  cardHeader: {
    fontFamily: 'nunito-bold',
    fontSize: 24,
    padding: 20,
  },
  cardBody: {
    padding: 20,
  },
});
