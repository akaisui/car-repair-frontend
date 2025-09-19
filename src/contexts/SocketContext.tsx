'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    console.log('🔌 SocketContext effect triggered');
    console.log('🔌 isAuthenticated:', isAuthenticated);
    console.log('🔌 user:', user);

    if (user) {
      // Only check user since isAuthenticated is undefined
      // Connect to Socket.IO server
      console.log('🔌 Attempting to connect to Socket.IO...');
      console.log('🔌 API URL:', process.env.NEXT_PUBLIC_API_URL);

      const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'https://car-repair-backend-trim4.sevalla.app', {
        transports: ['websocket', 'polling'],
        timeout: 20000,
        withCredentials: true,
      });

      socketInstance.on('connect', () => {
        console.log('🔌 Connected to Socket.IO server');
        console.log('🔌 Socket ID:', socketInstance.id);
        console.log('🔌 User ID:', user.id);
        setIsConnected(true);

        // Join user room for notifications
        socketInstance.emit('join', user.id);
        console.log(`🔌 Emitted join event for user ${user.id}`);
      });

      socketInstance.on('disconnect', () => {
        console.log('🔌 Disconnected from Socket.IO server');
        setIsConnected(false);
      });

      socketInstance.on('connect_error', (error) => {
        console.error('🔌 Socket.IO connection error:', error);
        setIsConnected(false);
      });

      // Debug: Listen to all events
      socketInstance.onAny((eventName, ...args) => {
        console.log('🔌 Socket.IO Event received:', eventName, args);
      });

      setSocket(socketInstance);

      return () => {
        if (socketInstance) {
          socketInstance.disconnect();
        }
      };
    } else {
      // Disconnect when user logs out
      console.log('🔌 Not connecting: user =', user);
      if (socket) {
        console.log('🔌 Disconnecting existing socket');
        socket.disconnect();
        setSocket(null);
        setIsConnected(false);
      }
    }
  }, [isAuthenticated, user]);

  const value = {
    socket,
    isConnected,
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};
