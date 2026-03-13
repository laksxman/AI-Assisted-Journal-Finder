import { formatDistanceToNow, format } from 'date-fns';

export const formatRelativeDate = (date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const formatFullDate = (date) => {
  return format(new Date(date), 'MMM dd, yyyy h:mm a');
};

export const formatDateShort = (date) => {
  return format(new Date(date), 'MMM dd');
};

