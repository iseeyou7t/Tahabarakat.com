
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
import { Lock, User } from "lucide-react";

// This is a simple admin authentication for demo purposes
// In a real application, you should use a more secure approach
const ADMIN_USERNAME = "tahabarakat";
const ADMIN_PASSWORD = "taha1234";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof formSchema>;

const AdminLogin = () => {
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
      if (values.username === ADMIN_USERNAME && values.password === ADMIN_PASSWORD) {
        // Set admin authentication in localStorage
        localStorage.setItem("adminAuthenticated", "true");
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard",
          variant: "default",
        });
        navigate("/admin/dashboard");
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid username or password",
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
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the admin dashboard
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
                        <User className="w-5 h-5 text-muted-foreground mr-2" />
                        <Input
                          placeholder="Enter admin username"
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
                          placeholder="Enter admin password"
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
            Note: This is a demo admin area. Use "admin" as username and "password123" as password.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;
