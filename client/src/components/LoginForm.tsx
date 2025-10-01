import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto h-16 w-16 bg-primary rounded-md flex items-center justify-center mb-4">
            <span className="text-primary-foreground font-bold text-2xl">S</span>
          </div>
          <CardTitle className="text-2xl">SMARTRI Information Data Management Center</CardTitle>
          <p className="text-muted-foreground text-sm mt-2">Sign in to access the portal</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                data-testid="input-username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                data-testid="input-password"
              />
            </div>
            <Button type="submit" className="w-full" data-testid="button-login">
              Sign In
            </Button>
          </form>
          <div className="mt-6 p-4 bg-muted rounded-md">
            <p className="text-xs text-muted-foreground text-center mb-2">Demo Credentials:</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="font-semibold">User (View Only):</p>
                <p className="text-muted-foreground">user / user</p>
              </div>
              <div>
                <p className="font-semibold">Admin (Full Access):</p>
                <p className="text-muted-foreground">admin / admin123</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
