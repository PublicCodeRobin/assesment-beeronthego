import { useState } from 'react';
export const useError = (initialState = null) => {
  const [errorMsg, setError] = useState<string|null>(initialState);

  const resetError = () => setError(null);

  return { errorMsg, setError, resetError };
};
