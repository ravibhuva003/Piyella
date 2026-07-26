'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useArtworkStore, CustomArtworkRequest, ArtworkStatus } from '@/lib/store/artwork-store';
import { formatPrice } from '@/lib/utils';
import { Palette, DollarSign, Send, Eye, X, MessageSquare, Sparkles } from 'lucide-react';

export default function AdminCustomArtworksPage() {
  const { requests, updateArtworkQuote, updateArtworkStatus, isLoaded } = useArtworkStore();
  const [selectedReq, setSelectedReq] = useState<CustomArtworkRequest | null>(null);

  const [quotePrice, setQuotePrice] = useState<number>(250000);
  const [estimatedDays, setEstimatedDays] = useState<number>(35);
  const [status, setStatus] = useState<ArtworkStatus>('Quotation Sent');
  const [adminNotes, setAdminNotes] = useState('');

  if (!isLoaded) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-white">
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
    alert(`Quotation of ${formatPrice(quotePrice)} sent for Commission #${selectedReq.id}! Client notified via email & WhatsApp.`);
    setSelectedReq(null);
  };

  return (
    <div className="space-y-8 text-white">
      <div>
        <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-medium block mb-1">
          Master Atelier Guild
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-white font-medium">
          Custom Artwork Quotation Console
        </h1>
      </div>

      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-[10px] uppercase tracking-widest text-white/50 border-b border-white/10">
              <tr>
                <th className="px-6 py-4">Commission Ref</th>
                <th className="px-6 py-4">Patron Client</th>
                <th className="px-6 py-4">Medium & Frame</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Quote Price</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              {requests.map((r) => (
                <tr key={r.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-[#C9A96E] font-medium">{r.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{r.clientName}</div>
                    <div className="text-[11px] text-white/40 font-light">{r.clientEmail}</div>
                  </td>
                  <td className="px-6 py-4 text-xs">
                    <div className="text-white font-medium">{r.material}</div>
                    <div className="text-white/50 text-[11px] font-light">{r.frame} &bull; {r.size}</div>
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
                  <td className="px-6 py-4 font-medium text-white">
                    {r.quotePrice ? formatPrice(r.quotePrice) : <span className="text-xs text-white/30 italic">Pending Quote</span>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleOpenModal(r)}
                      className="px-4 py-2 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-lg transition-colors inline-flex items-center gap-1.5"
                    >
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>Issue Quote</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quote & Review Modal */}
      {selectedReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <form onSubmit={handleSendQuote} className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedReq(null)}
              className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 text-[#C9A96E]">
              <Palette size={20} />
              <h3 className="font-serif text-2xl text-white font-medium">Issue Atelier Quotation #{selectedReq.id}</h3>
            </div>

            {/* Client Brief Summary */}
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-white/50">Patron:</span>
                <span className="text-white font-medium">{selectedReq.clientName} ({selectedReq.clientEmail})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Material & Frame:</span>
                <span className="text-[#C9A96E] font-medium">{selectedReq.material} &bull; {selectedReq.frame}</span>
              </div>
              <div className="pt-2 border-t border-white/10">
                <span className="text-white/40 block mb-1">Artistic Vision Brief:</span>
                <p className="text-white/80 font-light italic leading-relaxed">&ldquo;{selectedReq.description}&rdquo;</p>
              </div>

              {selectedReq.images.length > 0 && (
                <div className="pt-2">
                  <span className="text-white/40 block mb-2">Reference Images ({selectedReq.images.length})</span>
                  <div className="flex gap-3">
                    {selectedReq.images.map((img, i) => (
                      <div key={i} className="relative w-20 h-16 rounded-lg overflow-hidden border border-white/10">
                        <Image src={img} alt="Ref" fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">Custom Price Quote (INR ₹) *</label>
                <input
                  type="number"
                  required
                  value={quotePrice}
                  onChange={(e) => setQuotePrice(Number(e.target.value))}
                  className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white font-mono focus:border-[#C9A96E] focus:outline-none rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">Estimated Crafting Days *</label>
                <input
                  type="number"
                  required
                  value={estimatedDays}
                  onChange={(e) => setEstimatedDays(Number(e.target.value))}
                  className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white font-mono focus:border-[#C9A96E] focus:outline-none rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">Status Pipeline</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ArtworkStatus)}
                className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white uppercase focus:border-[#C9A96E] focus:outline-none rounded-xl"
              >
                <option value="Submitted">Submitted</option>
                <option value="Under Atelier Review">Under Atelier Review</option>
                <option value="Quotation Sent">Quotation Sent</option>
                <option value="Artisan Crafting">Artisan Crafting</option>
                <option value="Completed">Completed</option>
                <option value="Shipped">Shipped</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">Master Artist Notes to Client</label>
              <textarea
                rows={3}
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Notes on artist assignment, gold leaf gilding techniques, or drying times..."
                className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl font-light"
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedReq(null)}
                className="px-6 py-3 border border-white/20 text-white/70 hover:text-white text-xs uppercase tracking-widest rounded-xl transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-8 py-3 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Transmit Official Quotation</span>
              </button>
            </div>

          </form>
        </div>
      )}
    </div>
  );
}
