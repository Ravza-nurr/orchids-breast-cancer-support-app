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
  navigation: NativeStackNavigationProp<RootStackParamList, 'Covid19'>;
};

const infoCards = [
  {
    icon: '🦠',
    title: 'Covid-19 ve Kanser Hastaları',
    color: '#E0F5F4',
    borderColor: Colors.primary,
    text: 'Meme kanseri hastaları, bağışıklık sistemi zayıflığı nedeniyle Covid-19 enfeksiyonuna karşı daha yüksek risk taşır. Aktif kemoterapi alan hastalar özellikle dikkatli olmalıdır.',
  },
  {
    icon: '💉',
    title: 'Aşılanma',
    color: '#E8F5E9',
    borderColor: Colors.success,
    text: 'Onkoloji uzmanlarının büyük çoğunluğu, kanser hastalarının Covid-19 aşısı yaptırmasını önermektedir. Aşı zamanlaması için doktorunuza danışın.',
  },
  {
    icon: '😷',
    title: 'Önleyici Tedbirler',
    color: '#FFF8E1',
    borderColor: Colors.warning,
    text: 'Maske takın, el hijyenine dikkat edin, kalabalık ortamlardan kaçının. Tedavi sürecinizde bu önlemler çok daha hayati önem taşır.',
  },
  {
    icon: '🏥',
    title: 'Hastane Ziyaretleri',
    color: '#FFF3EE',
    borderColor: Colors.secondary,
    text: 'Kontrol randevularını aksatmayın. Semptom yaşarsanız önce telefonla arayarak talimat alın. Telemedisine imkânlarını değerlendirin.',
  },
  {
    icon: '🍎',
    title: 'Bağışıklığı Güçlendirme',
    color: '#EDE7FF',
    borderColor: Colors.accent,
    text: 'Dengeli beslenme, yeterli uyku ve hafif egzersiz bağışıklık sisteminizi destekler. Diyetisyen ve fizyoterapist desteği almayı düşünün.',
  },
  {
    icon: '🧠',
    title: 'Psikolojik Sağlık',
    color: '#FCE4EC',
    borderColor: '#E91E63',
    text: 'Pandemi sürecindeki izolasyon ve belirsizlik kaygıyı artırabilir. Psikolojik destek almaktan çekinmeyin; telefonla veya online terapi mümkündür.',
  },
];

const Covid19Screen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerTitles}>
          <Text style={styles.headerTitle}>Covid-19 Bilgilendirme</Text>
          <Text style={styles.headerSub}>Kanser hastaları için rehber</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        {/* Alert banner */}
        <View style={styles.alertBanner}>
          <Text style={styles.alertIcon}>⚠️</Text>
          <Text style={styles.alertText}>
            Semptom yaşıyorsanız hastaneye gitmeden önce doktorunuzu arayın.
          </Text>
        </View>

        {/* Info cards */}
        {infoCards.map((card) => (
          <View
            key={card.title}
            style={[
              styles.infoCard,
              { backgroundColor: card.color, borderLeftColor: card.borderColor },
              Shadow.sm,
            ]}
          >
            <Text style={styles.cardIcon}>{card.icon}</Text>
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.cardText}>{card.text}</Text>
          </View>
        ))}

        {/* WHO Link */}
        <TouchableOpacity
          style={[styles.whoButton, Shadow.sm]}
          onPress={() => Linking.openURL('https://www.who.int/tr')}
          activeOpacity={0.85}
        >
          <Text style={styles.whoIcon}>🌍</Text>
          <View style={styles.whoContent}>
            <Text style={styles.whoTitle}>Dünya Sağlık Örgütü</Text>
            <Text style={styles.whoSub}>Güncel Covid-19 rehberi için tıklayın</Text>
          </View>
          <Text style={styles.whoArrow}>→</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: Colors.primary,
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
  alertBanner: {
    backgroundColor: '#FFF3E0',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: Colors.warning,
    marginBottom: Spacing.sm,
  },
  alertIcon: { fontSize: 22, marginRight: Spacing.sm },
  alertText: {
    flex: 1,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  infoCard: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderLeftWidth: 4,
  },
  cardIcon: { fontSize: 28, marginBottom: 6 },
  cardTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  cardText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 21,
  },
  whoButton: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  whoIcon: { fontSize: 28, marginRight: Spacing.sm },
  whoContent: { flex: 1 },
  whoTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.primary,
  },
  whoSub: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    marginTop: 2,
  },
  whoArrow: {
    fontSize: 22,
    color: Colors.primary,
    fontWeight: FontWeight.bold,
  },
});

export default Covid19Screen;
