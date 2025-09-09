'use client';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Camera } from 'lucide-react';

interface ControlsProps {
  activeCamera: 'third-person' | 'first-person';
  onCameraChange: (camera: 'third-person' | 'first-person') => void;
  hoveredObjectName: string | null;
}

export function Controls({
  activeCamera,
  onCameraChange,
  hoveredObjectName,
}: ControlsProps) {
  return (
    <Card className="absolute top-4 left-4 w-72 bg-background/80 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold font-headline">
          Polyfolio
        </CardTitle>
        <CardDescription>An Interactive 3D Portfolio</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="font-semibold flex items-center gap-2">
            <Camera className="w-4 h-4" /> Camera View
          </Label>
          <RadioGroup
            value={activeCamera}
            onValueChange={(value) =>
              onCameraChange(value as 'third-person' | 'first-person')
            }
            className="mt-2 grid grid-cols-2 gap-2"
          >
            <Label
              htmlFor="third-person"
              className="flex items-center justify-center space-x-2 rounded-md border p-2 hover:bg-accent/50 has-[input:checked]:bg-accent has-[input:checked]:text-accent-foreground transition-colors cursor-pointer"
            >
              <RadioGroupItem
                value="third-person"
                id="third-person"
                className="sr-only"
              />
              <span>3rd Person</span>
            </Label>
            <Label
              htmlFor="fp"
              className="flex items-center justify-center space-x-2 rounded-md border p-2 hover:bg-accent/50 has-[input:checked]:bg-accent has-[input-checked]:text-accent-foreground transition-colors cursor-pointer"
            >
              <RadioGroupItem
                value="first-person"
                id="fp"
                className="sr-only"
              />
              <span>First Person</span>
            </Label>
          </RadioGroup>
        </div>
        <div className="pt-2 h-12">
          <Label className="font-semibold">Inspecting</Label>
          <p className="text-sm text-primary font-medium mt-1 truncate">
            {hoveredObjectName || '...'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
