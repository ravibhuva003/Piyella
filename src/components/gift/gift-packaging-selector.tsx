'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Gift, Check, Sparkles } from 'lucide-react';
import { GIFT_BOX_STYLES, GIFT_CARD_TEMPLATES, GiftPackagingData } from '@/lib/data/gift-options';
import { LiveCardPreview } from '@/components/gift/live-card-preview';
import { formatPrice } from '@/lib/utils';

interface GiftPackagingSelectorProps {
  value: GiftPackagingData;
  onChange: (value: GiftPackagingData) => void;
}

export function GiftPackagingSelector({ value, onChange }: GiftPackagingSelectorProps) {
  const [enabled, setEnabled] = useState(value.enabled || false);
  const [selectedBoxId, setSelectedBoxId] = useState(value.boxStyleId || GIFT_BOX_STYLES[0].id);
  const [selectedTemplateId, setSelectedTemplateId] = useState(value.templateId || GIFT_CARD_TEMPLATES[0].id);
  const [recipientName, setRecipientName] = useState(value.recipientName || '');
  const [senderName, setSenderName] = useState(value.senderName || '');
  const [message, setMessage] = useState(value.message || '');

  const selectedBox = GIFT_BOX_STYLES.find((b) => b.id === selectedBoxId) || GIFT_BOX_STYLES[0];

  const handleToggle = (checked: boolean) => {
    setEnabled(checked);
    updateParent(checked, selectedBox, selectedTemplateId, recipientName, senderName, message);
  };

  const handleBoxSelect = (boxId: string) => {
    setSelectedBoxId(boxId);
    const box = GIFT_BOX_STYLES.find((b) => b.id === boxId) || GIFT_BOX_STYLES[0];
    updateParent(enabled, box, selectedTemplateId, recipientName, senderName, message);
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplateId(templateId);
    updateParent(enabled, selectedBox, templateId, recipientName, senderName, message);
  };

  const updateParent = (
    isEnable: boolean,
    box: typeof selectedBox,
    tempId: string,
    rec: string,
    snd: string,
    msg: string
  ) => {
    onChange({
      enabled: isEnable,
      boxStyleId: box.id,
      boxStyleName: box.name,
      boxPrice: box.price,
      templateId: tempId,
      recipientName: rec,
      senderName: snd,
      message: msg,
    });
  };

  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 text-white">
      {/* Enable Checkbox Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#C9A96E]/10 border border-[#C9A96E]/30 rounded-xl text-[#C9A96E]">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-xl text-white font-medium">Bespoke Gift Packaging & Card</h3>
            <p className="text-xs text-white/50 font-light">Add a luxury velvet box & gold-embossed greeting card</p>
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
        <div className="space-y-8 pt-4 border-t border-white/10">
          
          {/* Step 1: Select Box Style */}
          <div className="space-y-4">
            <label className="block text-xs uppercase tracking-widest text-[#C9A96E] font-medium">
              1. Choose Gift Box Style
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {GIFT_BOX_STYLES.map((box) => {
                const isSelected = selectedBoxId === box.id;
                return (
                  <div
                    key={box.id}
                    onClick={() => handleBoxSelect(box.id)}
                    className={`group relative rounded-xl border-2 overflow-hidden cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#C9A96E] bg-[#C9A96E]/10 shadow-lg shadow-[#C9A96E]/20'
                        : 'border-white/10 bg-black/40 hover:border-white/30'
                    }`}
                  >
                    <div className="relative aspect-[4/3] w-full bg-white/5">
                      <Image src={box.image} alt={box.name} fill className="object-cover" />
                      {box.badge && (
                        <span className="absolute top-2 left-2 text-[9px] uppercase tracking-widest bg-black/80 text-[#C9A96E] px-2 py-0.5 rounded font-bold border border-[#C9A96E]/30">
                          {box.badge}
                        </span>
                      )}
                      {isSelected && (
                        <div className="absolute top-2 right-2 p-1 rounded-full bg-[#C9A96E] text-black">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    <div className="p-4 space-y-1">
                      <div className="flex justify-between items-center">
                        <h4 className="font-serif text-sm text-white font-medium">{box.name}</h4>
                        <span className="font-mono text-xs text-[#C9A96E] font-bold">+{formatPrice(box.price)}</span>
                      </div>
                      <p className="text-[11px] text-white/50 font-light line-clamp-2">{box.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Select Card Template */}
          <div className="space-y-4">
            <label className="block text-xs uppercase tracking-widest text-[#C9A96E] font-medium">
              2. Select Greeting Card Template
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {GIFT_CARD_TEMPLATES.map((temp) => {
                const isSelected = selectedTemplateId === temp.id;
                return (
                  <button
                    key={temp.id}
                    type="button"
                    onClick={() => handleTemplateSelect(temp.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#C9A96E] bg-[#C9A96E]/20 text-white'
                        : 'border-white/10 bg-white/5 text-white/60 hover:text-white'
                    }`}
                  >
                    <span className="font-serif text-xs font-medium block truncate">{temp.name}</span>
                    <span className="text-[10px] text-white/40 block font-light truncate">{temp.subtitle}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Card Message Inputs & Live Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
            <div className="space-y-4">
              <label className="block text-xs uppercase tracking-widest text-[#C9A96E] font-medium">
                3. Personalize Greeting Card
              </label>

              <div>
                <label className="block text-xs uppercase tracking-widest text-white/70 mb-1 font-medium">Recipient Name</label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => {
                    setRecipientName(e.target.value);
                    updateParent(enabled, selectedBox, selectedTemplateId, e.target.value, senderName, message);
                  }}
                  placeholder="e.g. Lady Evelyn Vance"
                  className="w-full bg-black/60 border border-white/10 px-4 py-2.5 text-xs text-white focus:border-[#C9A96E] focus:outline-none rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-white/70 mb-1 font-medium">Custom Message</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    updateParent(enabled, selectedBox, selectedTemplateId, recipientName, senderName, e.target.value);
                  }}
                  placeholder="Type your heartfelt luxury greeting..."
                  className="w-full bg-black/60 border border-white/10 px-4 py-2.5 text-xs text-white focus:border-[#C9A96E] focus:outline-none rounded-xl font-light"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-white/70 mb-1 font-medium">Sender Signature</label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => {
                    setSenderName(e.target.value);
                    updateParent(enabled, selectedBox, selectedTemplateId, recipientName, e.target.value, message);
                  }}
                  placeholder="e.g. Lord Henry Cavendish"
                  className="w-full bg-black/60 border border-white/10 px-4 py-2.5 text-xs text-white focus:border-[#C9A96E] focus:outline-none rounded-xl"
                />
              </div>
            </div>

            {/* Live Preview */}
            <LiveCardPreview
              templateId={selectedTemplateId}
              recipientName={recipientName}
              senderName={senderName}
              message={message}
            />
          </div>

        </div>
      )}
    </div>
  );
}
