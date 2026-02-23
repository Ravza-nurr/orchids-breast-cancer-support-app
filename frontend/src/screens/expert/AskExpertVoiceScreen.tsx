import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import SuccessModal from '../../components/SuccessModal';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../../theme';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AskExpertVoice'>;
};

const AskExpertVoiceScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDone, setRecordingDone] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startPulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.25,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopPulse = () => {
    pulseAnim.stopAnimation();
    pulseAnim.setValue(1);
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      // Stop
      stopPulse();
      if (timerRef.current) clearInterval(timerRef.current);
      setIsRecording(false);
      setRecordingDone(true);
    } else {
      // Start
      setRecordingDone(false);
      setSeconds(0);
      setIsRecording(true);
      startPulse();
      timerRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s >= 120) {
            handleToggleRecording();
            return s;
          }
          return s + 1;
        });
      }, 1000);
    }
  };

  const handleSend = async () => {
    setShowSuccess(true);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
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
            <Text style={styles.headerTitle}>Sesli Mesaj</Text>
            <Text style={styles.headerSub}>Kayıt yaparak soru gönderin</Text>
          </View>
        </View>

        <View style={styles.body}>
          {/* Tip box */}
          <View style={[styles.tipBox, Shadow.sm]}>
            <Text style={styles.tipText}>
              🎙️ Kayıt butonuna basarak sorunuzu sesli olarak kaydedin. Maksimum 2 dakika.
            </Text>
          </View>

          {/* Recorder */}
          <View style={[styles.recorderCard, Shadow.md]}>
            {/* Timer */}
            <Text style={styles.timer}>{formatTime(seconds)}</Text>
            <Text style={styles.timerLabel}>
              {isRecording ? '● Kayıt yapılıyor...' : recordingDone ? '✓ Kayıt tamamlandı' : 'Kayıt bekleniyor'}
            </Text>

            {/* Pulse button */}
            <View style={styles.pulseWrapper}>
              <Animated.View
                style={[
                  styles.pulseRing,
                  {
                    transform: [{ scale: pulseAnim }],
                    opacity: isRecording ? 0.35 : 0,
                  },
                ]}
              />
              <TouchableOpacity
                style={[
                  styles.recordButton,
                  isRecording && styles.recordButtonActive,
                ]}
                onPress={handleToggleRecording}
                activeOpacity={0.8}
              >
                <Text style={styles.recordIcon}>{isRecording ? '⏹' : '🎙️'}</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.hint}>
              {isRecording ? 'Durdurmak için tekrar basın' : 'Kayda başlamak için basın'}
            </Text>
          </View>

          {/* Send button */}
          {recordingDone && (
            <View style={styles.sendSection}>
              <TouchableOpacity
                style={styles.sendButton}
                onPress={handleSend}
                activeOpacity={0.85}
              >
                <Text style={styles.sendIcon}>📤</Text>
                <Text style={styles.sendText}>Sesli Mesajı Gönder</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.retryButton}
                onPress={() => {
                  setRecordingDone(false);
                  setSeconds(0);
                }}
              >
                <Text style={styles.retryText}>Yeniden Kayıt Yap</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <SuccessModal
        visible={showSuccess}
        title="Sesli Mesaj Gönderildi!"
        message="Sesli mesajınız uzmanlarımıza iletildi. En kısa sürede yanıtlanacak."
        onClose={() => {
          setShowSuccess(false);
          navigation.goBack();
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: '#7C4DFF',
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
  body: { flex: 1, padding: Spacing.md },
  tipBox: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  tipText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  recorderCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  timer: {
    fontSize: 48,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    fontVariant: ['tabular-nums'],
    letterSpacing: 2,
  },
  timerLabel: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    marginTop: 4,
    marginBottom: Spacing.xl,
  },
  pulseWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  pulseRing: {
    position: 'absolute',
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#E91E63',
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordButtonActive: {
    backgroundColor: '#E91E63',
  },
  recordIcon: { fontSize: 32 },
  hint: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
  sendSection: { alignItems: 'center' },
  sendButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.sm,
    width: '100%',
    justifyContent: 'center',
  },
  sendIcon: { fontSize: 18, marginRight: Spacing.sm },
  sendText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.white,
  },
  retryButton: {
    padding: Spacing.sm,
  },
  retryText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
});

export default AskExpertVoiceScreen;
