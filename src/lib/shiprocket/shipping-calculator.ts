export interface ShippingRate {
  courierName: string;
  rate: number;
  estimatedDays: string;
  isExpress: boolean;
}

export function calculateShipping(subtotal: number, pincode: string): ShippingRate[] {
  const isFreeShipping = subtotal >= 2999;
  const isMetroPincode = /^(11|40|70|56|60|50)/.test(pincode);

  return [
    {
      courierName: 'Shiprocket Express Luxury Courier',
      rate: isFreeShipping ? 0 : 250,
      estimatedDays: isMetroPincode ? '1-2 Business Days' : '2-3 Business Days',
      isExpress: true,
    },
    {
      courierName: 'Atelier White Glove VIP Courier',
      rate: 750,
      estimatedDays: 'Same-Day / Next-Day Delivery',
      isExpress: true,
    },
  ];
}

export function checkPincodeServiceability(pincode: string): boolean {
  return /^\d{6}$/.test(pincode.trim());
}
