import type { ApplicationStatus } from "../interfaces/status.interface";

export const statusStyles: Record<ApplicationStatus, string> = {
  PENDING: 'bg-yellow-200 text-yellow-800',
  CLOSED: 'bg-blue-200 text-blue-800',
  ACCEPTED: 'bg-green-200 text-green-800',
  REJECTED: 'bg-red-200 text-red-800',
};

