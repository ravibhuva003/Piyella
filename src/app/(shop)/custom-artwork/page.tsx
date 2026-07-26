'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, Palette, Check, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { ARTWORK_MATERIALS, ARTWORK_FRAMES, ARTWORK_SIZES, ARTWORK_BUDGETS } from '@/lib/data/artwork-options';
import { ReferenceUploader } from '@/components/artwork/reference-uploader';
import { useArtworkStore } from '@/lib/store/artwork-store';

export default function CustomArtworkPage() {
  const router = useRouter();
  const { addArtworkRequest } = useArtworkStore();

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  const [selectedMaterial, setSelectedMaterial] = useState(ARTWORK_MATERIALS[0].id);
  const [selectedFrame, setSelectedFrame] = useState(ARTWORK_FRAMES[0].id);
  const [selectedSize, setSelectedSize] = useState(ARTWORK_SIZES[1].id);
  const [selectedBudget, setSelectedBudget] = useState(ARTWORK_BUDGETS[1].id);

  const [deliveryDate, setDeliveryDate] = useState('2026-09-30');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop',
  ]);

  const [submitting, setSubmitting] = useState(false);

  const matObj = ARTWORK_MATERIALS.find((m) => m.id === selectedMaterial) || ARTWORK_MATERIALS[0];
  const frameObj = ARTWORK_FRAMES.find((f) => f.id === selectedFrame) || ARTWORK_FRAMES[0];
  const sizeObj = ARTWORK_SIZES.find((s) => s.id === selectedSize) || ARTWORK_SIZES[1];
  const budgetObj = ARTWORK_BUDGETS.find((b) => b.id === selectedBudget) || ARTWORK_BUDGETS[1];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !description) {
      alert('Please fill in your name, email, and artistic vision description.');
      return;
    }

    setSubmitting(true);

    const newReq = addArtworkRequest({
      clientName,
      clientEmail,
      clientPhone: clientPhone || '+91 98765 43210',
      material: matObj.name,
      frame: frameObj.name,
      size: `${sizeObj.name} (${sizeObj.dimensions})`,
      budget: budgetObj.range,
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
        {/* Header Hero */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/30 text-[#C9A96E] text-xs font-semibold uppercase tracking-widest">
            <Palette className="w-4 h-4" />
            <span>Master Atelier Commission</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-white font-medium">
            Commission Custom Artwork
          </h1>
          <p className="text-white/70 font-light text-base leading-relaxed">
            Collaborate directly with renowned Italian and Florentine master artists to create a bespoke museum-grade masterpiece for your private estate or penthouse.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-12">
          
          {/* STEP 1: Client Information */}
          <div className="bg-[#0a0a0a] border border-white/10 p-6 sm:p-8 rounded-2xl space-y-6">
            <h2 className="font-serif text-2xl text-white">1. Client Patron Information</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">Patron Name *</label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Lord Henry Cavendish"
                  className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">Email Address *</label>
                <input
                  type="email"
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="patron@piyella.com"
                  className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">Phone / WhatsApp</label>
                <input
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* STEP 2: Material & Medium Selector */}
          <div className="bg-[#0a0a0a] border border-white/10 p-6 sm:p-8 rounded-2xl space-y-6">
            <h2 className="font-serif text-2xl text-white">2. Select Artistic Medium & Material</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ARTWORK_MATERIALS.map((mat) => {
                const isSelected = selectedMaterial === mat.id;
                return (
                  <div
                    key={mat.id}
                    onClick={() => setSelectedMaterial(mat.id)}
                    className={`group relative rounded-xl border-2 overflow-hidden cursor-pointer transition-all ${
                      isSelected ? 'border-[#C9A96E] bg-[#C9A96E]/10 shadow-lg shadow-[#C9A96E]/20' : 'border-white/10 bg-black/40 hover:border-white/30'
                    }`}
                  >
                    <div className="relative aspect-[4/3] w-full bg-white/5">
                      <Image src={mat.image} alt={mat.name} fill className="object-cover" />
                      {isSelected && (
                        <div className="absolute top-2 right-2 p-1.5 rounded-full bg-[#C9A96E] text-black">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    <div className="p-4 space-y-1">
                      <h4 className="font-serif text-sm text-white font-medium">{mat.name}</h4>
                      <p className="text-[11px] text-white/50 font-light line-clamp-2">{mat.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 3: Framing & Scale Options */}
          <div className="bg-[#0a0a0a] border border-white/10 p-6 sm:p-8 rounded-2xl space-y-6">
            <h2 className="font-serif text-2xl text-white">3. Frame & Scale Options</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Frame Choice */}
              <div className="space-y-4">
                <label className="block text-xs uppercase tracking-widest text-[#C9A96E] font-medium">Select Gilded Frame Style</label>
                <div className="grid grid-cols-2 gap-3">
                  {ARTWORK_FRAMES.map((f) => {
                    const isSel = selectedFrame === f.id;
                    return (
                      <div
                        key={f.id}
                        onClick={() => setSelectedFrame(f.id)}
                        className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                          isSel ? 'border-[#C9A96E] bg-[#C9A96E]/10' : 'border-white/10 bg-black/40 hover:border-white/30'
                        }`}
                      >
                        <h5 className="font-serif text-xs font-medium text-white">{f.name}</h5>
                        <p className="text-[10px] text-white/40 font-light truncate">{f.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Size Choice */}
              <div className="space-y-4">
                <label className="block text-xs uppercase tracking-widest text-[#C9A96E] font-medium">Select Canvas Dimensions</label>
                <div className="grid grid-cols-2 gap-3">
                  {ARTWORK_SIZES.map((s) => {
                    const isSel = selectedSize === s.id;
                    return (
                      <div
                        key={s.id}
                        onClick={() => setSelectedSize(s.id)}
                        className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                          isSel ? 'border-[#C9A96E] bg-[#C9A96E]/10' : 'border-white/10 bg-black/40 hover:border-white/30'
                        }`}
                      >
                        <h5 className="font-serif text-xs font-medium text-white">{s.name}</h5>
                        <span className="font-mono text-[10px] text-[#C9A96E] block font-bold">{s.dimensions}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* STEP 4: Budget & Target Delivery */}
          <div className="bg-[#0a0a0a] border border-white/10 p-6 sm:p-8 rounded-2xl space-y-6">
            <h2 className="font-serif text-2xl text-white">4. Commission Budget & Target Date</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">Target Budget Tier</label>
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl"
                >
                  {ARTWORK_BUDGETS.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.label} ({b.range})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">Desired Completion Date</label>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* STEP 5: Artistic Vision Brief & References */}
          <div className="bg-[#0a0a0a] border border-white/10 p-6 sm:p-8 rounded-2xl space-y-6">
            <h2 className="font-serif text-2xl text-white">5. Artistic Brief & Reference Photos</h2>

            <div>
              <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">Artistic Concept & Vision Description *</label>
              <textarea
                rows={5}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe subject matter, color palette preferences, emotional mood, lighting inspiration, or historical references..."
                className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl font-light"
              />
            </div>

            <ReferenceUploader images={images} onChange={setImages} />
          </div>

          {/* Submit CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
            <div className="flex items-center gap-2 text-xs text-white/50">
              <ShieldCheck className="w-4 h-4 text-[#C9A96E]" />
              <span>Includes Official Certificate of Authenticity & Master Artist Signature</span>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="px-10 py-4 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20 flex items-center gap-2 disabled:opacity-50"
            >
              {submitting ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Submit Commission Request</span>
                </>
              )}
            </button>
          </div>

        </form>
      </Container>
    </main>
  );
}
