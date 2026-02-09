import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface LiveVan {
  id: string;
  user_id: string;
  latitude: number;
  longitude: number;
  speed: number | null;
  heading: number | null;
  accuracy: number | null;
  visibility: string;
  status: string;
  message: string | null;
  updated_at: string;
  display_name?: string;
}

export const useRealtimeVanLocations = (enabled = true) => {
  const [liveVans, setLiveVans] = useState<LiveVan[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all public van locations
  const fetchVanLocations = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('van_locations')
        .select('*')
        .eq('visibility', 'public')
        .order('updated_at', { ascending: false });

      if (error) throw error;

      // Fetch display names for each user
      const userIds = (data || []).map(v => v.user_id);
      let profileMap: Record<string, string> = {};

      if (userIds.length > 0) {
        const { data: profiles } = await supabase
          .from('profiles')
          .select('user_id, display_name')
          .in('user_id', userIds);

        if (profiles) {
          profileMap = Object.fromEntries(
            profiles.map(p => [p.user_id, p.display_name || 'Anonymous'])
          );
        }
      }

      setLiveVans(
        (data || []).map(v => ({
          id: v.id,
          user_id: v.user_id,
          latitude: v.latitude,
          longitude: v.longitude,
          speed: v.speed,
          heading: v.heading,
          accuracy: v.accuracy,
          visibility: v.visibility,
          status: v.status || 'traveling',
          message: v.message,
          updated_at: v.updated_at,
          display_name: profileMap[v.user_id] || 'Sprinter',
        }))
      );
    } catch (err) {
      console.error('Error fetching van locations:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Find vans near a specific point
  const findNearbyVans = useCallback(async (lat: number, lng: number, radiusMeters = 80467) => {
    try {
      const { data, error } = await supabase.rpc('nearby_vans', {
        p_lat: lat,
        p_lng: lng,
        p_radius: radiusMeters,
      });

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Error finding nearby vans:', err);
      return [];
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    fetchVanLocations();

    // Subscribe to realtime changes on van_locations
    const channel = supabase
      .channel('van_locations_realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'van_locations',
        },
        (payload) => {
          if (payload.eventType === 'DELETE') {
            setLiveVans(prev => prev.filter(v => v.id !== (payload.old as any).id));
          } else {
            // For INSERT/UPDATE, refetch to get display names
            fetchVanLocations();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [enabled, fetchVanLocations]);

  return {
    liveVans,
    loading,
    fetchVanLocations,
    findNearbyVans,
  };
};
