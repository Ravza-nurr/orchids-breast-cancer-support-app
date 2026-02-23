import React, { useState } from 'react';
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
  navigation: NativeStackNavigationProp<RootStackParamList, 'BreastCancerInfo'>;
};

const tabs = ['Genel', 'Belirtiler', 'Risk Faktörleri', 'Tarama'];

const content: Record<string, { icon: string; title: string; text: string }[]> = {
  Genel: [
    {
      icon: '🎗️',
      title: 'Meme Kanseri Nedir?',
      text: 'Meme kanseri, meme hücrelerinin kontrolsüz biçimde çoğalmasıyla oluşan bir hastalıktır. Dünyada kadınlarda en sık görülen kanser türüdür.',
    },
    {
      icon: '📊',
      title: 'İstatistikler',
      text: 'Her 8 kadından 1\'i hayatının bir döneminde meme kanseri teşhisi alır. Erken teşhis ile 5 yıllık sağkalım oranı %99\'a ulaşmaktadır.',
    },
    {
      icon: '💊',
      title: 'Tedavi Yöntemleri',
      text: 'Kemoterapi, radyoterapi, cerrahi ve hedefe yönelik tedaviler başlıca tedavi seçenekleridir. Tedavi planı tümör tipine ve evresine göre kişiselleştirilir.',
    },
  ],
  Belirtiler: [
    {
      icon: '🔍',
      title: 'Meme Kitlesi',
      text: 'Memede veya koltuk altında hissedilen yeni bir kitle ya da sertlik en önemli belirtilerden biridir. Tüm kitleler kanserli değildir ama mutlaka değerlendirilmelidir.',
    },
    {
      icon: '🔵',
      title: 'Cilt Değişiklikleri',
      text: 'Memede kızarıklık, portakal kabuğu görünümü, çöküntü veya buruşma görülebilir.',
    },
    {
      icon: '⭕',
      title: 'Meme Ucu Değişiklikleri',
      text: 'Meme ucundan akıntı (kan dahil), meme ucunun içe çökmesi veya şeklinin değişmesi dikkat gerektiren bulgulardır.',
    },
    {
      icon: '📐',
      title: 'Boyut ve Şekil Değişikliği',
      text: 'Memelerde belirgin boyut veya şekil farklılığı görülmesi durumunda doktora başvurun.',
    },
  ],
  'Risk Faktörleri': [
    {
      icon: '🧬',
      title: 'Genetik Yatkınlık',
      text: 'BRCA1 ve BRCA2 gen mutasyonları meme kanseri riskini önemli ölçüde artırır. Aile hikayesi olanlar genetik danışmanlık almalıdır.',
    },
    {
      icon: '👶',
      title: 'Hormonal Faktörler',
      text: 'Erken adet başlangıcı, geç menopoz, çocuksuzluk veya ilk doğumu geç yapma risk faktörleri arasındadır.',
    },
    {
      icon: '🍷',
      title: 'Yaşam Tarzı',
      text: 'Alkol tüketimi, hareketsizlik, obezite ve sigara meme kanseri riskini artıran yaşam tarzı faktörleridir.',
    },
    {
      icon: '📅',
      title: 'Yaş',
      text: 'Meme kanseri riski yaşla birlikte artar. 50 yaş üstü kadınlarda risk belirgin olarak yükselmektedir.',
    },
  ],
  Tarama: [
    {
      icon: '🤲',
      title: 'Kendi Kendine Muayene (KKM)',
      text: 'Ayda bir kez adet sonrası veya belirli bir günde düzenli olarak yapılmalıdır. Memedeki herhangi bir değişikliği fark etmek için vazgeçilmezdir.',
    },
    {
      icon: '👩‍⚕️',
      title: 'Klinik Meme Muayenesi',
      text: '20-39 yaş arası her 3 yılda bir; 40 yaş ve üzeri yılda bir kez sağlık uzmanı tarafından yapılmalıdır.',
    },
    {
      icon: '📡',
      title: 'Mamografi',
      text: '40 yaşından itibaren yılda bir mamografi çektirilmesi önerilir. Yüksek riskli bireylerde daha erken yaşta başlanabilir.',
    },
    {
      icon: '🔊',
      title: 'Ultrasonografi',
      text: 'Yoğun meme dokusuna sahip kadınlarda mamografiye ek olarak ultrason önerilmektedir.',
    },
  ],
};

const BreastCancerInfoScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('Genel');

  const activeContent = content[activeTab] ?? [];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerTitles}>
          <Text style={styles.headerTitle}>Meme Kanseri Hakkında</Text>
          <Text style={styles.headerSub}>Bilgi güçtür, yaşamı kurtarır</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        {activeContent.map((item) => (
          <View key={item.title} style={[styles.card, Shadow.sm]}>
            <Text style={styles.cardIcon}>{item.icon}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardText}>{item.text}</Text>
          </View>
        ))}

        {/* Awareness Banner */}
        <View style={styles.awarenessBanner}>
          <Text style={styles.awarenessEmoji}>🎗️</Text>
          <Text style={styles.awarenessText}>
            Ekim ayı Meme Kanseri Farkındalık Ayı'dır. Erken teşhis hayat kurtarır.
          </Text>
        </View>

        {/* External link */}
        <TouchableOpacity
          style={[styles.linkCard, Shadow.sm]}
          onPress={() => Linking.openURL('https://www.kanservakfi.com')}
          activeOpacity={0.85}
        >
          <Text style={styles.linkIcon}>🔗</Text>
          <View style={styles.linkContent}>
            <Text style={styles.linkTitle}>Türkiye Kanser Vakfı</Text>
            <Text style={styles.linkSub}>Daha fazla bilgi için ziyaret edin</Text>
          </View>
          <Text style={styles.linkArrow}>→</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: Colors.secondary,
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
  tabBar: {
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tabScroll: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, gap: Spacing.xs },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    borderWidth: 1.5,
    borderColor: Colors.border,
    marginRight: 4,
  },
  tabActive: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  tabText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
  tabTextActive: {
    color: Colors.white,
    fontWeight: FontWeight.semibold,
  },
  body: { padding: Spacing.md, paddingBottom: Spacing.xxl },
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
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
  awarenessBanner: {
    backgroundColor: '#FCE4EC',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    borderLeftWidth: 4,
    borderLeftColor: '#E91E63',
  },
  awarenessEmoji: { fontSize: 24, marginRight: Spacing.sm },
  awarenessText: {
    flex: 1,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  linkCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkIcon: { fontSize: 24, marginRight: Spacing.sm },
  linkContent: { flex: 1 },
  linkTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.secondary,
  },
  linkSub: { fontSize: FontSize.sm, color: Colors.textMuted, marginTop: 2 },
  linkArrow: {
    fontSize: 20,
    color: Colors.secondary,
    fontWeight: FontWeight.bold,
  },
});

export default BreastCancerInfoScreen;
