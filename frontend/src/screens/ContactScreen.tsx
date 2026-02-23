import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Linking,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Button from '../components/Button';
import SuccessModal from '../components/SuccessModal';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../theme';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Contact'>;
};

const emergencyContacts = [
  { label: 'Acil Servis', number: '112', icon: '🚨', color: '#F44336' },
  { label: 'Kanser Yardım Hattı', number: '182', icon: '🎗️', color: '#E91E63' },
  { label: 'ALO 182 Sağlık Hattı', number: '182', icon: '☎️', color: '#4CAF50' },
];

const ContactScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSend = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }
    if (!email.includes('@')) {
      setError('Geçerli bir e-posta adresi girin.');
      return;
    }
    setError('');
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000));
    setLoading(false);
    setName('');
    setEmail('');
    setMessage('');
    setShowSuccess(true);
  };

  return (
    <>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={[styles.container, { paddingTop: insets.top }]}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <View style={styles.headerTitles}>
              <Text style={styles.headerTitle}>İletişim</Text>
              <Text style={styles.headerSub}>Bize ulaşın</Text>
            </View>
          </View>

          <ScrollView
            contentContainerStyle={styles.body}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Emergency Numbers */}
            <Text style={styles.sectionTitle}>🚑 Acil İletişim</Text>
            {emergencyContacts.map((c) => (
              <TouchableOpacity
                key={c.label}
                style={[styles.emergencyCard, Shadow.sm]}
                onPress={() => Linking.openURL(`tel:${c.number}`)}
                activeOpacity={0.85}
              >
                <View style={[styles.emergencyIconBox, { backgroundColor: c.color }]}>
                  <Text style={styles.emergencyIcon}>{c.icon}</Text>
                </View>
                <View style={styles.emergencyInfo}>
                  <Text style={styles.emergencyLabel}>{c.label}</Text>
                  <Text style={styles.emergencyNumber}>{c.number}</Text>
                </View>
                <Text style={styles.callText}>Ara →</Text>
              </TouchableOpacity>
            ))}

            {/* Contact Form */}
            <Text style={[styles.sectionTitle, { marginTop: Spacing.md }]}>📩 Mesaj Gönder</Text>
            <View style={[styles.formCard, Shadow.sm]}>
              <Text style={styles.inputLabel}>Adınız</Text>
              <TextInput
                style={styles.input}
                placeholder="Ad Soyad"
                placeholderTextColor={Colors.textMuted}
                value={name}
                onChangeText={setName}
              />

              <Text style={styles.inputLabel}>E-posta</Text>
              <TextInput
                style={styles.input}
                placeholder="ornek@email.com"
                placeholderTextColor={Colors.textMuted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Text style={styles.inputLabel}>Mesajınız</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Mesajınızı buraya yazın..."
                placeholderTextColor={Colors.textMuted}
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
              />

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <Button
                title="Mesajı Gönder"
                onPress={handleSend}
                loading={loading}
                style={styles.sendBtn}
              />
            </View>

            {/* Address */}
            <View style={[styles.addressCard, Shadow.sm]}>
              <Text style={styles.addressIcon}>📍</Text>
              <View style={styles.addressInfo}>
                <Text style={styles.addressTitle}>Adres</Text>
                <Text style={styles.addressText}>
                  Meme Kanseri Destek Merkezi{'\n'}
                  Sağlık Cad. No:42, İstanbul
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>

      <SuccessModal
        visible={showSuccess}
        title="Mesajınız İletildi!"
        message="En kısa sürede sizinle iletişime geçeceğiz."
        onClose={() => setShowSuccess(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    paddingBottom: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: { padding: Spacing.xs, marginRight: Spacing.sm },
  backIcon: { fontSize: 22, color: Colors.white },
  headerTitles: { flex: 1 },
  headerTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
  headerSub: { fontSize: FontSize.sm, color: Colors.white, opacity: 0.85 },
  body: { padding: Spacing.md, paddingBottom: Spacing.xxl },
  sectionTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  emergencyCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  emergencyIconBox: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  emergencyIcon: { fontSize: 22 },
  emergencyInfo: { flex: 1 },
  emergencyLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  emergencyNumber: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  callText: {
    fontSize: FontSize.sm,
    color: '#4CAF50',
    fontWeight: FontWeight.semibold,
  },
  formCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  inputLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingVertical: 12,
    paddingHorizontal: Spacing.md,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  textArea: {
    minHeight: 110,
    textAlignVertical: 'top',
  },
  errorText: {
    fontSize: FontSize.sm,
    color: Colors.error,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  sendBtn: { marginTop: Spacing.xs },
  addressCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  addressIcon: { fontSize: 28, marginRight: Spacing.sm, marginTop: 2 },
  addressInfo: { flex: 1 },
  addressTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  addressText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});

export default ContactScreen;
