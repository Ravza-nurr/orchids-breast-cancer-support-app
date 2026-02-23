import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from '../../theme';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Register'>;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }
    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır.');
      return;
    }
    setError('');
    setLoading(true);
    const success = await register(name.trim(), email.trim(), password);
    setLoading(false);
    if (success) {
      Alert.alert(
        'Başarılı',
        'Kayıt Başarılı! Giriş yapabilirsiniz.',
        [{ text: 'Tamam', onPress: () => navigation.navigate('Login') }]
      );
    } else {
      setError('Bu e-posta adresi zaten kayıtlı.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + Spacing.lg }]}>
          <Text style={styles.appTitle}>Meme Kanseri</Text>
          <Text style={styles.appSubtitle}>Destek Mobil</Text>
        </View>

        {/* Form Card */}
        <View style={styles.card}>
          <Text style={styles.formTitle}>Kayıt Ol</Text>

          <Input
            label="İsim Soyisim"
            value={name}
            onChangeText={setName}
            placeholder="Adınız Soyadınız"
            autoCapitalize="words"
          />

          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="ornek@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Parola"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry={!showPassword}
            rightIcon={
              <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
            }
            onRightIconPress={() => setShowPassword((v) => !v)}
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Button
            title="Kayıt Ol"
            onPress={handleRegister}
            loading={loading}
            style={styles.registerButton}
          />

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backLink}
          >
            <Text style={styles.backText}>← Giriş ekranına dön</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.background },
  content: { flexGrow: 1 },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  appTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
  appSubtitle: {
    fontSize: FontSize.lg,
    color: Colors.white,
    opacity: 0.9,
    marginTop: 2,
  },
  card: {
    flex: 1,
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.lg,
    marginTop: -Spacing.lg,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
  },
  formTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
    marginBottom: Spacing.xl,
  },
  eyeIcon: { fontSize: 18 },
  errorText: {
    fontSize: FontSize.sm,
    color: Colors.error,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  registerButton: { marginTop: Spacing.sm },
  backLink: {
    marginTop: Spacing.lg,
    alignItems: 'center',
    padding: Spacing.sm,
  },
  backText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
});

export default RegisterScreen;
