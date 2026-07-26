'use client';

import React, { use } from 'react';
import { Printer, ShieldCheck, Download } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface InvoicePageProps {
  params: Promise<{
    orderId: string;
  }>;
  searchParams: Promise<{
    name?: string;
    email?: string;
    total?: string;
  }>;
}

export default function InvoicePage({ params, searchParams }: InvoicePageProps) {
  const { orderId } = use(params);
  const { name, email, total } = use(searchParams);

  const grandTotal = total ? Number(total) : 280000;
  const taxAmount = grandTotal * (0.18 / 1.18);
  const subtotalAmount = grandTotal - taxAmount;
  const clientName = name || 'Lord Henry Cavendish';
  const clientEmail = email || 'client@piyella.com';
  const issueDate = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <main className="min-h-screen bg-neutral-900 text-neutral-900 p-4 sm:p-10 flex flex-col items-center selection:bg-[#C9A96E]">
      
      {/* Action Bar (Hidden when printing) */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-8 print:hidden text-white">
        <div>
          <h1 className="font-serif text-2xl text-white">Official Tax Invoice</h1>
          <p className="text-xs text-white/50">Print or save as PDF for record keeping</p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-6 py-3 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20 flex items-center gap-2"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save PDF</span>
        </button>
      </div>

      {/* Invoice Document */}
      <div className="w-full max-w-4xl bg-white p-8 sm:p-14 shadow-2xl rounded-2xl border border-neutral-200 print:shadow-none print:border-none print:p-0">
        
        {/* Invoice Header */}
        <div className="flex justify-between items-start pb-8 border-b-2 border-neutral-900">
          <div>
            <span className="font-serif tracking-[0.3em] uppercase text-3xl font-bold text-neutral-900 block mb-1">
              PIYELLA
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-semibold block">
              Bespoke Luxury Atelier
            </span>
            <p className="text-xs text-neutral-600 font-light mt-2">
              Via Montenapoleone 8, 20121 Milan, Italy<br />
              GSTIN: 27AABCP8491M1Z5 &bull; CIN: U74999MH2026PTC10928
            </p>
          </div>

          <div className="text-right">
            <span className="text-2xl font-serif font-bold text-neutral-900 block mb-1">TAX INVOICE</span>
            <span className="font-mono text-sm text-[#B8953D] font-bold block mb-1">#{orderId}</span>
            <span className="text-xs text-neutral-500 block">Date: {issueDate}</span>
          </div>
        </div>

        {/* Customer & Billing Info */}
        <div className="grid grid-cols-2 gap-8 py-8 border-b border-neutral-200 text-xs">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold block mb-2">Billed To</span>
            <p className="font-bold text-neutral-900 text-sm">{clientName}</p>
            <p className="text-neutral-600 font-light">{clientEmail}</p>
            <p className="text-neutral-600 font-light">42 Galleria Luxury Residency, Bandra West, Mumbai 400050</p>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold block mb-2">Shipping Service</span>
            <p className="font-bold text-neutral-900 text-sm">Shiprocket Express Luxury Courier</p>
            <p className="text-neutral-600 font-light">Tracking Code: SHIP-992481</p>
            <p className="text-emerald-700 font-bold mt-1">Status: Paid & Sealed</p>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="py-8">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b-2 border-neutral-900 text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
                <th className="py-3">Item Description</th>
                <th className="py-3 text-center">HSN Code</th>
                <th className="py-3 text-center">Qty</th>
                <th className="py-3 text-right">Unit Price</th>
                <th className="py-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 font-light text-neutral-800">
              <tr>
                <td className="py-4">
                  <span className="font-bold text-neutral-900 block text-sm">Heritage Skeleton Automatic Watch</span>
                  <span className="text-[10px] text-neutral-500">Swiss Automatic Movement &bull; Sapphire Crystal</span>
                </td>
                <td className="py-4 text-center font-mono">9102.11</td>
                <td className="py-4 text-center font-bold">1</td>
                <td className="py-4 text-right font-mono">{formatPrice(subtotalAmount)}</td>
                <td className="py-4 text-right font-mono font-bold text-neutral-900">{formatPrice(subtotalAmount)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Totals Calculation */}
        <div className="flex justify-end pt-4 border-t-2 border-neutral-900 text-xs">
          <div className="w-64 space-y-2">
            <div className="flex justify-between text-neutral-600">
              <span>Taxable Subtotal:</span>
              <span className="font-mono">{formatPrice(subtotalAmount)}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>IGST (18%):</span>
              <span className="font-mono">{formatPrice(taxAmount)}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Shipping Fee:</span>
              <span className="font-mono">FREE</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-neutral-300 font-bold text-sm text-neutral-900">
              <span>Total Amount:</span>
              <span className="font-mono text-base text-[#B8953D]">{formatPrice(grandTotal)}</span>
            </div>
          </div>
        </div>

        {/* Footer Guarantee & Stamp */}
        <div className="mt-12 pt-8 border-t border-neutral-200 flex justify-between items-end text-[10px] text-neutral-500">
          <div>
            <p className="font-bold text-neutral-800 uppercase tracking-widest mb-1">Authenticity & Quality Guarantee</p>
            <p>This is a computer-generated official tax invoice for Piyella Atelier.</p>
          </div>

          <div className="text-center border-t border-neutral-900 pt-2 px-6">
            <span className="font-serif uppercase font-bold text-neutral-900 text-xs tracking-widest block">PIYELLA ATELIER</span>
            <span className="text-[9px] uppercase tracking-widest text-neutral-400">Authorized Signature</span>
          </div>
        </div>

      </div>
    </main>
  );
}
