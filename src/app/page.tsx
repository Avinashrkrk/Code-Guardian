import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUser } from "../actions/user-actions";

export default function TestPage() {
  // We removed the direct call to createUser() from here.
  // Now, it will only be called when the form below is submitted.

  return (
    <div className="min-h-screen bg-background text-foreground p-8 space-y-8 max-w-4xl mx-auto">
      <section>
        <h1 className="text-4xl font-bold">Code Guardian</h1>
        <p className="text-lg text-muted-foreground mt-2">
          A demonstration of Next.js features and components.
        </p>
      </section>

      {/* --- Server Action Form --- */}
      <section>
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Create a User</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Clicking this button will trigger a Server Action to create a
              hard-coded user ('John', 30, 'john@example.com') in the
              database.
            </p>
            {/* This form will call the createUser Server Action */}
            <form action={createUser}>
              <Button type="submit">Create User</Button>
            </form>
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-wrap gap-4">
        <Button variant="default">Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="outline">Outline Button</Button>
        <Button variant="destructive">Destructive</Button>
      </section>

      <section className="max-w-md">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>
      </section>
    </div>
  );
}

