
-- Create tables for metrics tracking
CREATE TABLE public.user_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  metric_type TEXT NOT NULL,
  value NUMERIC NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create tables for habit tracking
CREATE TABLE public.user_habits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  habit_type TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  target_value NUMERIC NOT NULL,
  actual_value NUMERIC NOT NULL DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Function to calculate habit streaks
CREATE OR REPLACE FUNCTION get_habit_streaks(user_id_param UUID)
RETURNS TABLE (
  habit_type TEXT,
  streak_count INT
) AS $$
BEGIN
  RETURN QUERY
  WITH habit_days AS (
    SELECT
      habit_type,
      DATE_TRUNC('day', created_at) AS day,
      MAX(CASE WHEN completed THEN 1 ELSE 0 END) AS completed
    FROM
      public.user_habits
    WHERE
      user_id = user_id_param
    GROUP BY
      habit_type, DATE_TRUNC('day', created_at)
    ORDER BY
      habit_type, DATE_TRUNC('day', created_at) DESC
  ),
  habit_runs AS (
    SELECT
      habit_type,
      day,
      completed,
      SUM(CASE WHEN completed = 0 THEN 1 ELSE 0 END) OVER (
        PARTITION BY habit_type ORDER BY day DESC
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
      ) AS run_group
    FROM
      habit_days
  )
  SELECT
    habit_type,
    COUNT(*)::INT AS streak_count
  FROM
    habit_runs
  WHERE
    completed = 1
    AND run_group = 0
  GROUP BY
    habit_type;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add Row Level Security
ALTER TABLE public.user_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_habits ENABLE ROW LEVEL SECURITY;

-- Create policies for user_metrics
CREATE POLICY "Users can view their own metrics"
  ON public.user_metrics
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own metrics"
  ON public.user_metrics
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own metrics"
  ON public.user_metrics
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own metrics"
  ON public.user_metrics
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create policies for user_habits
CREATE POLICY "Users can view their own habits"
  ON public.user_habits
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own habits"
  ON public.user_habits
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own habits"
  ON public.user_habits
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own habits"
  ON public.user_habits
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create indices for performance
CREATE INDEX idx_user_metrics_user_id ON public.user_metrics(user_id);
CREATE INDEX idx_user_metrics_type ON public.user_metrics(metric_type);
CREATE INDEX idx_user_metrics_created_at ON public.user_metrics(created_at);

CREATE INDEX idx_user_habits_user_id ON public.user_habits(user_id);
CREATE INDEX idx_user_habits_type ON public.user_habits(habit_type);
CREATE INDEX idx_user_habits_created_at ON public.user_habits(created_at);
