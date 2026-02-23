export const Colors = {
  primary: '#2BBBAD',
  primaryDark: '#1E9E91',
  primaryLight: '#E0F5F4',
  primaryXLight: '#F0FAFA',

  secondary: '#FF7043',
  secondaryLight: '#FFF3EE',

  accent: '#7C4DFF',
  accentLight: '#EDE7FF',

  success: '#4CAF50',
  successLight: '#E8F5E9',

  warning: '#FF9800',
  warningLight: '#FFF8E1',

  error: '#F44336',
  errorLight: '#FFEBEE',

  white: '#FFFFFF',
  background: '#F8FDFC',
  surface: '#FFFFFF',
  border: '#E0F2F1',

  textPrimary: '#263238',
  textSecondary: '#607D8B',
  textMuted: '#90A4AE',
  textOnPrimary: '#FFFFFF',

  cardColors: {
    covid: '#2BBBAD',
    breastCancer: '#FF7043',
    symptom: '#7C4DFF',
    expert: '#00BCD4',
    experiences: '#E91E63',
    calendar: '#FF9800',
    bloodTest: '#F44336',
    about: '#607D8B',
    contact: '#4CAF50',
    logout: '#90A4AE',
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const FontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  xxxl: 30,
};

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const Shadow = {
  sm: {
    shadowColor: '#2BBBAD',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  md: {
    shadowColor: '#2BBBAD',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
  },
};
