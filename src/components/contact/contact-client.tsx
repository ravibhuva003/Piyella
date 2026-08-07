'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Share2
} from 'lucide-react';
import { 
  IconInstagram, 
  IconTwitterX, 
  IconFacebook, 
  IconPinterest, 
  IconLinkedin, 
  IconYoutube 
} from '@/components/shared/social-icons';
import { Container } from '@/components/layout/container';
import { useContactStore } from '@/lib/store/contact-store';

export function ContactClient() {
  const { settings } = useContactStore();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: '', email: '', subject: 'General Inquiry', message: '' });
    }, 1000);
  };

  return (
    <div className="pt-28 pb-24 text-foreground selection:bg-[#C9A96E] selection:text-black">
      <Container>
        {/* 1. Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/30 text-[#C9A96E] text-xs font-semibold uppercase tracking-widest"
          >
            <Sparkles className="w-4 h-4" />
            <span>Concierge & Advisory</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl sm:text-6xl font-light text-foreground leading-tight"
          >
            {settings.heroTitle || 'Get in Touch with Concierge'}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-foreground-muted font-light text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            {settings.heroSubtitle}
          </motion.p>
        </div>

        {/* 2. Dynamic 4-Card Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          
          {/* Card 1: Telephone & WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-surface border border-border p-6 sm:p-8 rounded-3xl space-y-4 hover:border-[#C9A96E]/50 transition-all duration-300 flex flex-col justify-between group shadow-sm"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#C9A96E]/10 border border-[#C9A96E]/30 flex items-center justify-center text-[#C9A96E] group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-foreground font-medium">Telephone & WhatsApp</h3>
              <div className="space-y-2 text-xs text-foreground-muted font-light">
                <p>Direct Concierge Line:</p>
                <a href={`tel:${settings.phone}`} className="text-foreground font-semibold text-sm hover:text-[#C9A96E] transition-colors block">
                  {settings.phone}
                </a>
                <p className="pt-1">WhatsApp Concierge:</p>
                <a href={settings.whatsappLink || `https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-emerald-500 font-mono hover:underline inline-flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{settings.whatsapp}</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Email Enquiries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-surface border border-border p-6 sm:p-8 rounded-3xl space-y-4 hover:border-[#C9A96E]/50 transition-all duration-300 flex flex-col justify-between group shadow-sm"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#C9A96E]/10 border border-[#C9A96E]/30 flex items-center justify-center text-[#C9A96E] group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-foreground font-medium">Email Advisory</h3>
              <div className="space-y-3 text-xs text-foreground-muted font-light">
                <div>
                  <span className="text-foreground-muted/60 block text-[10px] uppercase font-mono">Client Care:</span>
                  <a href={`mailto:${settings.email}`} className="text-[#C9A96E] font-medium text-sm hover:underline">
                    {settings.email}
                  </a>
                </div>
                <div>
                  <span className="text-foreground-muted/60 block text-[10px] uppercase font-mono">Press & PR:</span>
                  <a href={`mailto:${settings.pressEmail}`} className="text-foreground hover:text-[#C9A96E] transition-colors">
                    {settings.pressEmail}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Flagship Atelier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-surface border border-border p-6 sm:p-8 rounded-3xl space-y-4 hover:border-[#C9A96E]/50 transition-all duration-300 flex flex-col justify-between group shadow-sm"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#C9A96E]/10 border border-[#C9A96E]/30 flex items-center justify-center text-[#C9A96E] group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-foreground font-medium">Flagship Store</h3>
              <div className="space-y-2 text-xs text-foreground-muted font-light">
                <p className="text-foreground font-medium">{settings.address}</p>
                <p>{settings.cityCountry}</p>
                <div className="pt-2 flex items-center gap-1.5 text-foreground-muted text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-[#C9A96E]" />
                  <span>{settings.operatingHours}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Official Social Channels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-surface border border-border p-6 sm:p-8 rounded-3xl space-y-4 hover:border-[#C9A96E]/50 transition-all duration-300 flex flex-col justify-between group shadow-sm"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#C9A96E]/10 border border-[#C9A96E]/30 flex items-center justify-center text-[#C9A96E] group-hover:scale-110 transition-transform">
                <Share2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-foreground font-medium">Social Channels</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {settings.socials.instagram && (
                  <a href={settings.socials.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-background border border-border hover:border-pink-500/50 hover:text-pink-500 transition-colors flex items-center gap-2">
                    <IconInstagram className="w-3.5 h-3.5" />
                    <span>Instagram</span>
                  </a>
                )}
                {settings.socials.facebook && (
                  <a href={settings.socials.facebook} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-background border border-border hover:border-blue-500/50 hover:text-blue-500 transition-colors flex items-center gap-2">
                    <IconFacebook className="w-3.5 h-3.5" />
                    <span>Facebook</span>
                  </a>
                )}
                {settings.socials.twitter && (
                  <a href={settings.socials.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-background border border-border hover:border-sky-500/50 hover:text-sky-500 transition-colors flex items-center gap-2">
                    <IconTwitterX className="w-3.5 h-3.5" />
                    <span>X (Twitter)</span>
                  </a>
                )}
                {settings.socials.linkedin && (
                  <a href={settings.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-background border border-border hover:border-blue-600/50 hover:text-blue-600 transition-colors flex items-center gap-2">
                    <IconLinkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>

        </div>

        {/* 3. Interactive Contact Form & Location Map Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          
          {/* Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 bg-surface border border-border p-8 sm:p-12 rounded-3xl space-y-6 shadow-sm"
          >
            <div className="space-y-2">
              <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-semibold block">
                Send an Enquiry
              </span>
              <h2 className="font-heading text-3xl font-light text-foreground">
                Bespoke Client Inquiry
              </h2>
              <p className="text-xs text-foreground-muted font-light">
                Fill out the form below and our Concierge team will respond within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="font-serif text-xl text-foreground font-medium">Enquiry Received</h3>
                <p className="text-xs text-foreground-muted leading-relaxed">
                  Thank you for reaching out to Piyella. A client advisor has been assigned to your message and will contact you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-background border border-border hover:bg-muted text-foreground rounded-xl text-xs uppercase tracking-wider"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-foreground-muted font-semibold mb-2">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Lady Evelyn Vance"
                      className="w-full bg-background border border-border rounded-xl px-4 py-3.5 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-foreground-muted font-semibold mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="evelyn@domain.com"
                      className="w-full bg-background border border-border rounded-xl px-4 py-3.5 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-foreground-muted font-semibold mb-2">
                    Inquiry Topic
                  </label>
                  <select
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3.5 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Custom Order">Custom Artwork / Bespoke Order</option>
                    <option value="VIP Appointment">Private Appointment Request</option>
                    <option value="Press">Press & Media Relations</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-foreground-muted font-semibold mb-2">
                    Your Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="How may our concierge assist you today?"
                    className="w-full bg-background border border-border rounded-xl px-4 py-3.5 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none resize-none font-light"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20 flex items-center justify-center gap-2"
                >
                  <span>{isSubmitting ? 'Transmitting Message...' : 'Submit Inquiry'}</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>

          {/* Location & Map Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 bg-surface border border-border p-8 sm:p-12 rounded-3xl space-y-6 flex flex-col justify-between h-full shadow-sm"
          >
            <div className="space-y-4">
              <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-semibold block">
                Visit Our Flagship Store
              </span>
              <h2 className="font-heading text-3xl font-light text-foreground">
                Flagship Sanctuary
              </h2>
              <p className="text-xs text-foreground-muted font-light leading-relaxed">
                Experience our curated embroidery collection in person. Private consultations available by appointment.
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="p-4 bg-background border border-border rounded-2xl space-y-1">
                  <span className="text-foreground-muted/60 block text-[10px] uppercase font-mono">Address</span>
                  <span className="text-foreground font-medium block">{settings.address}</span>
                  <span className="text-foreground-muted block">{settings.cityCountry}</span>
                </div>

                <div className="p-4 bg-background border border-border rounded-2xl space-y-1">
                  <span className="text-foreground-muted/60 block text-[10px] uppercase font-mono">Concierge Hours</span>
                  <span className="text-foreground font-medium block">{settings.operatingHours}</span>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-border relative bg-muted mt-4">
              <iframe
                title="Piyella Atelier Location"
                src={settings.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

        </div>
      </Container>
    </div>
  );
}
