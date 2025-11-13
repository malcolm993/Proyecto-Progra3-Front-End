export type RegistrationStatus = 'confirmed' | 'waiting' | 'cancelled';

export interface Registration {
  id: string;
  eventId: string;
  participantId: string;
  registrationDate: Date;
  status: RegistrationStatus;
  attended?: boolean;
}

export interface RegistrationCreateData {
  eventId: string;
  participantId: string;
}