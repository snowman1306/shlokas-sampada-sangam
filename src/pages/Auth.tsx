import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, HelpCircle } from "lucide-react";

const Auth = () => {
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
              <div className="space-y-2">
                <Label htmlFor="email">ईमेल / Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">पासवर्ड / Password</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
              <Button className="w-full bg-primary">
                लॉगिन करें / Login
              </Button>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">नाम / Name</Label>
                <Input id="name" placeholder="आपका नाम / Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-signup">ईमेल / Email</Label>
                <Input id="email-signup" type="email" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">जन्म तिथि / Date of Birth</Label>
                <Input id="dob" type="date" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state">राज्य / State</Label>
                  <Input id="state" placeholder="State" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">शहर / City</Label>
                  <Input id="city" placeholder="City" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-signup">पासवर्ड / Password</Label>
                <Input id="password-signup" type="password" placeholder="••••••••" />
              </div>
              <Button className="w-full bg-primary">
                साइन अप करें / Sign Up
              </Button>
            </TabsContent>
          </Tabs>

          {/* Footer Links */}
          <div className="flex justify-center gap-4 mt-6 pt-6 border-t">
            <Button variant="ghost" size="sm" className="gap-2">
              <Shield className="h-4 w-4" />
              Privacy
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <HelpCircle className="h-4 w-4" />
              Help
            </Button>
          </div>

          {/* Email Guide Link */}
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground mb-2">
              ईमेल कैसे बनाएं? / How to create email?
            </p>
            <Button variant="link" className="text-primary">
              गाइड देखें / View Guide
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
