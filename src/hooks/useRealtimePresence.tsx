import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface UserLocation {
  id: string;
  user_id: string;
  latitude: number;
  longitude: number;
  status: string; // Changed from union type to string
  message?: string;
  last_seen: string;
  is_public: boolean;
}

interface PresenceState {
  user_id: string;
  latitude: number;
  longitude: number;
  status: string;
  message?: string;
  online_at: string;
}

export const useRealtimePresence = () => {
  const [memberLocations, setMemberLocations] = useState<UserLocation[]>([]);
  const [onlineMembers, setOnlineMembers] = useState<Record<string, PresenceState>>({});
  const [isSharing, setIsSharing] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch existing member locations
  const fetchMemberLocations = async () => {
    try {
      const { data, error } = await supabase
        .from('user_locations')
        .select('*')
        .eq('is_public', true)
        .order('last_seen', { ascending: false });

      if (error) throw error;

      setMemberLocations(data || []);
    } catch (error) {
      console.error('Error fetching member locations:', error);
    }
  };

  // Share current location
  const shareLocation = async (location: { latitude: number; longitude: number }, status: string, message?: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_locations')
        .upsert({
          user_id: user.id,
          latitude: location.latitude,
          longitude: location.longitude,
          status,
          message,
          is_public: true,
          last_seen: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      setIsSharing(true);
      toast({
        title: "Location Shared",
        description: "Your location is now visible to other van lifers!",
      });

      // Also track in realtime presence
      const channel = supabase.channel('member-locations');
      await channel.track({
        user_id: user.id,
        latitude: location.latitude,
        longitude: location.longitude,
        status,
        message,
        online_at: new Date().toISOString(),
      });

    } catch (error) {
      console.error('Error sharing location:', error);
      toast({
        title: "Error",
        description: "Failed to share location. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Stop sharing location
  const stopSharing = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_locations')
        .update({
          status: 'offline',
          is_public: false,
          last_seen: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;

      setIsSharing(false);
      toast({
        title: "Location Sharing Stopped",
        description: "Your location is no longer visible to others.",
      });

    } catch (error) {
      console.error('Error stopping location sharing:', error);
    }
  };

  // Get user's current position
  const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      });
    });
  };

  // Auto-share location (if user has enabled it)
  const startLocationSharing = async (status: string, message?: string) => {
    try {
      const position = await getCurrentPosition();
      await shareLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }, status, message);
    } catch (error) {
      console.error('Error getting location:', error);
      toast({
        title: "Location Error",
        description: "Unable to get your current location. Please enable location services.",
        variant: "destructive",
      });
    }
  };

  // Set up realtime subscriptions
  useEffect(() => {
    fetchMemberLocations();

    // Subscribe to realtime presence for live member tracking
    const channel = supabase.channel('member-locations', {
      config: {
        presence: {
          key: user?.id || 'anonymous'
        }
      }
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const newState = channel.presenceState() as Record<string, PresenceState[]>;
        // Flatten the presence state
        const flattened: Record<string, PresenceState> = {};
        Object.entries(newState).forEach(([key, presences]) => {
          if (presences.length > 0) {
            flattened[key] = presences[0]; // Take the first presence
          }
        });
        setOnlineMembers(flattened);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('Member joined:', key, newPresences);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('Member left:', key, leftPresences);
      })
      .subscribe();

    // Subscribe to database changes for user locations
    const locationChanges = supabase
      .channel('user_locations_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'user_locations',
          filter: 'is_public=eq.true'
        }, 
        () => {
          fetchMemberLocations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      supabase.removeChannel(locationChanges);
    };
  }, [user]);

  return {
    memberLocations,
    onlineMembers,
    isSharing,
    shareLocation,
    stopSharing,
    startLocationSharing,
    getCurrentPosition,
  };
};