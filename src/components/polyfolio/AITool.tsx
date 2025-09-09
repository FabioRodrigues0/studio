'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  optimizeObjectPlacement,
  type OptimizeObjectPlacementOutput,
} from '@/ai/flows/optimize-object-placement';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  prompt: z
    .string()
    .min(10, 'Please describe in more detail what you want to change.'),
});

const getSceneDescription = (): string => {
  return 'The office has a large desk in the center. On the desk is a computer monitor. To the right of the desk is a tall shelf with several books. On the back wall, there are three certification frames hanging side-by-side. A soccer ball is on the floor in the corner. A movie poster is on the right wall. A cup of popcorn is on the desk.';
};

export function AITool() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<OptimizeObjectPlacementOutput | null>(
    null
  );
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: 'Make the scene feel less cluttered and more professional.',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const environmentDescription = getSceneDescription();
      const aiResult = await optimizeObjectPlacement({
        environmentDescription,
        evaluativePrompt: values.prompt,
      });
      setResult(aiResult);
    } catch (error) {
      console.error('AI optimization failed:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to get optimization suggestion. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return null;
}
