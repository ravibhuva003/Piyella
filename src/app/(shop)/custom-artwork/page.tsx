'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Palette, Sparkles, Send, ShieldCheck, User, Mail, Phone, Calendar, Image as ImageIcon } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { ReferenceUploader } from '@/components/artwork/reference-uploader';
import { useArtworkStore } from '@/lib/store/artwork-store';

export default function CustomArtworkPage() {
  const router = useRouter();
  const { addArtworkRequest } = useArtworkStore();

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('2026-09-30');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop',
  ]);

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !description) {
      alert('Please fill in your name, email, and artistic description.');
      return;
    }

    setSubmitting(true);

    const newReq = addArtworkRequest({
      clientName,
      clientEmail,
      clientPhone: clientPhone || '+91 98765 43210',
      material: 'Bespoke Needlework & Silk',
      frame: 'Custom Gilded Frame',
      size: 'Custom Dimensions',
      budget: 'Bespoke Quote',
      deliveryDate,
      description,
      images,
    });

    setTimeout(() => {
      setSubmitting(false);
      alert(`Commission #${newReq.id} submitted! Our Master Guild Curator will review your specifications within 24 hours.`);
      router.push('/account/custom-artworks');
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-24 selection:bg-[#C9A96E] selection:text-black">
      <Container>
        {/* Hero Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/30 text-[#C9A96E] text-xs font-semibold uppercase tracking-widest">
            <Palette className="w-4 h-4" />
            <span>Bespoke Atelier Commission</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-white font-medium">
            Commission Custom Artwork
          </h1>
          <p className="text-white/70 font-light text-base leading-relaxed">
            Collaborate directly with our master embroiderers to create a one-of-a-kind bespoke creation for your private estate.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-10">
          
          {/* SECTION 1: Client Information */}
          <div className="bg-[#0a0a0a] border border-white/10 p-6 sm:p-10 rounded-3xl space-y-6">
            <div className="flex items-center gap-2 text-[#C9A96E] text-xs uppercase tracking-widest font-semibold border-b border-white/10 pb-4">
              <User className="w-4 h-4" />
              <span>1. Client Information</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 mb-2 font-medium">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Lady Evelyn Vance"
                    className="w-full bg-black border border-white/15 pl-10 pr-4 py-3.5 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 mb-2 font-medium">Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="evelyn@domain.com"
                    className="w-full bg-black border border-white/15 pl-10 pr-4 py-3.5 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 mb-2 font-medium">Phone / WhatsApp Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-black border border-white/15 pl-10 pr-4 py-3.5 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl font-mono text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 mb-2 font-medium">Preferred Target Date</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full bg-black border border-white/15 pl-10 pr-4 py-3.5 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: Artistic Description */}
          <div className="bg-[#0a0a0a] border border-white/10 p-6 sm:p-10 rounded-3xl space-y-6">
            <div className="flex items-center gap-2 text-[#C9A96E] text-xs uppercase tracking-widest font-semibold border-b border-white/10 pb-4">
              <Palette className="w-4 h-4" />
              <span>2. Artistic Description</span>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-white/70 mb-2 font-medium">Artistic Concept & Motif Details *</label>
              <textarea
                rows={6}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your desired artwork concept, embroidery style, botanical motifs, color palette, dimensions, or specific heraldic monograms..."
                className="w-full bg-black border border-white/15 px-4 py-3.5 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl font-light leading-relaxed"
              />
            </div>
          </div>

          {/* SECTION 3: Reference Photo Upload Section */}
          <div className="bg-[#0a0a0a] border border-white/10 p-6 sm:p-10 rounded-3xl space-y-6">
            <div className="flex items-center gap-2 text-[#C9A96E] text-xs uppercase tracking-widest font-semibold border-b border-white/10 pb-4">
              <ImageIcon className="w-4 h-4" />
              <span>3. Reference Photo Upload Section</span>
            </div>

            <p className="text-xs text-white/60 font-light">
              Upload reference photos, sketch ideas, mood board images, or inspiration patterns for your custom artwork.
            </p>

            <ReferenceUploader images={images} onChange={setImages} />
          </div>

          {/* SECTION 4: Submit Button */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-xs text-white/50">
              <ShieldCheck className="w-4 h-4 text-[#C9A96E]" />
              <span>Includes Certificate of Authenticity & Master Artist Sign-off</span>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto px-10 py-4 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {submitting ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Custom Artwork Request</span>
                </>
              )}
            </button>
          </div>

        </form>
      </Container>
    </main>
  );
}
