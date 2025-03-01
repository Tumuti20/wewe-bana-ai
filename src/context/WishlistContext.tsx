import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getWishlist, addToWishlist, removeFromWishlist } from '../api/wishlist';
import { useAuth } from './AuthContext';

export interface WishlistItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  countInStock: number;
  discount?: number;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  loading: boolean;
  error: string | null;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  clearError: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Load wishlist when user is authenticated
  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        try {
          setLoading(true);
          const data = await getWishlist();
          setWishlistItems(data);
        } catch (err: any) {
          setError(err.response?.data?.message || 'Failed to fetch wishlist');
        } finally {
          setLoading(false);
        }
      } else {
        // Clear wishlist when user logs out
        setWishlistItems([]);
      }
    };

    fetchWishlist();
  }, [user]);

  const addItemToWishlist = async (productId: string) => {
    try {
      setLoading(true);
      setError(null);
      await addToWishlist(productId);
      // Refresh wishlist after adding item
      const data = await getWishlist();
      setWishlistItems(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add item to wishlist');
    } finally {
      setLoading(false);
    }
  };

  const removeItemFromWishlist = async (productId: string) => {
    try {
      setLoading(true);
      setError(null);