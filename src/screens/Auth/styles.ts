// src/screens/Auth/styles.ts
import { StyleSheet } from 'react-native';

// You can define your theme colors here or import from a global theme file
export const colors = {
  primary: '#007AFF',
  background: '#FFFFFF',
  inputBackground: '#f2f2f7',
  error: '#ff3b30',
  success: '#34c759',
  text: '#000000',
  textSecondary: '#3c3c43',
  border: '#e3e3e8',
  buttonBackground: '#e3e3e8'
};

export const typography = {
  title: {
    fontSize: 28,
    fontWeight: '700' as const,
  },
  body: {
    fontSize: 17,
  },
  button: {
    fontSize: 17,
    fontWeight: '600' as const,
  },
  caption: {
    fontSize: 15,
  }
};

export const authStyles = StyleSheet.create({
  // Layout
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  formContainer: {
    marginBottom: 20,
  },

  // Typography
  title: {
    fontSize: typography.title.fontSize,
    fontWeight: typography.title.fontWeight,
    marginBottom: 20,
    textAlign: 'center',
    color: colors.text,
  },
  errorText: {
    fontSize: typography.caption.fontSize,
    color: colors.error,
    textAlign: 'center',
    marginBottom: 12,
  },
  successText: {
    fontSize: typography.caption.fontSize,
    color: colors.success,
    textAlign: 'center',
    marginBottom: 12,
  },

  // Inputs
  input: {
    fontSize: typography.body.fontSize,
    backgroundColor: colors.inputBackground,
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },

  // Buttons
  primaryButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: typography.button.fontSize,
    fontWeight: typography.button.fontWeight,
    color: colors.background,
  },
  secondaryButton: {
    backgroundColor: colors.buttonBackground,
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: typography.button.fontSize,
    fontWeight: typography.button.fontWeight,
    color: colors.text,
  },
  link: {
    padding: 12,
  },
  linkText: {
    fontSize: typography.body.fontSize,
    color: colors.primary,
    textAlign: 'center',
  },

  // Dividers
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 20,
  },

  // Form
  form: {
    width: '100%',
  },

  // Loading state
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  }
});