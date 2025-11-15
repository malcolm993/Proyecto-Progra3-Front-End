import type { EventType, InterestCategory } from "../utils/constants/app";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  type: EventType;
  organizerId: string;
  speaker: string;
  speakerCompany?: string;
  startTime: Date;
  endTime: Date;
  maxParticipants?: number;
  currentParticipants: number;
  tags: string[];
  imageUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  interests: InterestCategory[];
}

export interface EventCreateData {
  title: string;
  description: string;
  date: Date;
  location: string;
  type: EventType;
  speaker: string;
  speakerCompany?: string;
  startTime: Date;
  endTime: Date;
  maxParticipants?: number;
  tags: string[];
  interests: InterestCategory[];
}

export interface EventFilters {
  type?: EventType;
  dateFrom?: Date;
  dateTo?: Date;
  industry?: string;
  query?: string;
  interests?: InterestCategory[];
}