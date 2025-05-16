
import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "@supabase/supabase-js";
import { getUserMetrics, getMetricsTrend, MetricType, saveMetric } from "@/utils/metricUtils";
import { Plus, Save } from "lucide-react";

interface ProgressTrackerProps {
  user: User | null;
}

interface MetricFormData {
  type: MetricType;
  value: number;
  date: string;
  notes: string;
}

const metricTabOptions = [
  { value: "weight", label: "Weight (kg)", color: "#e11d48" },
  { value: "bodyFat", label: "Body Fat (%)", color: "#0ea5e9" },
  { value: "strength", label: "Strength (kg)", color: "#8b5cf6" },
  { value: "calories", label: "Calorie Intake", color: "#f97316" }
];

const ProgressTracker = ({ user }: ProgressTrackerProps) => {
  const [activeMetric, setActiveMetric] = useState<MetricType>("weight");
  const [chartData, setChartData] = useState<{ dates: string[], values: number[] }>({ dates: [], values: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<MetricFormData>({
    type: "weight",
    value: 0,
    date: new Date().toISOString().split('T')[0],
    notes: ""
  });

  useEffect(() => {
    if (user) {
      loadMetricsTrend(activeMetric);
    }
  }, [activeMetric, user]);

  const loadMetricsTrend = async (metricType: MetricType) => {
    if (!user) return;

    setIsLoading(true);
    try {
      const data = await getMetricsTrend(user.id, metricType, 90);
      setChartData(data);
    } catch (error) {
      console.error("Error loading metrics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMetric = async () => {
    if (!user) return;

    try {
      await saveMetric({
        user_id: user.id,
        metric_type: formData.type,
        value: formData.value,
        notes: formData.notes
      });
      
      // Reload the chart data
      loadMetricsTrend(formData.type);
      setActiveMetric(formData.type);
      setShowForm(false);
      setFormData({
        type: formData.type,
        value: 0,
        date: new Date().toISOString().split('T')[0],
        notes: ""
      });
    } catch (error) {
      console.error("Error adding metric:", error);
    }
  };

  const getChartData = () => {
    return chartData.dates.map((date, index) => ({
      date,
      value: chartData.values[index]
    }));
  };

  return (
    <Card className="bg-black/50 border-purple-800/30 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white flex items-center">
          <span className="bg-purple-900 p-2 rounded-md mr-2">📊</span>
          Progress Tracker
        </CardTitle>
        <CardDescription className="text-gray-400">
          Track your fitness metrics over time
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="weight" value={activeMetric} onValueChange={(v) => setActiveMetric(v as MetricType)}>
          <TabsList className="grid grid-cols-4 mb-4 bg-black/70">
            {metricTabOptions.map((option) => (
              <TabsTrigger 
                key={option.value} 
                value={option.value}
                className="data-[state=active]:bg-purple-900"
              >
                {option.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {metricTabOptions.map((option) => (
            <TabsContent key={option.value} value={option.value} className="h-[240px]">
              {isLoading ? (
                <div className="h-full flex items-center justify-center">
                  <div className="animate-spin h-8 w-8 border-4 border-purple-500 rounded-full border-t-transparent"></div>
                </div>
              ) : chartData.dates.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={getChartData()}
                    margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="date" stroke="#999" />
                    <YAxis stroke="#999" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#222', borderColor: '#666', color: '#fff' }} 
                      labelStyle={{ color: '#fff' }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      name={option.label}
                      stroke={option.color} 
                      strokeWidth={2}
                      dot={{ stroke: option.color, strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#fff' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                  <p>No data available for {option.label}</p>
                  <p className="text-sm">Add your first data point to start tracking</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {showForm ? (
          <div className="mt-4 bg-gray-900 p-4 rounded-md">
            <h4 className="font-bold mb-2">Add {activeMetric} Data</h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm block mb-1">Value</label>
                <input
                  type="number"
                  className="w-full bg-black border border-gray-700 rounded p-2"
                  value={formData.value}
                  onChange={(e) => setFormData(prev => ({ ...prev, value: parseFloat(e.target.value) || 0 }))}
                />
              </div>
              <div>
                <label className="text-sm block mb-1">Date</label>
                <input
                  type="date"
                  className="w-full bg-black border border-gray-700 rounded p-2"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-sm block mb-1">Notes (optional)</label>
              <input
                type="text"
                className="w-full bg-black border border-gray-700 rounded p-2"
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Eg: After morning workout"
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleAddMetric} className="bg-purple-800 hover:bg-purple-700">
                <Save className="mr-2 h-4 w-4" /> Save
              </Button>
              <Button 
                onClick={() => setShowForm(false)} 
                variant="outline" 
                className="border-gray-700 text-gray-300"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button 
            onClick={() => {
              setFormData(prev => ({ ...prev, type: activeMetric }));
              setShowForm(true);
            }} 
            className="mt-4 bg-purple-900 hover:bg-purple-800 w-full"
          >
            <Plus className="mr-2 h-4 w-4" /> Add New {activeMetric} Data
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ProgressTracker;
