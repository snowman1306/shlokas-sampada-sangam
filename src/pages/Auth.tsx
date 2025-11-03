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
