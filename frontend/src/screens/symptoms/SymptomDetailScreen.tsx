import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { symptoms } from '../../data/symptoms';
import VideoPlaceholder from '../../components/VideoPlaceholder';
import {
  Colors,
  FontSize,
  FontWeight,
  Spacing,
  BorderRadius,
  Shadow,
} from '../../theme';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SymptomDetail'>;
  route: RouteProp<RootStackParamList, 'SymptomDetail'>;
};

const SymptomDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { symptomId } = route.params;
  const symptom = symptoms.find((s) => s.id === symptomId);

  if (!symptom) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Belirti bulunamadı.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backLink}>← Geri Dön</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: symptom.letterColor }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerBadge}>
          <Text style={styles.headerLetter}>{symptom.shortLetter}</Text>
        </View>
        <View style={styles.headerTitles}>
          <Text style={styles.headerTitle}>{symptom.title}</Text>
          <Text style={styles.headerSub}>Belirti Detayı</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Description */}
        <View style={[styles.section, Shadow.sm]}>
          <Text style={styles.sectionTitle}>📋 Açıklama</Text>
          <Text style={styles.description}>{symptom.description}</Text>
        </View>

        {/* Recommendations */}
        <View style={[styles.section, Shadow.sm]}>
          <Text style={styles.sectionTitle}>💡 Öneriler</Text>
          {symptom.recommendations.map((rec, idx) => (
            <View key={idx} style={styles.recRow}>
              <View
                style={[
                  styles.recDot,
                  { backgroundColor: symptom.letterColor },
                ]}
              />
              <Text style={styles.recText}>{rec}</Text>
            </View>
          ))}
        </View>

        {/* Video */}
        <View style={[styles.section, Shadow.sm]}>
          <Text style={styles.sectionTitle}>🎬 İlgili Video</Text>
          <VideoPlaceholder title={symptom.videoTitle} />
        </View>

        {/* Warning */}
        <View style={[styles.warningBox]}>
          <Text style={styles.warningText}>
            ⚠️ Bu bilgiler yalnızca genel bilgilendirme amaçlıdır. Şikayetleriniz için mutlaka doktorunuza başvurun.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  errorText: { fontSize: FontSize.lg, color: Colors.textSecondary },
  backLink: {
    fontSize: FontSize.md,
    color: Colors.primary,
    marginTop: Spacing.md,
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    paddingBottom: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: { padding: Spacing.xs, marginRight: Spacing.sm },
  backIcon: { fontSize: 22, color: Colors.white },
  headerBadge: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  headerLetter: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
  headerTitles: { flex: 1 },
  headerTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
  headerSub: { fontSize: FontSize.sm, color: Colors.white, opacity: 0.85 },
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.md, paddingBottom: Spacing.xxl },
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
  description: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  recRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  recDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 7,
    marginRight: Spacing.sm,
  },
  recText: {
    flex: 1,
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  warningBox: {
    backgroundColor: Colors.warningLight,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: Colors.warning,
    marginBottom: Spacing.sm,
  },
  warningText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});

export default SymptomDetailScreen;
