
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

enum AuthMode {
  SIGN_IN,
  SIGN_UP,
}

const AuthForm = () => {
  const [mode, setMode] = useState<AuthMode>(AuthMode.SIGN_IN);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/dashboard');
      }
    };
    checkSession();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === AuthMode.SIGN_UP) {
        // Sign up
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username,
            },
          },
        });

        if (error) throw error;
        
        toast({
          title: "🎉 Well done! Your account has been created.",
          description: "You may now log in with your credentials.",
          variant: "destructive",
        });
        
        // Switch to sign in mode after successful registration
        setMode(AuthMode.SIGN_IN);

      } else {
        // Sign in
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        
        // Play success sound
        const audio = new Audio("/audio/success.mp3");
        audio.volume = 0.5;
        await audio.play();
        
        toast({
          title: "Welcome back, sorcerer!",
          description: "Your curse technique has been recognized.",
          variant: "destructive",
        });
        
        // Redirect to dashboard
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
      toast({
        title: "Error",
        description: err.message || "Authentication failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="bg-black/70 border border-purple-500/30 shadow-xl backdrop-blur-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-500 to-white inline-block text-transparent bg-clip-text">
              {mode === AuthMode.SIGN_IN ? "DOMAIN ACCESS" : "JOIN THE RANKS"}
            </CardTitle>
            <CardDescription className="text-white/70">
              {mode === AuthMode.SIGN_IN 
                ? "Enter your curse energy signature" 
                : "Register your domain expansion"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-white block">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@domain.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black/50 border-purple-800/50 text-white placeholder:text-gray-500"
                />
              </div>
              
              {mode === AuthMode.SIGN_UP && (
                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium text-white block">
                    Username
                  </label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="sorcerer_name"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-black/50 border-purple-800/50 text-white placeholder:text-gray-500"
                  />
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-white block">
                    Password
                  </label>
                  {mode === AuthMode.SIGN_IN && (
                    <a href="#" className="text-sm text-purple-400 hover:text-purple-300">
                      Forgot password?
                    </a>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-black/50 border-purple-800/50 text-white"
                />
              </div>
              
              {error && (
                <div className="text-red-500 bg-red-950/30 p-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-700 to-purple-800 hover:from-blue-600 hover:to-purple-700 text-white font-extrabold"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : mode === AuthMode.SIGN_IN ? "UNLEASH DOMAIN" : "REGISTER TECHNIQUE"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-white/70">
              {mode === AuthMode.SIGN_IN ? (
                <span>
                  No curse technique yet?{" "}
                  <button 
                    onClick={() => setMode(AuthMode.SIGN_UP)}
                    className="text-purple-400 hover:text-purple-300 font-medium"
                  >
                    Register now
                  </button>
                </span>
              ) : (
                <span>
                  Already a sorcerer?{" "}
                  <button
                    onClick={() => setMode(AuthMode.SIGN_IN)}
                    className="text-purple-400 hover:text-purple-300 font-medium"
                  >
                    Sign in
                  </button>
                </span>
              )}
            </div>
          </CardFooter>
        </Card>
      </motion.div>
      
      {/* Animated background elements */}
      <ParticleBackground />
    </div>
  );
};

// Animated background component
const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-purple-600/20 blur-xl"
          style={{
            width: Math.random() * 300 + 50,
            height: Math.random() * 300 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            zIndex: -1,
          }}
          initial={{
            scale: 0.5,
            opacity: 0.1,
          }}
          animate={{
            scale: [0.5, Math.random() * 0.3 + 0.7, 0.5],
            opacity: [0.1, Math.random() * 0.2 + 0.2, 0.1],
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default AuthForm;
