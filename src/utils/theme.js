// theme.js

const colors = {
  primary: '#5B67F3', // أزرق عصري
  secondary: '#A259F7', // بنفسجي فاتح
  accent: '#FFB86C', // برتقالي فاتح
  background: '#F7F8FA', // خلفية فاتحة جدًا
  card: '#FFFFFF', // أبيض للبطاقات
  text: '#222B45', // نص داكن
  textSecondary: '#6E7FAA', // نص ثانوي
  border: '#E5E9F2', // حدود فاتحة
  success: '#4CD964', // أخضر للنجاح
  error: '#FF5A5F', // أحمر للأخطاء
  warning: '#FFD600', // أصفر للتحذيرات
  shadow: 'rgba(91, 103, 243, 0.08)', // ظل خفيف
};

const fonts = {
  regular: 'System', // يمكنك استبداله بخط Google Fonts لاحقًا
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