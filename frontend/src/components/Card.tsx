import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Colors, BorderRadius, FontSize, FontWeight, Spacing, Shadow } from '../theme';

interface CardProps {
  title: string;
  icon?: React.ReactNode;
  color?: string;
  onPress?: () => void;
  style?: ViewStyle;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  icon,
  color = Colors.primary,
  onPress,
  style,
  children,
}) => {
  const content = (
    <View style={[styles.card, { backgroundColor: color }, Shadow.md, style]}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={styles.title} numberOfLines={2}>{title}</Text>
      {children}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
        {content}
      </TouchableOpacity>
    );
  }
  return content;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  iconContainer: { marginBottom: Spacing.sm },
  title: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.white,
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default Card;
