
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
  | "strength";

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
    
    return data || [];
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
