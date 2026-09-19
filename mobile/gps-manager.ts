/* 
 * T.H.E.L.M.A. AI - Field Telemetry Engine v4.0.0
 * Component: GPS & Battery Matrix
 * Architect: Steve Henry
 * 
 * DIRECTIVE:
 * This module manages spatial awareness for the federation.
 * It must enforce the F-101 "Low Bridge" geofence logic (Bridge < 14'2")
 * and optimize polling rates based on battery cell health.
 */

import { Geolocation, Position } from '@capacitor/geolocation';
import { App } from '@capacitor/app';
import { Device } from '@capacitor/device';
import { LocalNotifications } from '@capacitor/local-notifications';

interface GPSConfig {
  enableHighAccuracy: boolean;
  timeout: number;
  maximumAge: number;
  background_enabled: boolean;
}

interface GPSProfile {
  id: string;
  name: string;
  config: GPSConfig;
  updateInterval: number; // in milliseconds
}

const PROFILES: Record<string, GPSProfile> = {
  high_accuracy: {
    id: 'high_accuracy',
    name: 'High Accuracy (Tactical)',
    config: {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
      background_enabled: true
    },
    updateInterval: 5000
  },
  balanced: {
    id: 'balanced',
    name: 'Balanced (Cruise)',
    config: {
      enableHighAccuracy: true, // Still use GPS but less frequently
      timeout: 10000,
      maximumAge: 3000,
      background_enabled: true
    },
    updateInterval: 30000 // 30 seconds
  },
  power_saving: {
    id: 'power_saving',
    name: 'Power Saving (Idle)',
    config: {
      enableHighAccuracy: false, // Use network/wifi primarily
      timeout: 20000,
      maximumAge: 60000, // Accept older positions
      background_enabled: false
    },
    updateInterval: 300000 // 5 minutes
  }
};

export class GPSManager {
  private watchId: string | null = null;
  private currentProfile: GPSProfile = PROFILES.balanced;
  private intervalId: any = null;
  private lastBatteryLevel: number | null = null;

  constructor() {
    this.initializeBatteryMonitoring();
  }

  private async initializeBatteryMonitoring() {
    const info = await Device.getBatteryInfo();
    this.handleBatteryLevel(info.batteryLevel);

    // Poll battery level periodically if event listener isn't sufficient for granular updates
    // or rely on system events if available via a plugin.
    // For simplicity, we check on every profile update or start.
    setInterval(async () => {
        const currentInfo = await Device.getBatteryInfo();
        this.handleBatteryLevel(currentInfo.batteryLevel);
    }, 60000); 
  }

  private handleBatteryLevel(level: number | undefined) {
    if (level === undefined) return;
    
    // Battery level is usually 0.0 to 1.0
    const percentage = level * 100;

    let newProfileId = this.currentProfile.id;

    if (percentage < 20) {
      newProfileId = 'power_saving';
    } else if (percentage < 40) {
        if (this.currentProfile.id === 'high_accuracy') {
             newProfileId = 'balanced';
        }
    }

    if (newProfileId !== this.currentProfile.id) {
      this.setProfile(newProfileId);
      this.notifyUserOfProfileChange(newProfileId, percentage);
    }
    
    this.lastBatteryLevel = percentage;
  }

  private async notifyUserOfProfileChange(profileId: string, batteryLevel: number) {
      await LocalNotifications.schedule({
          notifications: [{
              title: 'GPS Mode Changed',
              body: `Battery at ${Math.round(batteryLevel)}%. Switched to ${PROFILES[profileId].name} mode to save power.`,
              id: Math.floor(Math.random() * 10000),
              schedule: { at: new Date(Date.now() + 1000) }
          }]
      });
  }

  public setProfile(profileId: string) {
    if (PROFILES[profileId]) {
      console.log(`Switching GPS profile to: ${profileId}`);
      this.currentProfile = PROFILES[profileId];
      // Restart tracking with new settings if currently active
      if (this.watchId || this.intervalId) {
        this.stopTracking();
        this.startTracking();
      }
    } else {
      console.warn(`Profile ${profileId} not found.`);
    }
  }

  public async startTracking(callback?: (position: Position) => void) {
    if (this.watchId || this.intervalId) {
        return; // Already tracking
    }

    // Check for background permission logic
    // App state check
    const appState = await App.getState();
    const isBackground = !appState.isActive;

    if (isBackground && !this.currentProfile.config.background_enabled) {
        console.log("Background tracking disabled in current profile. Tracking paused.");
        return;
    }

    // Capacitor Geolocation watchPosition is continuous, but we might want manual interval control 
    // for 'power_saving' or specific intervals not supported natively by the watch API.
    // Here we use setInterval to fetching position to strictly adhere to updateInterval
    
    this.intervalId = setInterval(async () => {
        // Re-check background status on every tick
        const currentAppState = await App.getState();
        if (!currentAppState.isActive && !this.currentProfile.config.background_enabled) {
            return; // Skip update if in background and disabled
        }

        try {
            const position = await Geolocation.getCurrentPosition(this.currentProfile.config);
            if (callback) {
                callback(position);
            }
            console.log('GPS Update (v4.0.0 Mesh):', position.coords);
        } catch (error) {
            console.error('Error getting location', error);
        }
    }, this.currentProfile.updateInterval);

    console.log(`Tracking started with profile: ${this.currentProfile.name}`);
  }

  public stopTracking() {
    if (this.watchId) {
      Geolocation.clearWatch({ id: this.watchId });
      this.watchId = null;
    }
    if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
    }
    console.log('Tracking stopped');
  }

  public async getCurrentPosition(): Promise<Position | null> {
    try {
      return await Geolocation.getCurrentPosition(this.currentProfile.config);
    } catch (error) {
      console.error('Error getting current position', error);
      return null;
    }
  }
}
