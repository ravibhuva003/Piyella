'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useArtworkStore, CustomArtworkRequest, ArtworkStatus } from '@/lib/store/artwork-store';
import { formatPrice } from '@/lib/utils';
import { Palette, DollarSign, Send, Eye, X, MessageSquare, Sparkles, Edit3, Check } from 'lucide-react';

export default function AdminCustomArtworksPage() {
  const { requests, updateArtworkQuote, updateArtworkStatus, isLoaded } = useArtworkStore();
  const [selectedReq, setSelectedReq] = useState<CustomArtworkRequest | null>(null);

  const [quotePrice, setQuotePrice] = useState<number>(250000);
  const [estimatedDays, setEstimatedDays] = useState<number>(35);
  const [status, setStatus] = useState<ArtworkStatus>('Quotation Sent');
  const [adminNotes, setAdminNotes] = useState('');

  if (!isLoaded) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-foreground">
        <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleOpenModal = (req: CustomArtworkRequest) => {
    setSelectedReq(req);
    setQuotePrice(req.quotePrice || 250000);
    setEstimatedDays(req.estimatedDays || 35);
    setStatus(req.status || 'Quotation Sent');
    setAdminNotes(req.adminNotes || '');
  };

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReq) return;

    updateArtworkQuote(selectedReq.id, quotePrice, estimatedDays, status, adminNotes);
    alert(`Quotation of ${formatPrice(quotePrice)} updated for Commission #${selectedReq.id}! Client notified.`);
    setSelectedReq(null);
  };

  return (
    <div className="space-y-8 text-foreground">
      <div>
        <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-medium block mb-1">
          Master Atelier Guild
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-foreground font-medium">
          Custom Artwork Quotation Console ({requests.length} Requests)
        </h1>
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-background text-[10px] uppercase tracking-widest text-foreground-muted border-b border-border">
              <tr>
                <th className="px-6 py-4">Commission Ref</th>
                <th className="px-6 py-4">Patron Client</th>
                <th className="px-6 py-4">Medium & Frame</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Quote Price</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-foreground">
              {requests.map((r) => (
                <tr key={r.id} className="hover:bg-background/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-[#C9A96E] font-medium">{r.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-foreground">{r.clientName}</div>
                    <div className="text-[11px] text-foreground-muted font-light">{r.clientEmail}</div>
                  </td>
                  <td className="px-6 py-4 text-xs">
                    <div className="text-foreground font-medium">{r.material}</div>
                    <div className="text-foreground-muted text-[11px] font-light">{r.frame} &bull; {r.size}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded-full ${
                      r.status === 'Artisan Crafting' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                      r.status === 'Quotation Sent' ? 'bg-[#C9A96E]/20 text-[#C9A96E] border border-[#C9A96E]/30' :
                      'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-foreground">
                    {r.quotePrice ? formatPrice(r.quotePrice) : <span className="text-xs text-foreground-muted italic">Pending Quote</span>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenModal(r)}
                        className="px-3 py-1.5 bg-[#C9A96E]/10 hover:bg-[#C9A96E]/20 text-[#C9A96E] border border-[#C9A96E]/30 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Quote</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Issue / Edit Quote Modal */}
      {selectedReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-surface border border-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <button
              onClick={() => setSelectedReq(null)}
              className="absolute top-4 right-4 text-foreground-muted hover:text-foreground p-2"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[#C9A96E] text-[10px] uppercase tracking-widest font-semibold block">Edit Custom Commission Quote</span>
              <h2 className="font-serif text-2xl text-foreground font-medium">Quote & Master Notes ({selectedReq.id})</h2>
            </div>

            {/* Brief Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-background border border-border rounded-xl text-xs">
              <div>
                <span className="text-foreground-muted text-[10px] uppercase block font-semibold">Patron Client</span>
                <span className="font-medium text-foreground">{selectedReq.clientName}</span>
              </div>
              <div>
                <span className="text-foreground-muted text-[10px] uppercase block font-semibold">Requested Medium</span>
                <span className="font-medium text-foreground">{selectedReq.material}</span>
              </div>
              <div>
                <span className="text-foreground-muted text-[10px] uppercase block font-semibold">Dimensions</span>
                <span className="font-medium text-[#C9A96E]">{selectedReq.size}</span>
              </div>
            </div>

            <form onSubmit={handleSendQuote} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-1 font-medium">Bespoke Quote (₹) *</label>
                  <input
                    type="number"
                    required
                    value={quotePrice}
                    onChange={(e) => setQuotePrice(Number(e.target.value))}
                    className="w-full bg-background border border-border px-4 py-2.5 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-1 font-medium">Estimated Days *</label>
                  <input
                    type="number"
                    required
                    value={estimatedDays}
                    onChange={(e) => setEstimatedDays(Number(e.target.value))}
                    className="w-full bg-background border border-border px-4 py-2.5 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-1 font-medium">Commission Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ArtworkStatus)}
                  className="w-full bg-background border border-border px-4 py-2.5 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl uppercase"
                >
                  <option value="In Inquiry">In Inquiry</option>
                  <option value="Quotation Sent">Quotation Sent</option>
                  <option value="Patron Approved">Patron Approved</option>
                  <option value="Artisan Crafting">Artisan Crafting</option>
                  <option value="Delivered & Framed">Delivered & Framed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-1 font-medium">Master Artisan Notes</label>
                <textarea
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Notes on Mulberry silk thread selection, gold leaf framing, or delivery timeline..."
                  className="w-full bg-background border border-border px-4 py-2.5 text-xs text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl font-light"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedReq(null)}
                  className="px-5 py-2.5 border border-border text-foreground text-xs uppercase tracking-wider rounded-xl hover:bg-background"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Quote</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
