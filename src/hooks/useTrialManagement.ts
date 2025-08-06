import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface TrialStatus {
  isActive: boolean;
  daysRemaining: number;
  trialStarted: boolean;
}

export const useTrialManagement = () => {
  const [trialStatus, setTrialStatus] = useState<TrialStatus>({
    isActive: false,
    daysRemaining: 0,
    trialStarted: false
  });
  const [loading, setLoading] = useState(false);

  const startTrial = async (email: string, userId?: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('trial-management', {
        body: { action: 'start_trial', email, userId }
      });

      if (error) throw error;

      if (data?.success) {
        setTrialStatus({
          isActive: true,
          daysRemaining: 14,
          trialStarted: true
        });
        localStorage.setItem('trial_started', 'true');
        localStorage.setItem('trial_start_date', new Date().toISOString());
        return { success: true, message: 'Free trial started successfully!' };
      }
    } catch (error) {
      console.error('Error starting trial:', error);
      return { success: false, message: 'Failed to start trial' };
    } finally {
      setLoading(false);
    }
  };

  const checkTrialStatus = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('trial-management', {
        body: { action: 'check_trial' }
      });

      if (error) throw error;

      if (data?.success) {
        setTrialStatus({
          isActive: data.trial_active,
          daysRemaining: data.days_remaining,
          trialStarted: localStorage.getItem('trial_started') === 'true'
        });
      }
    } catch (error) {
      console.error('Error checking trial:', error);
      // Fallback to local storage check
      const trialStartDate = localStorage.getItem('trial_start_date');
      if (trialStartDate) {
        const startDate = new Date(trialStartDate);
        const now = new Date();
        const daysElapsed = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        const daysRemaining = Math.max(0, 14 - daysElapsed);
        
        setTrialStatus({
          isActive: daysRemaining > 0,
          daysRemaining,
          trialStarted: true
        });
      }
    }
  };

  useEffect(() => {
    checkTrialStatus();
  }, []);

  return {
    trialStatus,
    startTrial,
    checkTrialStatus,
    loading
  };
};
