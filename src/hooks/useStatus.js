import { useState } from 'react';

export const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const useStatus = () => {
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);

  const statusSetIdle = () => setStatus(Status.IDLE);
  const statusSetPending = () => setStatus(Status.PENDING);
  const statusSetResolved = () => setStatus(Status.RESOLVED);
  const statusSetRejected = () => setStatus(Status.REJECTED);

  return {
    status,
    error,
    setError,
    statusSetIdle,
    statusSetPending,
    statusSetResolved,
    statusSetRejected,
  };
};
