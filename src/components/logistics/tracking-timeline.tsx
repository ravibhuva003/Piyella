'use client';

import React from 'react';
import { CheckCircle2, Truck, Package, Clock, MapPin, Building2, ExternalLink } from 'lucide-react';
import { ShiprocketTrackingResponse } from '@/lib/shiprocket/api';

interface TrackingTimelineProps {
  tracking: ShiprocketTrackingResponse;
}

export function TrackingTimeline({ tracking }: TrackingTimelineProps) {
  const steps = [
    { title: 'Order Confirmed', key: 'Order Placed' },
    { title: 'Dispatched', key: 'Dispatched' },
    { title: 'In Transit', key: 'In Transit' },
    { title: 'Out for Delivery', key: 'Out for Delivery' },
    { title: 'Delivered', key: 'Delivered' },
  ];

  const getStepIndex = (status: string) => {
    if (status === 'Delivered') return 4;
    if (status === 'Out for Delivery') return 3;
    if (status === 'In Transit') return 2;
    if (status === 'Dispatched') return 1;
    return 0;
  };

  const currentIndex = getStepIndex(tracking.currentStatus);

  return (
    <div className="space-y-10 text-white">
      {/* Top Courier Header */}
      <div className="bg-[#0a0a0a] border border-white/10 p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-medium block mb-1">
            Express Shipment Track
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-white font-medium">
            AWB: <span className="font-mono text-[#C9A96E]">{tracking.awbCode}</span>
          </h2>
          <p className="text-xs text-white/50 font-light mt-1">
            Courier: <span className="text-white font-medium">{tracking.courierName}</span> &bull; Estimated Arrival: <span className="text-emerald-400 font-medium">{tracking.estimatedDelivery}</span>
          </p>
        </div>

        <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2">
          <Truck className="w-4 h-4 animate-pulse" />
          <span>{tracking.currentStatus}</span>
        </div>
      </div>

      {/* Visual Step Progress Bar */}
      <div className="bg-[#0a0a0a] border border-white/10 p-6 sm:p-8 rounded-2xl">
        <div className="relative flex items-center justify-between max-w-3xl mx-auto">
          {/* Connecting Line */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-white/10 z-0" />
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-[#C9A96E] transition-all duration-700 z-0"
            style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
          />

          {steps.map((step, idx) => {
            const isCompleted = idx <= currentIndex;
            return (
              <div key={step.key} className="relative z-10 flex flex-col items-center gap-2 text-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    isCompleted
                      ? 'bg-[#C9A96E] border-[#C9A96E] text-black shadow-lg shadow-[#C9A96E]/30'
                      : 'bg-black border-white/20 text-white/40'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span
                  className={`text-[10px] uppercase tracking-wider hidden sm:block ${
                    isCompleted ? 'text-white font-bold' : 'text-white/40'
                  }`}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Activity Checkpoint Logs */}
      <div className="bg-[#0a0a0a] border border-white/10 p-6 sm:p-8 rounded-2xl space-y-6">
        <h3 className="font-serif text-xl text-white pb-4 border-b border-white/10">
          Shipment Activity Checkpoints
        </h3>

        <div className="space-y-6 relative before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-white/10">
          {tracking.checkpoints.map((cp, idx) => (
            <div key={idx} className="relative pl-8 space-y-1">
              <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-[#C9A96E] ring-4 ring-black" />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h4 className="font-serif text-base text-white font-medium">{cp.status}</h4>
                <span className="text-[11px] font-mono text-white/40">{cp.timestamp}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#C9A96E]">
                <MapPin className="w-3.5 h-3.5" />
                <span>{cp.location}</span>
              </div>
              <p className="text-xs text-white/60 font-light pt-1">{cp.activity}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
