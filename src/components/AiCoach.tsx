
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, User, Bot } from "lucide-react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

interface AiCoachProps {
  user: SupabaseUser | null;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

const initialMessages: Message[] = [
  {
    role: "assistant",
    content: "Hi, I'm your personal fitness coach! How can I help you with your fitness journey today?",
  },
];

const fitnessResponses = [
  "Focus on progressive overload - gradually increasing weight, reps, or sets is crucial for continuous improvement.",
  "Remember that recovery is just as important as the workout itself. Make sure you're getting adequate sleep and nutrition.",
  "For optimal muscle growth, aim for 10-20 sets per muscle group weekly, spread across 2-3 training sessions.",
  "Try to incorporate compound movements in your workouts - they engage multiple muscle groups and offer more bang for your buck.",
  "The best diet is one you can sustain long-term. Focus on balanced nutrition with adequate protein, rather than extreme restrictions.",
  "For fat loss, creating a caloric deficit is key, but don't drop calories too low or you'll lose muscle mass too.",
  "Remember to stay hydrated - aim for at least 3-4 liters of water daily, more if you're training intensely.",
  "Consistency trumps perfection. It's better to maintain a sustainable routine than to burn out with extreme approaches.",
  "Don't skip mobility work - incorporate dynamic stretching and foam rolling to improve range of motion and prevent injuries.",
  "Track your workouts to ensure progressive overload and to stay accountable to your goals.",
];

const motivationalQuotes = [
  "The only bad workout is the one that didn't happen.",
  "Your body can stand almost anything. It's your mind that you have to convince.",
  "Strength does not come from the physical capacity. It comes from an indomitable will.",
  "The difference between the impossible and the possible lies in determination.",
  "The clock is ticking. Are you becoming the person you want to be?",
  "Success isn't always about greatness. It's about consistency. Consistent hard work gains success.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "Don't stop when you're tired. Stop when you're done.",
  "If you want something you've never had, you must be willing to do something you've never done.",
  "The body achieves what the mind believes.",
];

const AiCoach = ({ user }: AiCoachProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { role: "user" as const, content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response with delay
    setTimeout(() => {
      // Get random response based on content
      const hasWorkout = input.toLowerCase().includes("workout");
      const hasDiet = input.toLowerCase().includes("diet") || input.toLowerCase().includes("nutrition");
      const hasMotivation = input.toLowerCase().includes("motivat") || input.toLowerCase().includes("inspir");

      let response;
      if (hasMotivation) {
        response = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
      } else if (hasWorkout || hasDiet) {
        response = fitnessResponses[Math.floor(Math.random() * fitnessResponses.length)];
      } else {
        response = "I'm here to help with your fitness journey. Ask me about workouts, nutrition, or if you need motivation!";
      }

      // Add AI response
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: response },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAskForTip = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: "Give me a fitness tip" },
    ]);
    setIsTyping(true);

    // Simulate AI response with delay
    setTimeout(() => {
      const response = fitnessResponses[Math.floor(Math.random() * fitnessResponses.length)];
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: response },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const handleAskForMotivation = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: "I need some motivation" },
    ]);
    setIsTyping(true);

    // Simulate AI response with delay
    setTimeout(() => {
      const response = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: response },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <Card className="bg-black/50 border-purple-800/30 backdrop-blur flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white flex items-center">
          <span className="bg-purple-900 p-2 rounded-md mr-2">🤖</span>
          Fitness AI Coach
        </CardTitle>
        <CardDescription className="text-gray-400">
          Get personalized fitness advice and motivation
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow overflow-hidden">
        <div className="space-y-4 h-60 overflow-y-auto custom-scrollbar pr-2 pb-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-purple-800 text-white rounded-tr-none"
                    : "bg-gray-800 text-gray-100 rounded-tl-none"
                }`}
              >
                <div className="flex items-center mb-1">
                  {message.role === "assistant" ? (
                    <Bot className="h-4 w-4 mr-2 text-purple-400" />
                  ) : (
                    <User className="h-4 w-4 mr-2 text-blue-400" />
                  )}
                  <span className="text-xs font-medium">
                    {message.role === "user" ? "You" : "AI Coach"}
                  </span>
                </div>
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-800 text-white rounded-lg rounded-tl-none p-3 max-w-[80%]">
                <div className="flex items-center">
                  <Bot className="h-4 w-4 mr-2 text-purple-400" />
                  <span className="text-xs font-medium">AI Coach</span>
                </div>
                <div className="flex space-x-1 mt-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="border-t border-gray-800 pt-3 space-y-3">
        <div className="flex gap-2 w-full">
          <Button 
            variant="outline"
            size="sm"
            className="text-xs bg-transparent border-gray-700 hover:bg-gray-800"
            onClick={handleAskForTip}
          >
            Fitness Tip
          </Button>
          <Button 
            variant="outline"
            size="sm"
            className="text-xs bg-transparent border-gray-700 hover:bg-gray-800"
            onClick={handleAskForMotivation}
          >
            Motivate Me
          </Button>
        </div>
        
        <div className="flex w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask your AI coach..."
            className="flex-grow bg-gray-900 border border-gray-700 rounded-l p-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isTyping}
            className="bg-purple-900 hover:bg-purple-700 rounded-l-none"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AiCoach;
