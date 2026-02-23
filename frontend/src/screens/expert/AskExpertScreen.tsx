import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../../theme';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AskExpert'>;
};

const options = [
  {
    id: 'text',
    icon: '✏️',
    title: 'Yazılı Soru Sor',
    description: 'Sorunuzu yazarak uzmanlara iletin.',
    color: '#00BCD4',
    route: 'AskExpertText' as keyof RootStackParamList,
  },
  {
    id: 'voice',
    icon: '🎙️',
    title: 'Sesli Mesaj Gönder',
    description: 'Sesinizi kaydederek soru gönderin.',
    color: '#7C4DFF',
    route: 'AskExpertVoice' as keyof RootStackParamList,
  },
];

const AskExpertScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerTitles}>
          <Text style={styles.headerTitle}>Uzmana Sor</Text>
          <Text style={styles.headerSub}>Soru yönteminizi seçin</Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.infoBox}>
          <Text style={styles.infoIcon}>👨‍⚕️</Text>
          <Text style={styles.infoText}>
            Uzmanlarımız sorularınızı en kısa sürede yanıtlayacaktır. Acil durumlarda lütfen doktorunuza başvurun.
          </Text>
        </View>

        {options.map((opt) => (
          <TouchableOpacity
            key={opt.id}
            style={[styles.card, Shadow.md]}
            onPress={() => navigation.navigate(opt.route as any)}
            activeOpacity={0.85}
          >
            <View style={[styles.iconCircle, { backgroundColor: opt.color }]}>
              <Text style={styles.optionIcon}>{opt.icon}</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{opt.title}</Text>
              <Text style={styles.cardDesc}>{opt.description}</Text>
            </View>
            <Text style={[styles.chevron, { color: opt.color }]}>›</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: '#00BCD4',
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
  body: { padding: Spacing.md },
  infoBox: {
    backgroundColor: Colors.primaryXLight,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
  },
  infoIcon: { fontSize: 24, marginRight: Spacing.sm, marginTop: 2 },
  infoText: {
    flex: 1,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  optionIcon: { fontSize: 26 },
  cardContent: { flex: 1 },
  cardTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: 3,
  },
  cardDesc: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  chevron: { fontSize: 28, marginLeft: Spacing.sm },
});

export default AskExpertScreen;
