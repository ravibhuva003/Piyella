'use client';

import React, { useState } from 'react';
import { Sparkles, Check } from 'lucide-react';

interface EmbroideryPersonalizerProps {
  onPersonalizationChange: (data: { monogram: string; threadColor: string; fontStyle: string }) => void;
}

const THREAD_COLORS = [
  { id: 'gold', name: '24K Signature Gold', hex: '#C9A96E' },
  { id: 'rose', name: 'Dusty Rose Silk', hex: '#D89B9E' },
  { id: 'sage', name: 'Botanical Sage', hex: '#8A9A86' },
  { id: 'terracotta', name: 'Terracotta Clay', hex: '#C86D51' },
  { id: 'ivory', name: 'Pure Ivory Thread', hex: '#FAF8F5' },
];

const FONT_STYLES = [
  { id: 'script', name: 'Florentine Calligraphy', class: 'font-serif italic' },
  { id: 'classic', name: 'Classic Monogram', class: 'font-serif font-bold uppercase' },
  { id: 'minimal', name: 'Modern Atelier', class: 'font-sans font-light tracking-widest uppercase' },
];

export function EmbroideryPersonalizer({ onPersonalizationChange }: EmbroideryPersonalizerProps) {
  const [enabled, setEnabled] = useState(false);
  const [monogram, setMonogram] = useState('E.V.');
  const [selectedColor, setSelectedColor] = useState(THREAD_COLORS[0].id);
  const [selectedFont, setSelectedFont] = useState(FONT_STYLES[0].id);

  const colorObj = THREAD_COLORS.find((c) => c.id === selectedColor) || THREAD_COLORS[0];
  const fontObj = FONT_STYLES.find((f) => f.id === selectedFont) || FONT_STYLES[0];

  const handleToggle = (checked: boolean) => {
    setEnabled(checked);
    if (checked) {
      onPersonalizationChange({ monogram, threadColor: colorObj.name, fontStyle: fontObj.name });
    }
  };

  const handleMonogramChange = (val: string) => {
    setMonogram(val);
    if (enabled) {
      onPersonalizationChange({ monogram: val, threadColor: colorObj.name, fontStyle: fontObj.name });
    }
  };

  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 space-y-6 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#C9A96E]/10 border border-[#C9A96E]/30 rounded-xl text-[#C9A96E]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg text-white font-medium">Bespoke Embroidery Monogram</h3>
            <p className="text-xs text-white/50 font-light">Hand-stitched initial customization (+Complimentary)</p>
          </div>
        </div>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => handleToggle(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C9A96E]" />
        </label>
      </div>

      {enabled && (
        <div className="space-y-6 pt-4 border-t border-white/10">
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#C9A96E] mb-2 font-medium">
              1. Enter Monogram Initials (Max 4 letters)
            </label>
            <input
              type="text"
              maxLength={4}
              value={monogram}
              onChange={(e) => handleMonogramChange(e.target.value.toUpperCase())}
              placeholder="e.g. E.V."
              className="w-full bg-black/60 border border-white/10 px-4 py-3 text-lg font-serif font-bold text-center tracking-widest text-[#C9A96E] focus:border-[#C9A96E] focus:outline-none rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-[#C9A96E] mb-2 font-medium">
              2. Select Thread Color
            </label>
            <div className="flex gap-3">
              {THREAD_COLORS.map((col) => {
                const isSel = selectedColor === col.id;
                return (
                  <button
                    key={col.id}
                    type="button"
                    onClick={() => {
                      setSelectedColor(col.id);
                      onPersonalizationChange({ monogram, threadColor: col.name, fontStyle: fontObj.name });
                    }}
                    className={`group relative w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                      isSel ? 'border-[#C9A96E] scale-110' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: col.hex }}
                    title={col.name}
                  >
                    {isSel && <Check className="w-4 h-4 text-black font-bold" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Preview Box */}
          <div className="p-4 bg-black border border-[#C9A96E]/30 rounded-xl text-center space-y-1">
            <span className="text-[9px] uppercase tracking-widest text-white/40 block">Hand-Stitched Monogram Preview</span>
            <span className={`text-2xl block text-[#C9A96E] ${fontObj.class}`}>
              {monogram || 'E.V.'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
