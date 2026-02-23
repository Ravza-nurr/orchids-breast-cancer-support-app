import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import Button from '../../components/Button';
import SuccessModal from '../../components/SuccessModal';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../../theme';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AskExpertText'>;
};

const categories = [
  'Kemoterapi Yan Etkileri',
  'Beslenme ve Diyet',
  'Psikolojik Destek',
  'İlaç Kullanımı',
  'Egzersiz ve Fizik Tedavi',
  'Diğer',
];

const AskExpertTextScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!selectedCategory) {
      setError('Lütfen bir kategori seçin.');
      return;
    }
    if (question.trim().length < 10) {
      setError('Sorunuzu en az 10 karakter olarak yazın.');
      return;
    }
    setError('');
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1200));
    setLoading(false);
    setShowSuccess(true);
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
              <Text style={styles.headerTitle}>Yazılı Soru Sor</Text>
              <Text style={styles.headerSub}>Uzmanlarımıza sorunuzu iletin</Text>
            </View>
          </View>

          <ScrollView
            contentContainerStyle={styles.body}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Category */}
            <View style={[styles.section, Shadow.sm]}>
              <Text style={styles.sectionTitle}>Kategori Seçin</Text>
              <View style={styles.catGrid}>
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.catChip,
                      selectedCategory === cat && styles.catChipActive,
                    ]}
                    onPress={() => setSelectedCategory(cat)}
                  >
                    <Text
                      style={[
                        styles.catChipText,
                        selectedCategory === cat && styles.catChipTextActive,
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Question */}
            <View style={[styles.section, Shadow.sm]}>
              <Text style={styles.sectionTitle}>Sorunuzu Yazın</Text>
              <TextInput
                style={styles.textArea}
                multiline
                numberOfLines={6}
                placeholder="Sorunuzu buraya yazın... (en az 10 karakter)"
                placeholderTextColor={Colors.textMuted}
                value={question}
                onChangeText={setQuestion}
                textAlignVertical="top"
              />
              <Text style={styles.charCount}>{question.length} karakter</Text>
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <Button
              title="Soruyu Gönder"
              onPress={handleSubmit}
              loading={loading}
              style={styles.submitBtn}
            />

            <View style={styles.noteBox}>
              <Text style={styles.noteText}>
                📌 Sorularınız 24-48 saat içinde uzmanlarımız tarafından yanıtlanır. Acil durumlarda 112'yi arayın.
              </Text>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>

      <SuccessModal
        visible={showSuccess}
        title="Soru Gönderildi!"
        message="Sorunuz uzmanlarımıza iletildi. En kısa sürede yanıtlanacak."
        onClose={() => {
          setShowSuccess(false);
          navigation.goBack();
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
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
  body: { padding: Spacing.md, paddingBottom: Spacing.xxl },
  section: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  catGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  catChip: {
    paddingVertical: 6,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1.5,
    borderColor: Colors.border,
    marginBottom: 4,
  },
  catChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  catChipText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  catChipTextActive: {
    color: Colors.white,
    fontWeight: FontWeight.semibold,
  },
  textArea: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    minHeight: 140,
    lineHeight: 22,
  },
  charCount: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    textAlign: 'right',
    marginTop: 4,
  },
  errorText: {
    fontSize: FontSize.sm,
    color: Colors.error,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  submitBtn: { marginBottom: Spacing.sm },
  noteBox: {
    backgroundColor: Colors.primaryXLight,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
  },
  noteText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});

export default AskExpertTextScreen;
