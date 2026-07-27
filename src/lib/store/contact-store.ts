'use client';

import { useState, useEffect } from 'react';

export interface ContactSettings {
  phone: string;
  whatsapp: string;
  whatsappLink: string;
  email: string;
  pressEmail: string;
  address: string;
  cityCountry: string;
  operatingHours: string;
  mapEmbedUrl: string;
  heroTitle: string;
  heroSubtitle: string;
  socials: {
    instagram: string;
    facebook: string;
    twitter: string;
    pinterest: string;
    youtube: string;
    linkedin: string;
  };
}

export const DEFAULT_CONTACT_SETTINGS: ContactSettings = {
  phone: '+1 (800) 892-4190',
  whatsapp: '+1 (800) 892-4190',
  whatsappLink: 'https://wa.me/18008924190',
  email: 'concierge@piyella.com',
  pressEmail: 'press@piyella.com',
  address: '740 Fifth Avenue, Suite 1800',
  cityCountry: 'New York, NY 10019, United States',
  operatingHours: 'Monday – Friday: 9:00 AM – 8:00 PM EST',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.996766436814!2d-73.97541602342475!3d40.76210097138549!2m3!1f0!1f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258f97bf76629%3A0x63eb3083652c79f9!2s740%205th%20Ave%2C%20New%20York%2C%20NY%2010019!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus',
  heroTitle: 'Atelier Client Concierge',
  heroSubtitle: 'Our dedicated luxury client advisor team is available to assist with bespoke orders, private appointments, and general inquiries.',
  socials: {
    instagram: 'https://instagram.com/piyella_official',
    facebook: 'https://facebook.com/piyellaofficial',
    twitter: 'https://x.com/piyellaofficial',
    pinterest: 'https://pinterest.com/piyella_atelier',
    youtube: 'https://youtube.com/@piyellaofficial',
    linkedin: 'https://linkedin.com/company/piyella',
  },
};

const STORAGE_KEY = 'piyella_contact_settings_v1';

export function useContactStore() {
  const [settings, setSettings] = useState<ContactSettings>(DEFAULT_CONTACT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setSettings({ ...DEFAULT_CONTACT_SETTINGS, ...JSON.parse(saved) });
      }
    } catch (e) {
      console.error('Failed to load contact settings:', e);
    }
    setIsLoaded(true);
  }, []);

  const updateSettings = (newSettings: Partial<ContactSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save contact settings:', e);
      }
      return updated;
    });
  };

  const resetToDefaults = () => {
    setSettings(DEFAULT_CONTACT_SETTINGS);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CONTACT_SETTINGS));
    } catch (e) {
      console.error('Failed to reset contact settings:', e);
    }
  };

  return { settings, updateSettings, resetToDefaults, isLoaded };
}
