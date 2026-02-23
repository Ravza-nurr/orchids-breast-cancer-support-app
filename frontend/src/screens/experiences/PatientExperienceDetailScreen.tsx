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
import { experiences } from '../../data/experiences';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../../theme';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PatientExperienceDetail'>;
  route: RouteProp<RootStackParamList, 'PatientExperienceDetail'>;
};

const PatientExperienceDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { experienceId } = route.params;
  const exp = experiences.find((e) => e.id === experienceId);

  if (!exp) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Deneyim bulunamadı.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backLink}>← Geri Dön</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: exp.imageColor }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backIconDark}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerLabel}>Hasta Deneyimi</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Author card */}
        <View style={[styles.authorCard, Shadow.md]}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>
              {exp.author.charAt(0)}
            </Text>
          </View>
          <View style={styles.authorInfo}>
            <Text style={styles.authorName}>{exp.author}</Text>
            <Text style={styles.authorDate}>📅 {exp.date}</Text>
          </View>
          <Text style={styles.quoteIcon}>💬</Text>
        </View>

        {/* Title */}
        <Text style={styles.storyTitle}>{exp.title}</Text>

        {/* Story */}
        <View style={[styles.storyCard, Shadow.sm]}>
          <Text style={styles.storyText}>{exp.story}</Text>
        </View>

        {/* Encouragement */}
        <View style={styles.encourageBox}>
          <Text style={styles.encourageText}>
            🎗️ Bu güçlü hikayeyi paylaştığı için teşekkürler. Siz de yalnız değilsiniz.
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
  backIconDark: { fontSize: 22, color: Colors.textPrimary },
  headerLabel: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.md, paddingBottom: Spacing.xxl },
  authorCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E91E63',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  avatarText: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
  authorInfo: { flex: 1 },
  authorName: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
  },
  authorDate: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    marginTop: 2,
  },
  quoteIcon: { fontSize: 28 },
  storyTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    lineHeight: 24,
  },
  storyCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  storyText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  encourageBox: {
    backgroundColor: '#FCE4EC',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: '#E91E63',
  },
  encourageText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});

export default PatientExperienceDetailScreen;
