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
}

export function Controls({
  activeCamera,
  onCameraChange,
}: ControlsProps) {
  return (
    <Card className="absolute top-4 left-4 w-72 bg-background/80 backdrop-blur-sm shadow-lg">
      <CardContent className="p-4">
        <div>
          <RadioGroup
            value={activeCamera}
            onValueChange={(value) =>
              onCameraChange(value as 'third-person' | 'first-person')
            }
            className="grid grid-cols-2 gap-2"
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
      </CardContent>
    </Card>
  );
}
