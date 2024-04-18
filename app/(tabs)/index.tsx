import { View, Text } from 'react-native';
import { Link } from 'expo-router';

const Page = () => {
  return (
    <View>
      <Link href={'/(modals)/login'}>
        <Text>Login</Text>
      </Link>
      <Link href={'/(modals)/booking'}>
        <Text>Booking</Text>
      </Link>
      <Link href={'/listing/2'}>
        <Text>Listing Id</Text>
      </Link>
    </View>
  );
};

export default Page;
