import React, { useState } from 'react';
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
import { RootStackParamList } from '../navigation/AppNavigator';
import SuccessModal from '../components/SuccessModal';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../theme';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'UploadBloodTest'>;
};

type UploadedFile = {
  name: string;
  date: string;
  size: string;
};

const UploadBloodTestScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleUpload = (source: 'gallery' | 'camera') => {
    // Simulated upload
    const label = source === 'gallery' ? 'Galeri' : 'Kamera';
    Alert.alert(
      `${label}'dan Yükle`,
      `"${label}" seçeneğiyle kan tahlili yüklenecek.\n\n(Bu demo sürümde dosya gerçekten yüklenmez.)`,
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Simüle Et',
          onPress: () => {
            const mockFile: UploadedFile = {
              name: `kan_tahlili_${Date.now()}.pdf`,
              date: new Date().toLocaleDateString('tr-TR'),
              size: `${(Math.random() * 2 + 0.5).toFixed(1)} MB`,
            };
            setUploadedFiles((prev) => [mockFile, ...prev]);
            setShowSuccess(true);
          },
        },
      ]
    );
  };

  return (
    <>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerTitles}>
            <Text style={styles.headerTitle}>Kan Tahlili Yükle</Text>
            <Text style={styles.headerSub}>Tahlil sonuçlarınızı güvenle saklayın</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
          {/* Info Card */}
          <View style={[styles.infoCard, Shadow.sm]}>
            <Text style={styles.infoIcon}>🩸</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Kan Tahlili Neden Önemli?</Text>
              <Text style={styles.infoText}>
                Tedavi sürecinizde kan değerlerinizin takibi kritik önem taşır.
                Tahlil sonuçlarınızı burada saklayarak doktorunuzla kolayca paylaşabilirsiniz.
              </Text>
            </View>
          </View>

          {/* Upload Buttons */}
          <Text style={styles.sectionTitle}>Yükleme Yöntemi</Text>

          <View style={styles.uploadRow}>
            <TouchableOpacity
              style={[styles.uploadCard, { backgroundColor: Colors.primary }, Shadow.md]}
              onPress={() => handleUpload('gallery')}
              activeOpacity={0.85}
            >
              <Text style={styles.uploadIcon}>🖼️</Text>
              <Text style={styles.uploadCardTitle}>Galeriden Seç</Text>
              <Text style={styles.uploadCardDesc}>Fotoğraf veya PDF</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.uploadCard, { backgroundColor: '#F44336' }, Shadow.md]}
              onPress={() => handleUpload('camera')}
              activeOpacity={0.85}
            >
              <Text style={styles.uploadIcon}>📷</Text>
              <Text style={styles.uploadCardTitle}>Kameradan Çek</Text>
              <Text style={styles.uploadCardDesc}>Anlık fotoğraf</Text>
            </TouchableOpacity>
          </View>

          {/* Uploaded files */}
          {uploadedFiles.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Yüklenen Dosyalar</Text>
              {uploadedFiles.map((file, i) => (
                <View key={i} style={[styles.fileCard, Shadow.sm]}>
                  <View style={styles.fileIconBox}>
                    <Text style={styles.fileIconText}>📄</Text>
                  </View>
                  <View style={styles.fileInfo}>
                    <Text style={styles.fileName} numberOfLines={1}>{file.name}</Text>
                    <Text style={styles.fileMeta}>{file.date} · {file.size}</Text>
                  </View>
                  <View style={styles.fileStatusBadge}>
                    <Text style={styles.fileStatusText}>✓ Yüklendi</Text>
                  </View>
                </View>
              ))}
            </>
          )}

          {uploadedFiles.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📋</Text>
              <Text style={styles.emptyText}>Henüz yüklenen tahlil sonucu yok.</Text>
              <Text style={styles.emptySubtext}>Yukarıdaki butonlardan tahlil yükleyin.</Text>
            </View>
          )}

          {/* Tip */}
          <View style={styles.tipBox}>
            <Text style={styles.tipText}>
              💡 Tahlillerinizi düzenli aralıklarla yükleyerek tedavi sürecinizi daha iyi takip edebilirsiniz.
            </Text>
          </View>
        </ScrollView>
      </View>

      <SuccessModal
        visible={showSuccess}
        title="Tahlil Yüklendi!"
        message="Kan tahlili sonucunuz başarıyla sisteme eklendi."
        onClose={() => setShowSuccess(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: '#F44336',
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
  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
  },
  infoIcon: { fontSize: 32, marginRight: Spacing.sm, marginTop: 2 },
  infoContent: { flex: 1 },
  infoTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  infoText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  uploadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  uploadCard: {
    width: '48%',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 110,
  },
  uploadIcon: { fontSize: 34, marginBottom: Spacing.xs },
  uploadCardTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.white,
    textAlign: 'center',
  },
  uploadCardDesc: {
    fontSize: FontSize.xs,
    color: Colors.white,
    opacity: 0.85,
    marginTop: 2,
  },
  fileCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  fileIconBox: {
    width: 44,
    height: 44,
    backgroundColor: Colors.errorLight,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  fileIconText: { fontSize: 22 },
  fileInfo: { flex: 1 },
  fileName: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
  },
  fileMeta: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  fileStatusBadge: {
    backgroundColor: Colors.successLight,
    borderRadius: BorderRadius.full,
    paddingVertical: 4,
    paddingHorizontal: Spacing.sm,
  },
  fileStatusText: {
    fontSize: FontSize.xs,
    color: Colors.success,
    fontWeight: FontWeight.semibold,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
  },
  emptyIcon: { fontSize: 40, marginBottom: Spacing.sm },
  emptyText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.textSecondary,
  },
  emptySubtext: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    marginTop: 4,
  },
  tipBox: {
    backgroundColor: Colors.primaryXLight,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginTop: Spacing.sm,
  },
  tipText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});

export default UploadBloodTestScreen;
