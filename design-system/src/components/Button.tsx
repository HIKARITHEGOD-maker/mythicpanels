import React from 'react';
import { colors, spacing, typography } from '../tokens';

interface ButtonProps {
  label: string;
  onClick?: () => void;
}

export const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: colors.primary,
        color: 'white',
        padding: spacing.md,
        border: 'none',
        borderRadius: '6px',
        fontFamily: typography.fontFamily,
        fontSize: typography.fontSize.body,
        cursor: 'pointer'
      }}
    >
      {label}
    </button>
  );
};