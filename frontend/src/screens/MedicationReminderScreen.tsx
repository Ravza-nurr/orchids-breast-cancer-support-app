import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../navigation/AppNavigator';
import SuccessModal from '../components/SuccessModal';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../theme';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MedicationReminder'>;
};

interface Medication {
  id: string;
  name: string;
  dose: string;
  time: string;
  frequency: string;
  createdAt: string;
}

const STORAGE_KEY = '@medications_list';

const FREQUENCIES = ['Her gün', 'Günaşırı', 'Haftada 1', 'Haftada 3', 'Gerektiğinde'];

const PRESET_TIMES = ['08:00', '12:00', '14:00', '18:00', '22:00'];

const MedicationReminderScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [medications, setMedications] = useState<Medication[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form fields
  const [name, setName] = useState('');
  const [dose, setDose] = useState('');
  const [time, setTime] = useState('');
  const [frequency, setFrequency] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadMedications();
  }, []);

  const loadMedications = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) setMedications(JSON.parse(data));
    } catch (_) {}
  };

  const saveMedications = async (list: Medication[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (_) {}
  };

  const handleAdd = async () => {
    if (!name.trim()) {
      setError('İlaç adı gerekli.');
      return;
    }
    if (!time.trim()) {
      setError('Saat bilgisi gerekli.');
      return;
    }
    if (!frequency) {
      setError('Kullanım sıklığı seçin.');
      return;
    }
    setError('');

    const newMed: Medication = {
      id: Date.now().toString(),
      name: name.trim(),
      dose: dose.trim() || '—',
      time: time.trim(),
      frequency,
      createdAt: new Date().toLocaleDateString('tr-TR'),
    };

    const updated = [newMed, ...medications];
    setMedications(updated);
    await saveMedications(updated);

    // Reset form
    setName('');
    setDose('');
    setTime('');
    setFrequency('');
    setShowForm(false);
    setShowSuccess(true);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'İlacı Sil',
      'Bu ilacı listeden kaldırmak istiyor musunuz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: async () => {
            const updated = medications.filter((m) => m.id !== id);
            setMedications(updated);
            await saveMedications(updated);
          },
        },
      ]
    );
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
              <Text style={styles.headerTitle}>İlaç Hatırlatıcı</Text>
              <Text style={styles.headerSub}>İlaçlarınızı takip edin</Text>
            </View>
            <TouchableOpacity
              style={styles.addHeaderBtn}
              onPress={() => setShowForm((v) => !v)}
            >
              <Text style={styles.addHeaderBtnText}>{showForm ? '✕' : '+ Ekle'}</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.body}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Add Form */}
            {showForm && (
              <View style={[styles.formCard, Shadow.md]}>
                <Text style={styles.formTitle}>Yeni İlaç Ekle</Text>

                {/* Name */}
                <Text style={styles.inputLabel}>İlaç Adı *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Örn: Anastrozol, Tamoksifen..."
                  placeholderTextColor={Colors.textMuted}
                  value={name}
                  onChangeText={setName}
                />

                {/* Dose */}
                <Text style={styles.inputLabel}>Doz (isteğe bağlı)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Örn: 1 mg, 20 mg, 1 tablet..."
                  placeholderTextColor={Colors.textMuted}
                  value={dose}
                  onChangeText={setDose}
                />

                {/* Time presets */}
                <Text style={styles.inputLabel}>Saat *</Text>
                <View style={styles.presetRow}>
                  {PRESET_TIMES.map((t) => (
                    <TouchableOpacity
                      key={t}
                      style={[styles.presetChip, time === t && styles.presetChipActive]}
                      onPress={() => setTime(t)}
                    >
                      <Text style={[styles.presetChipText, time === t && styles.presetChipTextActive]}>
                        {t}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <TextInput
                  style={[styles.input, { marginTop: 6 }]}
                  placeholder="Veya kendiniz yazın: 09:30"
                  placeholderTextColor={Colors.textMuted}
                  value={time}
                  onChangeText={setTime}
                  keyboardType="numbers-and-punctuation"
                />

                {/* Frequency */}
                <Text style={styles.inputLabel}>Kullanım Sıklığı *</Text>
                <View style={styles.freqGrid}>
                  {FREQUENCIES.map((f) => (
                    <TouchableOpacity
                      key={f}
                      style={[styles.freqChip, frequency === f && styles.freqChipActive]}
                      onPress={() => setFrequency(f)}
                    >
                      <Text style={[styles.freqChipText, frequency === f && styles.freqChipTextActive]}>
                        {f}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <TouchableOpacity style={styles.saveButton} onPress={handleAdd} activeOpacity={0.85}>
                  <Text style={styles.saveButtonText}>💊 Kaydet</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Info box */}
            <View style={[styles.infoBox, Shadow.sm]}>
              <Text style={styles.infoIcon}>⏰</Text>
              <Text style={styles.infoText}>
                İlaç saatlerinizi burada kaydedin. Gerçek bildirim için cihazınızın alarm uygulamasını kullanmanızı öneririz.
              </Text>
            </View>

            {/* List */}
            {medications.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>💊</Text>
                <Text style={styles.emptyTitle}>Henüz ilaç eklenmedi</Text>
                <Text style={styles.emptySubtitle}>
                  Yukarıdaki "Ekle" butonuna basarak ilaçlarınızı kaydedin.
                </Text>
              </View>
            ) : (
              <>
                <Text style={styles.listTitle}>İlaç Listeniz ({medications.length})</Text>
                {medications.map((med) => (
                  <View key={med.id} style={[styles.medCard, Shadow.sm]}>
                    <View style={styles.medIconBox}>
                      <Text style={styles.medIconText}>💊</Text>
                    </View>
                    <View style={styles.medInfo}>
                      <Text style={styles.medName}>{med.name}</Text>
                      <View style={styles.medMetaRow}>
                        <View style={styles.medBadge}>
                          <Text style={styles.medBadgeText}>🕐 {med.time}</Text>
                        </View>
                        <View style={[styles.medBadge, { backgroundColor: Colors.accentLight }]}>
                          <Text style={[styles.medBadgeText, { color: Colors.accent }]}>
                            {med.frequency}
                          </Text>
                        </View>
                        {med.dose !== '—' && (
                          <View style={[styles.medBadge, { backgroundColor: Colors.successLight }]}>
                            <Text style={[styles.medBadgeText, { color: Colors.success }]}>
                              {med.dose}
                            </Text>
                          </View>
                        )}
                      </View>
                      <Text style={styles.medDate}>Eklendi: {med.createdAt}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.deleteBtn}
                      onPress={() => handleDelete(med.id)}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Text style={styles.deleteBtnText}>✕</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </>
            )}

            {/* Disclaimer */}
            <View style={styles.disclaimerBox}>
              <Text style={styles.disclaimerText}>
                ⚕️ İlaç değişiklikleri için mutlaka doktorunuza danışın. Bu liste yalnızca kişisel takip amaçlıdır.
              </Text>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>

      <SuccessModal
        visible={showSuccess}
        title="İlaç Kaydedildi!"
        message="İlaç bilgileriniz başarıyla eklendi."
        onClose={() => setShowSuccess(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: '#5C6BC0',
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
  addHeaderBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: BorderRadius.full,
    paddingVertical: 6,
    paddingHorizontal: Spacing.md,
  },
  addHeaderBtnText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.white,
  },
  body: { padding: Spacing.md, paddingBottom: Spacing.xxl },
  formCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  formTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  inputLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingVertical: 11,
    paddingHorizontal: Spacing.md,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  presetRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 2,
  },
  presetChip: {
    paddingVertical: 6,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  presetChipActive: {
    backgroundColor: '#5C6BC0',
    borderColor: '#5C6BC0',
  },
  presetChipText: { fontSize: FontSize.sm, color: Colors.textSecondary },
  presetChipTextActive: { color: Colors.white, fontWeight: FontWeight.semibold },
  freqGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: Spacing.md,
  },
  freqChip: {
    paddingVertical: 7,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  freqChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  freqChipText: { fontSize: FontSize.sm, color: Colors.textSecondary },
  freqChipTextActive: { color: Colors.white, fontWeight: FontWeight.semibold },
  errorText: {
    fontSize: FontSize.sm,
    color: Colors.error,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  saveButton: {
    backgroundColor: '#5C6BC0',
    borderRadius: BorderRadius.full,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.white,
  },
  infoBox: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  infoIcon: { fontSize: 22, marginRight: Spacing.sm, marginTop: 2 },
  infoText: {
    flex: 1,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.sm,
  },
  emptyIcon: { fontSize: 52, marginBottom: Spacing.sm },
  emptyTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: Spacing.xl,
    lineHeight: 20,
  },
  listTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  medCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  medIconBox: {
    width: 44,
    height: 44,
    backgroundColor: '#EDE7F6',
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  medIconText: { fontSize: 22 },
  medInfo: { flex: 1 },
  medName: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  medMetaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginBottom: 4 },
  medBadge: {
    backgroundColor: Colors.primaryXLight,
    borderRadius: BorderRadius.full,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  medBadgeText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: Colors.primary,
  },
  medDate: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  deleteBtn: {
    padding: Spacing.xs,
    marginLeft: Spacing.xs,
    marginTop: 2,
  },
  deleteBtnText: {
    fontSize: FontSize.md,
    color: Colors.textMuted,
    fontWeight: FontWeight.bold,
  },
  disclaimerBox: {
    backgroundColor: Colors.warningLight,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: Colors.warning,
    marginTop: Spacing.sm,
  },
  disclaimerText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});

export default MedicationReminderScreen;
