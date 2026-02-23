import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, BorderRadius, FontSize, FontWeight, Spacing } from '../theme';

const VideoPlaceholder: React.FC<{ title?: string }> = ({ title }) => (
  <View style={styles.container}>
    <Text style={styles.playIcon}>▶</Text>
    {title && <Text style={styles.title}>{title}</Text>}
    <Text style={styles.hint}>Video oynatmak için dokunun</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: Colors.primaryLight,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
    marginVertical: Spacing.md,
  },
  playIcon: {
    fontSize: 40,
    color: Colors.primary,
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    textAlign: 'center',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.xs,
  },
  hint: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
});

export default VideoPlaceholder;
