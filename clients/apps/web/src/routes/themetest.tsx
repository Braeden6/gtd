import { createFileRoute } from '@tanstack/react-router'
import React, { useState } from 'react';
import { Button } from '@gtd/shared/src/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@gtd/shared/src/components/ui/card';
import { Badge } from '@gtd/shared/src/components/ui/badge';
import { Input } from '@gtd/shared/src/components/ui/input';
import { Label } from '@gtd/shared/src/components/ui/label';
import { Switch } from '@gtd/shared/src/components/ui/switch';
import { Slider } from '@gtd/shared/src/components/ui/slider';
import { Progress } from '@gtd/shared/src/components/ui/progress';
import { Separator } from '@gtd/shared/src/components/ui/separator';
import { Avatar, AvatarFallback } from '@gtd/shared/src/components/ui/avatar';
import { Calendar } from '@gtd/shared/src/components/ui/calendar';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@gtd/shared/src/components/ui/select';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@gtd/shared/src/components/ui/dropdown-menu';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@gtd/shared/src/components/ui/accordion';

export const Route = createFileRoute('/themetest')({
  component: RouteComponent,
})

function RouteComponent() {
  const [isDark, setIsDark] = useState(false);
  const [sliderValue, setSliderValue] = useState([50]);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const colorTokens = [
    { name: 'Background', class: 'bg-background text-foreground' },
    { name: 'Card', class: 'bg-card text-card-foreground' },
    { name: 'Popover', class: 'bg-popover text-popover-foreground' },
    { name: 'Primary', class: 'bg-primary text-primary-foreground' },
    { name: 'Secondary', class: 'bg-secondary text-secondary-foreground' },
    { name: 'Muted', class: 'bg-muted text-muted-foreground' },
    { name: 'Accent', class: 'bg-accent text-accent-foreground' },
    { name: 'Destructive', class: 'bg-destructive text-destructive-foreground' },
    { name: 'Success', class: 'bg-success text-success-foreground' },
    { name: 'Warning', class: 'bg-warning text-warning-foreground' },
    { name: 'Info', class: 'bg-info text-info-foreground' },
  ];

  const chartColors = [
    { name: 'Chart 1', class: 'bg-chart-1' },
    { name: 'Chart 2', class: 'bg-chart-2' },
    { name: 'Chart 3', class: 'bg-chart-3' },
    { name: 'Chart 4', class: 'bg-chart-4' },
    { name: 'Chart 5', class: 'bg-chart-5' },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Theme Viewer</h1>
            <p className="text-muted-foreground">
              Test your light and dark theme configurations
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="theme-toggle">Dark Mode</Label>
            <Switch
              id="theme-toggle"
              checked={isDark}
              onCheckedChange={toggleTheme}
            />
          </div>
        </div>

        {/* Typography Section */}
        <Card>
        <CardHeader>
            <CardTitle>Typography</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
            <h1 className="text-4xl font-bold">Heading 1</h1>
            <h2 className="text-3xl font-semibold">Heading 2</h2>
            <h3 className="text-2xl font-medium">Heading 3</h3>
            <h4 className="text-xl">Heading 4</h4>
            <p className="text-base">Body text - regular paragraph content</p>
            <p className="text-sm text-muted-foreground">Small text - muted foreground</p>
            <p className="text-xs">Extra small text</p>
            </div>
        </CardContent>
        </Card>

        {/* Color Tokens Grid */}
        <Card>
          <CardHeader>
            <CardTitle>Color Tokens</CardTitle>
            <CardDescription>
              All theme color tokens with their foreground text
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {colorTokens.map((token) => (
                <div
                  key={token.name}
                  className={`rounded-lg border p-4 text-center ${token.class}`}
                >
                  <div className="text-sm font-medium">{token.name}</div>
                  <div className="text-xs opacity-75">Sample Text</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chart Colors */}
        <Card>
          <CardHeader>
            <CardTitle>Chart Colors</CardTitle>
            <CardDescription>Chart color palette</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-4">
              {chartColors.map((color) => (
                <div key={color.name} className="text-center">
                  <div className={`h-16 w-full rounded-lg ${color.class}`} />
                  <div className="mt-2 text-sm font-medium">{color.name}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Component Showcase */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Buttons & Badges */}
          <Card>
            <CardHeader>
              <CardTitle>Buttons & Badges</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Form Elements */}
          <Card>
            <CardHeader>
              <CardTitle>Form Elements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <Label>Select Option</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Slider Value: {sliderValue[0]}</Label>
                <Slider
                  value={sliderValue}
                  onValueChange={setSliderValue}
                  max={100}
                  step={1}
                />
              </div>
            </CardContent>
          </Card>

          {/* Progress & Status */}
          <Card>
            <CardHeader>
              <CardTitle>Progress & Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Progress</Label>
                <Progress value={33} />
              </div>
              <div className="space-y-2">
                <Label>Status Indicators</Label>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-success" />
                    <span className="text-sm">Success</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-warning" />
                    <span className="text-sm">Warning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-destructive" />
                    <span className="text-sm">Error</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-info" />
                    <span className="text-sm">Info</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Elements */}
          <Card>
            <CardHeader>
              <CardTitle>Interactive Elements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-muted-foreground">john@example.com</p>
                </div>
              </div>
              <Separator />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Open Menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>
        </div>

        {/* Accordion Example */}
        <Card>
          <CardHeader>
            <CardTitle>Accordion</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Theme Configuration</AccordionTrigger>
                <AccordionContent>
                  This theme uses OKLCH color space for better perceptual uniformity
                  and supports both light and dark modes with consistent contrast ratios.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Color Tokens</AccordionTrigger>
                <AccordionContent>
                  All colors are defined as CSS custom properties that automatically
                  adapt to the current theme mode.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Component Testing</AccordionTrigger>
                <AccordionContent>
                  This page demonstrates how all components look with the current
                  theme configuration.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Border & Ring Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Borders & Focus States</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border p-4">
                <p className="text-sm font-medium">Default Border</p>
                <p className="text-xs text-muted-foreground">border class</p>
              </div>
              <div className="rounded-lg border-2 border-primary p-4">
                <p className="text-sm font-medium">Primary Border</p>
                <p className="text-xs text-muted-foreground">border-primary</p>
              </div>
              <div className="rounded-lg border-2 border-dashed p-4">
                <p className="text-sm font-medium">Dashed Border</p>
                <p className="text-xs text-muted-foreground">border-dashed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}