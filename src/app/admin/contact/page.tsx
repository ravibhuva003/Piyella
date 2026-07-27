'use client';

import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Globe, 
  Save, 
  RefreshCw, 
  CheckCircle2, 
  MessageSquare,
  Share2,
  Sparkles
} from 'lucide-react';
import { 
  IconInstagram, 
  IconTwitterX, 
  IconFacebook, 
  IconPinterest, 
  IconLinkedin, 
  IconYoutube 
} from '@/components/shared/social-icons';
import { useContactStore, ContactSettings } from '@/lib/store/contact-store';

export default function AdminContactPage() {
  const { settings, updateSettings, resetToDefaults, isLoaded } = useContactStore();
  const [formData, setFormData] = useState<ContactSettings>(settings);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setFormData(settings);
    }
  }, [isLoaded, settings]);

  const handleChange = (field: keyof ContactSettings, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (key: keyof ContactSettings['socials'], value: string) => {
    setFormData((prev) => ({
      ...prev,
      socials: {
        ...prev.socials,
        [key]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all contact settings to default values?')) {
      resetToDefaults();
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  if (!isLoaded) {
    return (
      <div className="p-8 text-white flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-5 h-5 animate-spin text-[#C9A96E]" />
          <span>Loading Contact Management Settings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-10 space-y-8 text-white max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-[#C9A96E] text-xs font-semibold uppercase tracking-widest mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Storefront Settings</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-white">Contact & Social Media Management</h1>
          <p className="text-xs text-white/60 font-light mt-1">
            Manage phone numbers, support emails, location details, and social media handles visible to storefront visitors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs text-white/80 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset Defaults</span>
          </button>
          <button
            type="submit"
            form="contact-settings-form"
            className="flex items-center gap-2 px-6 py-2.5 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20"
          >
            <Save className="w-4 h-4" />
            <span>Save All Changes</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-xs flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Contact and Social Media settings updated successfully! Live storefront is synced.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Controls */}
        <form id="contact-settings-form" onSubmit={handleSubmit} className="lg:col-span-8 space-y-8">
          
          {/* Section 1: Page Header Info */}
          <div className="bg-[#0f0f0f] border border-white/10 p-6 sm:p-8 rounded-3xl space-y-6">
            <h2 className="font-serif text-xl text-white font-medium flex items-center gap-2 border-b border-white/10 pb-4">
              <Globe className="w-5 h-5 text-[#C9A96E]" />
              <span>Contact Page Header & Hero Banner</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-2">
                  Header Title
                </label>
                <input
                  type="text"
                  value={formData.heroTitle}
                  onChange={(e) => handleChange('heroTitle', e.target.value)}
                  className="w-full bg-black border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-2">
                  Header Subtitle / Message
                </label>
                <textarea
                  rows={3}
                  value={formData.heroSubtitle}
                  onChange={(e) => handleChange('heroSubtitle', e.target.value)}
                  className="w-full bg-black border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Phones & Emails */}
          <div className="bg-[#0f0f0f] border border-white/10 p-6 sm:p-8 rounded-3xl space-y-6">
            <h2 className="font-serif text-xl text-white font-medium flex items-center gap-2 border-b border-white/10 pb-4">
              <Phone className="w-5 h-5 text-[#C9A96E]" />
              <span>Phone Numbers & Emails</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-2">
                  Main Concierge Phone
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full bg-black border border-white/15 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-2">
                  WhatsApp Concierge Number
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.whatsapp}
                    onChange={(e) => handleChange('whatsapp', e.target.value)}
                    className="w-full bg-black border border-white/15 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-2">
                  Direct WhatsApp Chat Link
                </label>
                <input
                  type="text"
                  value={formData.whatsappLink}
                  onChange={(e) => handleChange('whatsappLink', e.target.value)}
                  placeholder="https://wa.me/18008924190"
                  className="w-full bg-black border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-2">
                  Main Support Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full bg-black border border-white/15 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-2">
                  Press & Media Enquiries Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#C9A96E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={formData.pressEmail}
                    onChange={(e) => handleChange('pressEmail', e.target.value)}
                    className="w-full bg-black border border-white/15 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Physical Location & Hours */}
          <div className="bg-[#0f0f0f] border border-white/10 p-6 sm:p-8 rounded-3xl space-y-6">
            <h2 className="font-serif text-xl text-white font-medium flex items-center gap-2 border-b border-white/10 pb-4">
              <MapPin className="w-5 h-5 text-[#C9A96E]" />
              <span>Flagship Location & Operating Hours</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-2">
                  Street Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="w-full bg-black border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-2">
                  City, State & Postal Code
                </label>
                <input
                  type="text"
                  value={formData.cityCountry}
                  onChange={(e) => handleChange('cityCountry', e.target.value)}
                  className="w-full bg-black border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-2">
                  Operating / Concierge Hours
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.operatingHours}
                    onChange={(e) => handleChange('operatingHours', e.target.value)}
                    className="w-full bg-black border border-white/15 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Social Media Links */}
          <div className="bg-[#0f0f0f] border border-white/10 p-6 sm:p-8 rounded-3xl space-y-6">
            <h2 className="font-serif text-xl text-white font-medium flex items-center gap-2 border-b border-white/10 pb-4">
              <Share2 className="w-5 h-5 text-[#C9A96E]" />
              <span>Social Media Handles & Links</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-2 flex items-center gap-2">
                  <IconInstagram className="w-4 h-4 text-pink-400" />
                  <span>Instagram Profile URL</span>
                </label>
                <input
                  type="url"
                  value={formData.socials.instagram}
                  onChange={(e) => handleSocialChange('instagram', e.target.value)}
                  className="w-full bg-black border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-2 flex items-center gap-2">
                  <IconFacebook className="w-4 h-4 text-blue-500" />
                  <span>Facebook Page URL</span>
                </label>
                <input
                  type="url"
                  value={formData.socials.facebook}
                  onChange={(e) => handleSocialChange('facebook', e.target.value)}
                  className="w-full bg-black border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-2 flex items-center gap-2">
                  <IconTwitterX className="w-4 h-4 text-sky-400" />
                  <span>X / Twitter URL</span>
                </label>
                <input
                  type="url"
                  value={formData.socials.twitter}
                  onChange={(e) => handleSocialChange('twitter', e.target.value)}
                  className="w-full bg-black border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-2 flex items-center gap-2">
                  <IconPinterest className="w-4 h-4 text-red-500" />
                  <span>Pinterest URL</span>
                </label>
                <input
                  type="url"
                  value={formData.socials.pinterest}
                  onChange={(e) => handleSocialChange('pinterest', e.target.value)}
                  className="w-full bg-black border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-2 flex items-center gap-2">
                  <IconYoutube className="w-4 h-4 text-red-600" />
                  <span>YouTube Channel URL</span>
                </label>
                <input
                  type="url"
                  value={formData.socials.youtube}
                  onChange={(e) => handleSocialChange('youtube', e.target.value)}
                  className="w-full bg-black border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-2 flex items-center gap-2">
                  <IconLinkedin className="w-4 h-4 text-blue-600" />
                  <span>LinkedIn Profile URL</span>
                </label>
                <input
                  type="url"
                  value={formData.socials.linkedin}
                  onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                  className="w-full bg-black border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </form>

        {/* Live Preview Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#0d0d0d] border border-[#C9A96E]/30 p-6 rounded-3xl space-y-6 sticky top-24">
            <div className="flex items-center gap-2 text-[#C9A96E] text-xs uppercase tracking-widest font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Live Storefront Preview</span>
            </div>

            <div className="space-y-4 border-t border-white/10 pt-4">
              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Title</p>
                <p className="font-serif text-lg text-white font-medium">{formData.heroTitle}</p>
              </div>

              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Phone & WhatsApp</p>
                <p className="text-xs text-white font-semibold">{formData.phone}</p>
                <p className="text-xs text-emerald-400 font-mono">WA: {formData.whatsapp}</p>
              </div>

              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Support Email</p>
                <p className="text-xs text-[#C9A96E] underline">{formData.email}</p>
              </div>

              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Location</p>
                <p className="text-xs text-white/80">{formData.address}</p>
                <p className="text-xs text-white/60">{formData.cityCountry}</p>
              </div>

              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Active Social Links</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {formData.socials.instagram && <span className="px-2 py-1 bg-pink-500/20 text-pink-300 text-[10px] rounded-lg">Instagram</span>}
                  {formData.whatsappLink && <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 text-[10px] rounded-lg">WhatsApp</span>}
                  {formData.socials.facebook && <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-[10px] rounded-lg">Facebook</span>}
                  {formData.socials.twitter && <span className="px-2 py-1 bg-sky-500/20 text-sky-300 text-[10px] rounded-lg">X (Twitter)</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
