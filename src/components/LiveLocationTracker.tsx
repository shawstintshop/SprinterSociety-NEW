import { useEffect } from "react";
import { useVanLocation } from "@/hooks/useVanLocation";
import { useAuth } from "@/contexts/AuthContext";

/**
 * LiveLocationTracker is a headless component that runs the browser
 * geolocation watcher in the background when the user has GPS sharing
 * enabled. Mount it once in App.tsx or a layout component.
 *
 * It renders nothing — it only manages the side effect.
 */
const LiveLocationTracker = () => {
  const { user } = useAuth();
  const { settings, isTracking, startTracking, settingsLoading } = useVanLocation();

  useEffect(() => {
    // Auto-start tracking if user has sharing enabled and not already tracking
    if (user && !settingsLoading && settings.sharing_enabled && !isTracking) {
      startTracking();
    }
  }, [user, settingsLoading, settings.sharing_enabled, isTracking, startTracking]);

  // This component renders nothing
  return null;
};

export default LiveLocationTracker;
