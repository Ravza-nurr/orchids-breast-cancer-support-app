import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAuth } from '../context/AuthContext';
import { dashboardItems } from '../data/dashboard';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../theme';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

type Mood = 'good' | 'okay' | 'bad' | null;

const MOOD_KEY = '@mood_tracker';

const moods: { id: Mood; emoji: string; label: string; color: string }[] = [
  { id: 'good', emoji: '😄', label: 'İyi', color: '#4CAF50' },
  { id: 'okay', emoji: '😐', label: 'Orta', color: '#FF9800' },
  { id: 'bad',  emoji: '😔', label: 'Kötü', color: '#EF5350' },
];

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();
  const [todayMood, setTodayMood] = useState<Mood>(null);
  const [moodSaved, setMoodSaved] = useState(false);

  // Load today's mood from AsyncStorage on mount
  useEffect(() => {
    loadTodayMood();
  }, []);

  const todayKey = () => {
    const d = new Date();
    return `${MOOD_KEY}_${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  };

  const loadTodayMood = async () => {
    try {
      const saved = await AsyncStorage.getItem(todayKey());
      if (saved) {
        setTodayMood(saved as Mood);
        setMoodSaved(true);
      }
    } catch (_) {}
  };

  const handleMoodSelect = async (mood: Mood) => {
    try {
      await AsyncStorage.setItem(todayKey(), mood as string);
      setTodayMood(mood);
      setMoodSaved(true);
    } catch (_) {}
  };

  const handleLogout = () => {
    Alert.alert('Çıkış Yap', 'Hesabınızdan çıkmak istiyor musunuz?', [
      { text: 'İptal', style: 'cancel' },
      { text: 'Çıkış Yap', style: 'destructive', onPress: logout },
    ]);
  };

  const handleNavigate = (route: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navigation.navigate(route as any);
  };

  const selectedMoodInfo = moods.find((m) => m.id === todayMood);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Meme Kanseri Destek Mobil</Text>
          {user && <Text style={styles.headerSubtitle}>Hoş geldiniz, {user.name} 👋</Text>}
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── MOOD TRACKER CARD ── */}
        <View style={[styles.moodCard, Shadow.md]}>
          <View style={styles.moodHeader}>
            <Text style={styles.moodTitle}>🌡️ Bugün Nasıl Hissediyorsunuz?</Text>
            {moodSaved && selectedMoodInfo && (
              <View style={[styles.moodSavedBadge, { backgroundColor: selectedMoodInfo.color + '22' }]}>
                <Text style={[styles.moodSavedText, { color: selectedMoodInfo.color }]}>
                  {selectedMoodInfo.emoji} Kaydedildi
                </Text>
              </View>
            )}
          </View>

          <View style={styles.moodButtonRow}>
            {moods.map((m) => (
              <TouchableOpacity
                key={m.id}
                style={[
                  styles.moodButton,
                  { borderColor: m.color },
                  todayMood === m.id && { backgroundColor: m.color },
                ]}
                onPress={() => handleMoodSelect(m.id)}
                activeOpacity={0.8}
              >
                <Text style={styles.moodEmoji}>{m.emoji}</Text>
                <Text style={[
                  styles.moodLabel,
                  { color: todayMood === m.id ? Colors.white : m.color },
                ]}>
                  {m.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {moodSaved && (
            <Text style={styles.moodNote}>
              ✓ Ruh haliniz bugün için kaydedildi. Yarın tekrar güncelleyebilirsiniz.
            </Text>
          )}
        </View>

        {/* Top wide cards */}
        <TouchableOpacity
          style={[styles.wideCard, { backgroundColor: Colors.primary }]}
          onPress={() => handleNavigate('Covid19')}
          activeOpacity={0.85}
        >
          <Text style={styles.wideCardIcon}>🦠</Text>
          <Text style={styles.wideCardText}>Covid-19 Bilgilendirme</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.wideCard, { backgroundColor: Colors.secondary }]}
          onPress={() => handleNavigate('BreastCancerInfo')}
          activeOpacity={0.85}
        >
          <Text style={styles.wideCardIcon}>🎗️</Text>
          <Text style={styles.wideCardText}>Meme Kanseri Hakkında Bilgilendirme</Text>
        </TouchableOpacity>

        {/* Grid cards */}
        <View style={styles.grid}>
          {dashboardItems.slice(2).map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.gridCard, { backgroundColor: item.color }, Shadow.md]}
              onPress={() => handleNavigate(item.route)}
              activeOpacity={0.85}
            >
              <Text style={styles.gridIcon}>{item.icon}</Text>
              <Text style={styles.gridTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}

          {/* Logout card */}
          <TouchableOpacity
            style={[styles.gridCard, { backgroundColor: '#90A4AE' }, Shadow.md]}
            onPress={handleLogout}
            activeOpacity={0.85}
          >
            <Text style={styles.gridIcon}>🚪</Text>
            <Text style={styles.gridTitle}>Çıkış Yap</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  headerTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
  headerSubtitle: {
    fontSize: FontSize.sm,
    color: Colors.white,
    opacity: 0.9,
    marginTop: 2,
  },
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.md, paddingBottom: Spacing.xxl },

  // Mood Tracker
  moodCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  moodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
    flexWrap: 'wrap',
    gap: 4,
  },
  moodTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    flex: 1,
  },
  moodSavedBadge: {
    borderRadius: BorderRadius.full,
    paddingVertical: 4,
    paddingHorizontal: Spacing.sm,
  },
  moodSavedText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
  },
  moodButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  moodButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    backgroundColor: 'transparent',
  },
  moodEmoji: { fontSize: 28, marginBottom: 4 },
  moodLabel: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold },
  moodNote: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 2,
  },

  // Wide cards
  wideCard: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    ...Shadow.sm,
  },
  wideCardIcon: { fontSize: 22, marginRight: Spacing.sm },
  wideCardText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.white,
    flex: 1,
  },

  // Grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
  },
  gridCard: {
    width: '48%',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    marginBottom: Spacing.sm,
  },
  gridIcon: { fontSize: 30, marginBottom: Spacing.sm },
  gridTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.white,
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default HomeScreen;
