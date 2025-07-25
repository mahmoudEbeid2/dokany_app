// theme.js

const colors = {
  primary: '#5B67F3',
  secondary: '#A259F7',
  accent: '#FFB86C',
  background: '#F7F8FA',
  card: '#FFFFFF',
  text: '#222B45',
  textSecondary: '#6E7FAA',
  border: '#E5E9F2',
  success: '#4CD964',
  error: '#FF5A5F',
  warning: '#FFD600',
  shadow: 'rgba(91, 103, 243, 0.08)',
};

const fonts = {
  regular: 'System',
  bold: 'System',
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
};

const radius = {
  sm: 8,
  md: 16,
  lg: 24,
};

const shadow = {
  shadowColor: colors.shadow,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.12,
  shadowRadius: 12,
  elevation: 4,
};

export default {
  colors,
  fonts,
  radius,
  shadow,
}; 