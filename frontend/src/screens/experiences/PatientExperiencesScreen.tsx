import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { experiences } from '../../data/experiences';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../../theme';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PatientExperiences'>;
};

const PatientExperiencesScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerTitles}>
          <Text style={styles.headerTitle}>Hasta Deneyimleri</Text>
          <Text style={styles.headerSub}>Güçlü hikayeler, umut veren sesler</Text>
        </View>
      </View>

      <FlatList
        data={experiences}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, Shadow.sm]}
            onPress={() =>
              navigation.navigate('PatientExperienceDetail', { experienceId: item.id })
            }
            activeOpacity={0.85}
          >
            <View style={[styles.cardTop, { backgroundColor: item.imageColor }]}>
              <Text style={styles.cardEmoji}>💬</Text>
              <View style={styles.authorBadge}>
                <Text style={styles.authorText}>{item.author}</Text>
              </View>
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.cardPreview} numberOfLines={3}>{item.preview}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.cardDate}>📅 {item.date}</Text>
                <Text style={styles.readMore}>Devamını Oku →</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: '#E91E63',
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
  list: { padding: Spacing.md, paddingBottom: Spacing.xxl },
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.md,
  },
  cardTop: {
    height: 90,
    padding: Spacing.md,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cardEmoji: { fontSize: 36 },
  authorBadge: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: BorderRadius.full,
    paddingVertical: 4,
    paddingHorizontal: Spacing.sm,
  },
  authorText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
  },
  cardBody: { padding: Spacing.md },
  cardTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
    lineHeight: 21,
  },
  cardPreview: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 19,
    marginBottom: Spacing.sm,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardDate: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  readMore: {
    fontSize: FontSize.sm,
    color: '#E91E63',
    fontWeight: FontWeight.semibold,
  },
});

export default PatientExperiencesScreen;
