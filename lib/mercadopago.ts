import MercadoPagoConfig, { Preference, Payment } from 'mercadopago';

function getMpClient() {
  return new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN!,
  });
}

export function getMpPreference() {
  return new Preference(getMpClient());
}

export function getMpPayment() {
  return new Payment(getMpClient());
}
