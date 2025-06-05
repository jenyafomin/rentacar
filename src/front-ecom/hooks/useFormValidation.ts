import { useState, useCallback } from 'react';
import { EConType } from 'types/enum/ERequest';

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

interface ValidationRules {
  [key: string]: ValidationRule;
}

interface ValidationErrors {
  [key: string]: string;
}

export function useFormValidation(rules: ValidationRules) {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isValidating, setIsValidating] = useState(false);

  const validateField = useCallback((name: string, value: any): string | null => {
    const rule = rules[name];
    if (!rule) return null;

    // Required validation
    if (rule.required) {
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        return 'This field is required';
      }
    }

    // Skip other validations if value is empty and not required
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return null;
    }

    // MinLength validation
    if (rule.minLength && value.length < rule.minLength) {
      return `Minimum ${rule.minLength} characters required`;
    }

    // MaxLength validation
    if (rule.maxLength && value.length > rule.maxLength) {
      return `Maximum ${rule.maxLength} characters allowed`;
    }

    // Pattern validation
    if (rule.pattern && !rule.pattern.test(value)) {
      return 'Invalid format';
    }

    // Custom validation
    if (rule.custom) {
      return rule.custom(value);
    }

    return null;
  }, [rules]);

  const validateForm = useCallback((data: any): boolean => {
    setIsValidating(true);
    const newErrors: ValidationErrors = {};

    Object.keys(rules).forEach(fieldName => {
      const error = validateField(fieldName, data[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
      }
    });

    setErrors(newErrors);
    setIsValidating(false);
    return Object.keys(newErrors).length === 0;
  }, [rules, validateField]);

  const validateSingleField = useCallback((name: string, value: any) => {
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error || ''
    }));
    return !error;
  }, [validateField]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const clearFieldError = useCallback((fieldName: string) => {
    setErrors(prev => ({
      ...prev,
      [fieldName]: ''
    }));
  }, []);

  return {
    errors,
    validateForm,
    validateSingleField,
    clearErrors,
    clearFieldError,
    isValidating
  };
}

// Предопределенные правила валидации для contact form
export const contactFormValidationRules: ValidationRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-ZÀ-ÿ\s]+$/,
    custom: (value: string) => {
      if (value && value.trim().length < 2) {
        return 'Name must be at least 2 characters';
      }
      return null;
    }
  },
  connectionValue: {
    required: true,
    custom: (value: string, connectionType?: EConType) => {
      if (!value || value.trim() === '') {
        return 'Contact information is required';
      }
      return null;
    }
  },
  description: {
    maxLength: 500,
    custom: (value: string) => {
      if (value && value.trim().length > 500) {
        return 'Message is too long (max 500 characters)';
      }
      return null;
    }
  }
};

// Специальная валидация для разных типов связи
export const validateConnectionValue = (value: string, connectionType: EConType): string | null => {
  if (!value || value.trim() === '') {
    return 'This field is required';
  }

  switch (connectionType) {
    case EConType.EMAIL:
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        return 'Please enter a valid email address';
      }
      break;
    
    case EConType.PHONE:
      const phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phonePattern.test(value.replace(/[\s\-\(\)]/g, ''))) {
        return 'Please enter a valid phone number';
      }
      break;
    
    case EConType.TELEGRAM:
      if (!value.startsWith('@') && !value.startsWith('+')) {
        return 'Telegram should start with @ or + (for phone)';
      }
      if (value.startsWith('@') && value.length < 5) {
        return 'Telegram username should be at least 5 characters';
      }
      break;
    
    case EConType.WHATSAPP:
      const whatsappPattern = /^[\+]?[1-9][\d]{0,15}$/;
      if (!whatsappPattern.test(value.replace(/[\s\-\(\)]/g, ''))) {
        return 'Please enter a valid WhatsApp number';
      }
      break;
  }

  return null;
}; 