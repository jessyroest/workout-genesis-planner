
import { supabase } from "@/integrations/supabase/client";

export type MetricType = 
  | "weight" 
  | "bodyFat" 
  | "sleep" 
  | "water" 
  | "calories" 
  | "meditation" 
  | "vitamin" 
  | "steps"
  | "strength"
  | "protein"
  | "fatigue"
  | "mood";

export interface UserMetric {
  id?: string;
  user_id?: string;
  metric_type: MetricType;
  value: number;
  created_at?: string;
  notes?: string;
}

export const saveMetric = async (metric: UserMetric): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('user_metrics')
      .insert({
        user_id: metric.user_id,
        metric_type: metric.metric_type,
        value: metric.value,
        notes: metric.notes
      });
      
    if (error) {
      console.error("Error saving metric:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error in saveMetric:", error);
    return false;
  }
};

export const getUserMetrics = async (
  userId: string, 
  metricType: MetricType, 
  limit: number = 30
): Promise<UserMetric[]> => {
  try {
    const { data, error } = await supabase
      .from('user_metrics')
      .select('*')
      .eq('user_id', userId)
      .eq('metric_type', metricType)
      .order('created_at', { ascending: false })
      .limit(limit);
      
    if (error) {
      console.error("Error fetching metrics:", error);
      return [];
    }
    
    // Type casting to ensure compatibility
    return (data || []).map(item => ({
      id: item.id,
      user_id: item.user_id,
      metric_type: item.metric_type as MetricType,
      value: item.value,
      created_at: item.created_at,
      notes: item.notes
    }));
  } catch (error) {
    console.error("Error in getUserMetrics:", error);
    return [];
  }
};

export const getMetricsTrend = async (
  userId: string,
  metricType: MetricType,
  days: number = 30
): Promise<{dates: string[], values: number[]}> => {
  try {
    // Calculate date from X days ago
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - days);
    
    const { data, error } = await supabase
      .from('user_metrics')
      .select('*')
      .eq('user_id', userId)
      .eq('metric_type', metricType)
      .gte('created_at', fromDate.toISOString())
      .order('created_at', { ascending: true });
      
    if (error) {
      console.error("Error fetching metrics trend:", error);
      return {dates: [], values: []};
    }
    
    // Format data for chart display
    const dates = (data || []).map(item => 
      new Date(item.created_at).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})
    );
    
    const values = (data || []).map(item => item.value);
    
    return { dates, values };
  } catch (error) {
    console.error("Error in getMetricsTrend:", error);
    return {dates: [], values: []};
  }
};

// New utility functions for enhanced metrics
export const getMetricColor = (metricType: MetricType): string => {
  const colors: Record<MetricType, string> = {
    weight: '#2563eb', // blue
    bodyFat: '#9333ea', // purple
    sleep: '#3b82f6', // blue
    water: '#0ea5e9', // sky blue
    calories: '#f97316', // orange
    meditation: '#8b5cf6', // violet
    vitamin: '#eab308', // yellow
    steps: '#22c55e', // green
    strength: '#ef4444', // red
    protein: '#dc2626', // dark red
    fatigue: '#6b7280', // gray
    mood: '#ec4899', // pink
  };

  return colors[metricType] || '#6b7280'; // default to gray
};

export const getMetricIcon = (metricType: MetricType): string => {
  const icons: Record<MetricType, string> = {
    weight: 'weight',
    bodyFat: 'activity',
    sleep: 'moon',
    water: 'droplet',
    calories: 'flame',
    meditation: 'heart',
    vitamin: 'pill', 
    steps: 'footprints',
    strength: 'dumbbell',
    protein: 'egg',
    fatigue: 'battery',
    mood: 'smile',
  };

  return icons[metricType] || 'activity';
};

export const getMetricLabel = (metricType: MetricType): string => {
  const labels: Record<MetricType, string> = {
    weight: 'Weight (kg)',
    bodyFat: 'Body Fat (%)',
    sleep: 'Sleep (hrs)',
    water: 'Water (liters)',
    calories: 'Calories',
    meditation: 'Meditation (min)',
    vitamin: 'Vitamins Taken',
    steps: 'Steps',
    strength: 'Strength (kg)',
    protein: 'Protein (g)',
    fatigue: 'Fatigue Level',
    mood: 'Mood Level',
  };

  return labels[metricType] || metricType;
};

// Get metrics goal direction (whether higher or lower is better)
export const getGoalDirection = (metricType: MetricType): 'higher' | 'lower' | 'target' => {
  const higherIsBetter = ['strength', 'steps', 'water', 'sleep', 'meditation', 'vitamin', 'protein', 'mood'];
  const lowerIsBetter = ['bodyFat', 'fatigue'];
  
  if (higherIsBetter.includes(metricType)) return 'higher';
  if (lowerIsBetter.includes(metricType)) return 'lower';
  return 'target'; // Weight and calories depend on specific goals
};
