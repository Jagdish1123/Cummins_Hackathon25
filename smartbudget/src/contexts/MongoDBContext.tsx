import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { connectToDatabase } from '@/lib/mongodb';

interface MongoDBContextType {
  isConnected: boolean;
  error: Error | null;
}

const MongoDBContext = createContext<MongoDBContextType>({
  isConnected: false,
  error: null
});

export function MongoDBProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    connectToDatabase()
      .then(() => setIsConnected(true))
      .catch((err) => setError(err));
  }, []);

  return (
    <MongoDBContext.Provider value={{ isConnected, error }}>
      {children}
    </MongoDBContext.Provider>
  );
}

export const useMongoDB = () => useContext(MongoDBContext); 