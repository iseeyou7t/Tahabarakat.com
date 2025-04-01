
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, UserCog } from "lucide-react";

// Owner credentials for demo purposes
const OWNER_USERNAME = "taha";
const OWNER_PASSWORD = "1234";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof formSchema>;

const OwnerLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    setIsLoading(true);
    
    // Simulate a network request
    setTimeout(() => {
      if (values.username === OWNER_USERNAME && values.password === OWNER_PASSWORD) {
        // Set owner authentication in localStorage
        localStorage.setItem("ownerAuthenticated", "true");
        toast({
          title: "Owner Login Successful",
          description: "Welcome to the owner dashboard",
          variant: "default",
        });
        navigate("/owner/dashboard");
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid owner credentials",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Owner Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the owner dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <div className="flex items-center border rounded-md px-3 focus-within:ring-2 focus-within:ring-ring">
                        <UserCog className="w-5 h-5 text-muted-foreground mr-2" />
                        <Input
                          placeholder="Enter owner username"
                          className="border-0 focus-visible:ring-0 p-0"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="flex items-center border rounded-md px-3 focus-within:ring-2 focus-within:ring-ring">
                        <Lock className="w-5 h-5 text-muted-foreground mr-2" />
                        <Input
                          type="password"
                          placeholder="Enter owner password"
                          className="border-0 focus-visible:ring-0 p-0"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="text-xs text-muted-foreground text-center">
            Owner access has full control over all website settings and admin accounts.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OwnerLogin;
