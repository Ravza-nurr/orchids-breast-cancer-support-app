import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../theme';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SymptomCalendar'>;
};

type DayEntry = {
  [key: number]: { level: number; label: string; color: string };
};

const SYMPTOM_LEVELS = [
  { level: 0, label: 'Belirti Yok', color: '#E0F5F4' },
  { level: 1, label: 'Hafif', color: '#A5D6A7' },
  { level: 2, label: 'Orta', color: '#FFB74D' },
  { level: 3, label: 'Şiddetli', color: '#EF9A9A' },
];

// Mock symptom data for the current month
const mockDayData: DayEntry = {
  1:  { level: 1, label: 'Hafif', color: '#A5D6A7' },
  3:  { level: 2, label: 'Orta', color: '#FFB74D' },
  5:  { level: 1, label: 'Hafif', color: '#A5D6A7' },
  7:  { level: 3, label: 'Şiddetli', color: '#EF9A9A' },
  8:  { level: 3, label: 'Şiddetli', color: '#EF9A9A' },
  10: { level: 2, label: 'Orta', color: '#FFB74D' },
  12: { level: 1, label: 'Hafif', color: '#A5D6A7' },
  14: { level: 0, label: 'Belirti Yok', color: '#E0F5F4' },
  15: { level: 1, label: 'Hafif', color: '#A5D6A7' },
  17: { level: 2, label: 'Orta', color: '#FFB74D' },
  20: { level: 1, label: 'Hafif', color: '#A5D6A7' },
  22: { level: 0, label: 'Belirti Yok', color: '#E0F5F4' },
  25: { level: 2, label: 'Orta', color: '#FFB74D' },
  27: { level: 1, label: 'Hafif', color: '#A5D6A7' },
};

const DAYS = ['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct'];

const SymptomCalendarScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const monthName = today.toLocaleString('tr-TR', { month: 'long', year: 'numeric' });

  const getDayColor = (day: number) => {
    const entry = mockDayData[day];
    if (!entry) return Colors.white;
    return entry.color;
  };

  const selectedEntry = selectedDay ? mockDayData[selectedDay] : null;

  // Build calendar grid
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerTitles}>
          <Text style={styles.headerTitle}>Belirti Takvimi</Text>
          <Text style={styles.headerSub}>Günlük belirti takibi</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        {/* Legend */}
        <View style={[styles.legendCard, Shadow.sm]}>
          <Text style={styles.legendTitle}>Belirti Şiddet Skalası</Text>
          <View style={styles.legendRow}>
            {SYMPTOM_LEVELS.map((s) => (
              <View key={s.level} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: s.color }]} />
                <Text style={styles.legendLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Calendar */}
        <View style={[styles.calendarCard, Shadow.md]}>
          <Text style={styles.monthTitle}>{monthName}</Text>

          {/* Day headers */}
          <View style={styles.weekRow}>
            {DAYS.map((d) => (
              <View key={d} style={styles.dayHeader}>
                <Text style={styles.dayHeaderText}>{d}</Text>
              </View>
            ))}
          </View>

          {/* Day cells */}
          <View style={styles.grid}>
            {cells.map((day, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.dayCell,
                  day ? { backgroundColor: getDayColor(day) } : styles.emptyCell,
                  day === selectedDay && styles.selectedCell,
                  day === today.getDate() && styles.todayCell,
                ]}
                onPress={() => day && setSelectedDay(day === selectedDay ? null : day)}
                disabled={!day}
                activeOpacity={0.75}
              >
                {day ? (
                  <Text
                    style={[
                      styles.dayCellText,
                      day === today.getDate() && styles.todayCellText,
                    ]}
                  >
                    {day}
                  </Text>
                ) : null}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Selected day info */}
        {selectedDay && (
          <View style={[styles.selectedInfo, Shadow.sm]}>
            <Text style={styles.selectedDayTitle}>
              📅 {selectedDay} {monthName} — Belirti Durumu
            </Text>
            {selectedEntry ? (
              <View style={[styles.levelBadge, { backgroundColor: selectedEntry.color }]}>
                <Text style={styles.levelBadgeText}>{selectedEntry.label}</Text>
              </View>
            ) : (
              <View style={[styles.levelBadge, { backgroundColor: Colors.primaryXLight }]}>
                <Text style={[styles.levelBadgeText, { color: Colors.primary }]}>
                  Belirti Kaydedilmemiş
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Stats */}
        <View style={[styles.statsCard, Shadow.sm]}>
          <Text style={styles.statsTitle}>Bu Ay Özeti</Text>
          <View style={styles.statsRow}>
            {[
              { label: 'Hafif', count: Object.values(mockDayData).filter(d => d.level === 1).length, color: '#A5D6A7' },
              { label: 'Orta', count: Object.values(mockDayData).filter(d => d.level === 2).length, color: '#FFB74D' },
              { label: 'Şiddetli', count: Object.values(mockDayData).filter(d => d.level === 3).length, color: '#EF9A9A' },
            ].map((s) => (
              <View key={s.label} style={styles.statItem}>
                <View style={[styles.statCircle, { backgroundColor: s.color }]}>
                  <Text style={styles.statCount}>{s.count}</Text>
                </View>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: '#FF9800',
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
  legendCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  legendTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  legendRow: { flexDirection: 'row', justifyContent: 'space-between' },
  legendItem: { alignItems: 'center' },
  legendDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginBottom: 4,
  },
  legendLabel: { fontSize: FontSize.xs, color: Colors.textMuted, textAlign: 'center' },
  calendarCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  monthTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.md,
    textTransform: 'capitalize',
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: Spacing.xs,
  },
  dayHeader: {
    flex: 1,
    alignItems: 'center',
  },
  dayHeaderText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: Colors.textMuted,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.sm,
    padding: 2,
    marginBottom: 2,
  },
  emptyCell: {
    backgroundColor: 'transparent',
  },
  selectedCell: {
    borderWidth: 2,
    borderColor: '#FF9800',
  },
  todayCell: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  dayCellText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: Colors.textPrimary,
  },
  todayCellText: {
    color: Colors.primary,
    fontWeight: FontWeight.bold,
  },
  selectedInfo: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  selectedDayTitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    flex: 1,
  },
  levelBadge: {
    borderRadius: BorderRadius.full,
    paddingVertical: 6,
    paddingHorizontal: Spacing.md,
  },
  levelBadgeText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
  },
  statsCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },
  statsTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: { alignItems: 'center' },
  statCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  statCount: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  statLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
});

export default SymptomCalendarScreen;
