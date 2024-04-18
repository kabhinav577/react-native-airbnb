import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useOAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';

enum OAuthStrategy {
  Google = 'oauth_google',
  Facebook = 'oauth_facebook',
  Apple = 'oauth_apple',
}

const LoginModal = () => {
  useWarmUpBrowser();
  const router = useRouter();

  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: 'oauth_facebook',
  });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: 'oauth_apple' });

  const onSelectAuth = async (strategy: OAuthStrategy) => {
    const selectedAuth = {
      [OAuthStrategy.Google]: googleAuth,
      [OAuthStrategy.Facebook]: facebookAuth,
      [OAuthStrategy.Apple]: appleAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.back();
      }
    } catch (err) {
      console.log('OAuth error', err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Email"
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
      />
      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.sepratorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: Colors.grey,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.separatorText}>or</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: Colors.grey,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>

      <View style={{ flexDirection: 'column', gap: 20 }}>
        <TouchableOpacity style={styles.btnOutline}>
          <Ionicons
            name="call-outline"
            size={24}
            color={Colors.dark}
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with phone</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onSelectAuth(OAuthStrategy.Apple)}
        >
          <Ionicons
            name="logo-apple"
            size={24}
            color={Colors.dark}
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onSelectAuth(OAuthStrategy.Google)}
        >
          <Ionicons
            name="logo-google"
            size={24}
            color={Colors.dark}
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onSelectAuth(OAuthStrategy.Facebook)}
        >
          <Ionicons
            name="logo-facebook"
            size={24}
            color={Colors.dark}
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 26,
  },
  sepratorView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 30,
  },
  separatorText: {
    fontFamily: 'nunito-semibold',
    color: Colors.grey,
    fontSize: 16,
  },
  btnOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: Colors.dark,
    fontSize: 18,
    fontFamily: 'nunito-bold',
  },
});
