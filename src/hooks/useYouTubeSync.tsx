import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const SYNC_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const SYNC_KEY = 'youtube_last_sync';

export const useYouTubeSync = () => {
  useEffect(() => {
    const checkAndSync = async () => {
      try {
        const lastSync = localStorage.getItem(SYNC_KEY);
        const now = Date.now();
        
        // Check if we need to sync (24 hours have passed)
        if (!lastSync || now - parseInt(lastSync) > SYNC_INTERVAL) {
          console.log('Auto-syncing YouTube videos...');
          
          // Call the edge function to refresh videos
          const { data, error } = await supabase.functions.invoke('fetch-youtube-videos', {
            body: { maxResults: 25, forceRefresh: false }
          });
          
          if (!error) {
            localStorage.setItem(SYNC_KEY, now.toString());
            console.log('YouTube sync completed:', data);
          } else {
            console.error('YouTube sync failed:', error);
          }
        }
      } catch (error) {
        console.error('Error during YouTube sync:', error);
      }
    };

    // Run sync check on mount
    checkAndSync();
    
    // Set up interval for periodic checks (check every hour)
    const interval = setInterval(checkAndSync, 60 * 60 * 1000); // 1 hour
    
    return () => clearInterval(interval);
  }, []);
};

export default useYouTubeSync;