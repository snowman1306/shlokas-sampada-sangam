import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, HelpCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const signupSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  state: z.string().trim().min(2, "State is required"),
  city: z.string().trim().min(2, "City is required"),
});

const loginSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(6, "Password is required"),
});


const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Signup state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const validated = loginSchema.parse({ email: loginEmail, password: loginPassword });
      
      const { error } = await supabase.auth.signInWithPassword({
        email: validated.email,
        password: validated.password,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "लॉगिन विफल / Login Failed",
          description: error.message,
        });
      } else {
        toast({
          title: "स्वागत है / Welcome!",
          description: "Successfully logged in",
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          variant: "destructive",
          title: "त्रुटि / Error",
          description: error.errors[0].message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const validated = signupSchema.parse({
        name: signupName,
        email: signupEmail,
        password: signupPassword,
        dateOfBirth,
        state,
        city,
      });

      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email: validated.email,
        password: validated.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            name: validated.name,
          }
        }
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "साइन अप विफल / Signup Failed",
          description: error.message,
        });
      } else if (data.user) {
        // Update profile with additional info
        await supabase
          .from('profiles')
          .update({
            state: validated.state,
            city: validated.city,
            date_of_birth: validated.dateOfBirth,
          })
          .eq('id', data.user.id);

        toast({
          title: "सफलता / Success!",
          description: "Account created successfully. Logging you in...",
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          variant: "destructive",
          title: "त्रुटि / Error",
          description: error.errors[0].message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-natural flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Language Selector */}
        <div className="flex justify-end mb-4">
          <LanguageSelector />
        </div>

        <Card className="p-8">
          {/* Logo/Brand */}
          <div className="text-center mb-6">
            <div className="h-16 w-16 mx-auto rounded-full bg-gradient-cultural flex items-center justify-center mb-3">
              <span className="text-white font-bold text-2xl">कृ</span>
            </div>
            <h1 className="text-2xl font-bold">किसान सेवा</h1>
            <p className="text-muted-foreground">Farmer Portal</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">लॉगिन / Login</TabsTrigger>
              <TabsTrigger value="signup">साइन अप / Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">ईमेल / Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your@email.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">पासवर्ड / Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-primary" disabled={isLoading}>
                  {isLoading ? "..." : "लॉगिन करें / Login"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">नाम / Name</Label>
                  <Input 
                    id="name" 
                    placeholder="आपका नाम / Your name"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-signup">ईमेल / Email</Label>
                  <Input 
                    id="email-signup" 
                    type="email" 
                    placeholder="your@email.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">जन्म तिथि / Date of Birth</Label>
                  <Input 
                    id="dob" 
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">राज्य / State</Label>
                    <Input 
                      id="state" 
                      placeholder="State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">शहर / City</Label>
                    <Input 
                      id="city" 
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signup">पासवर्ड / Password</Label>
                  <Input 
                    id="password-signup" 
                    type="password" 
                    placeholder="••••••••"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-primary" disabled={isLoading}>
                  {isLoading ? "..." : "साइन अप करें / Sign Up"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {/* Help Resources */}
          <div className="mt-6 pt-6 border-t space-y-4">
            <div className="bg-secondary/20 rounded-lg p-4">
              <h3 className="font-semibold mb-3 text-center">
                📚 सहायता संसाधन / Help Resources
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="gap-2 h-auto py-3 flex-col">
                  <Shield className="h-5 w-5" />
                  <span className="text-xs">Privacy / गोपनीयता</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-2 h-auto py-3 flex-col">
                  <HelpCircle className="h-5 w-5" />
                  <span className="text-xs">FAQs / प्रश्न</span>
                </Button>
              </div>
            </div>

            {/* Email Guide Link */}
            <div className="bg-primary/10 rounded-lg p-4 text-center">
              <p className="text-sm font-medium mb-2">
                ईमेल कैसे बनाएं? / How to create email?
              </p>
              <Button variant="default" size="sm" className="w-full">
                📖 गाइड देखें / View Guide
              </Button>
            </div>

            {/* Contact Support */}
            <div className="text-center">
              <Button variant="link" className="text-primary gap-2">
                📞 सहायता के लिए संपर्क करें / Contact for Help
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
