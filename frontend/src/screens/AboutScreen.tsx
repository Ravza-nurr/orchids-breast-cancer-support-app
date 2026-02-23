import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../theme';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'About'>;
};

const features = [
  { icon: '📋', title: 'Belirti Yönetimi', desc: '12 yaygın belirti hakkında detaylı bilgi ve öneriler' },
  { icon: '👨‍⚕️', title: 'Uzmana Sor', desc: 'Yazılı veya sesli olarak uzman desteği alın' },
  { icon: '💬', title: 'Hasta Deneyimleri', desc: 'Gerçek hikayeler aracılığıyla umut bulun' },
  { icon: '📅', title: 'Belirti Takvimi', desc: 'Günlük belirti şiddetinizi kaydedin ve takip edin' },
  { icon: '🩸', title: 'Kan Tahlili Yükle', desc: 'Tahlil sonuçlarınızı güvenle saklayın' },
  { icon: '📞', title: 'İletişim', desc: 'Bize ulaşın, acil numaralara hızla erişin' },
];

const AboutScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerTitles}>
          <Text style={styles.headerTitle}>Hakkında</Text>
          <Text style={styles.headerSub}>Uygulama bilgileri</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        {/* Logo / App identity */}
        <View style={[styles.logoCard, Shadow.md]}>
          <Text style={styles.logoEmoji}>🎗️</Text>
          <Text style={styles.appName}>Meme Kanseri</Text>
          <Text style={styles.appNameSub}>Destek Mobil</Text>
          <View style={styles.versionBadge}>
            <Text style={styles.versionText}>Versiyon 1.0.0</Text>
          </View>
        </View>

        {/* Mission */}
        <View style={[styles.section, Shadow.sm]}>
          <Text style={styles.sectionTitle}>🎯 Misyonumuz</Text>
          <Text style={styles.sectionText}>
            Meme kanseri tedavisi sürecindeki hastaları ve yakınlarını bilgilendirmek,
            desteklemek ve güçlendirmek için tasarlandık. Doğru bilgiye erişimi kolaylaştırarak
            bu zorlu süreçte yanınızda olmak istiyoruz.
          </Text>
        </View>

        {/* Features */}
        <View style={[styles.section, Shadow.sm]}>
          <Text style={styles.sectionTitle}>✨ Özellikler</Text>
          {features.map((f) => (
            <View key={f.title} style={styles.featureRow}>
              <Text style={styles.featureIcon}>{f.icon}</Text>
              <View style={styles.featureInfo}>
                <Text style={styles.featureTitle}>{f.title}</Text>
                <Text style={styles.featureDesc}>{f.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimerBox}>
          <Text style={styles.disclaimerTitle}>⚕️ Önemli Uyarı</Text>
          <Text style={styles.disclaimerText}>
            Bu uygulama yalnızca bilgilendirme amaçlıdır. Tıbbi teşhis, tedavi veya
            ilaç değişikliği için mutlaka nitelikli sağlık profesyonellerine danışın.
          </Text>
        </View>

        {/* Links */}
        <View style={[styles.section, Shadow.sm]}>
          <Text style={styles.sectionTitle}>🔗 Faydalı Bağlantılar</Text>
          {[
            { label: 'Türkiye Kanser Vakfı', url: 'https://www.kanservakfi.com' },
            { label: 'Sağlık Bakanlığı', url: 'https://www.saglik.gov.tr' },
            { label: 'KETEM — Kanser Erken Teşhis', url: 'https://hsgm.saglik.gov.tr' },
          ].map((link) => (
            <TouchableOpacity
              key={link.label}
              style={styles.linkRow}
              onPress={() => Linking.openURL(link.url)}
              activeOpacity={0.75}
            >
              <Text style={styles.linkText}>{link.label}</Text>
              <Text style={styles.linkArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: '#607D8B',
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
  logoCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  logoEmoji: { fontSize: 52, marginBottom: Spacing.sm },
  appName: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  appNameSub: {
    fontSize: FontSize.lg,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  versionBadge: {
    backgroundColor: Colors.primaryXLight,
    borderRadius: BorderRadius.full,
    paddingVertical: 4,
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.sm,
  },
  versionText: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: FontWeight.semibold,
  },
  section: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  sectionText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  featureIcon: { fontSize: 22, width: 36 },
  featureInfo: { flex: 1 },
  featureTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
  },
  featureDesc: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  disclaimerBox: {
    backgroundColor: Colors.warningLight,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: Colors.warning,
    marginBottom: Spacing.sm,
  },
  disclaimerTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  disclaimerText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  linkText: {
    flex: 1,
    fontSize: FontSize.md,
    color: Colors.primary,
  },
  linkArrow: {
    fontSize: 22,
    color: Colors.textMuted,
  },
});

export default AboutScreen;
