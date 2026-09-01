export const partySizes = ['2 guests', '3 guests', '4 guests', '5+ guests'] as const;

export type PartySize = (typeof partySizes)[number];

export type ReservationRequest = {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: PartySize;
  note: string;
};

export type Reservation = ReservationRequest & {
  id: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
};

const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;
const phonePattern = /^[0-9+()\s-]{7,25}$/;

export function validateReservation(value: unknown): { data: ReservationRequest } | { error: string } {
  if (typeof value !== 'object' || value === null) return { error: 'Please complete the reservation form.' };
  const input = value as Record<string, unknown>;
  const name = typeof input.name === 'string' ? input.name.trim() : '';
  const phone = typeof input.phone === 'string' ? input.phone.trim() : '';
  const date = typeof input.date === 'string' ? input.date : '';
  const time = typeof input.time === 'string' ? input.time : '';
  const guests = typeof input.guests === 'string' ? input.guests : '';
  const note = typeof input.note === 'string' ? input.note.trim() : '';

  if (name.length < 2 || name.length > 100) return { error: 'Please enter a name between 2 and 100 characters.' };
  if (!phonePattern.test(phone)) return { error: 'Please enter a valid phone number.' };
  if (!datePattern.test(date) || Number.isNaN(Date.parse(`${date}T00:00:00Z`))) return { error: 'Please choose a valid date.' };
  if (!timePattern.test(time)) return { error: 'Please choose a valid time.' };
  if (!partySizes.includes(guests as PartySize)) return { error: 'Please choose a party size.' };
  if (note.length > 1_000) return { error: 'Your note must be 1,000 characters or fewer.' };

  return { data: { name, phone, date, time, guests: guests as PartySize, note } };
}
