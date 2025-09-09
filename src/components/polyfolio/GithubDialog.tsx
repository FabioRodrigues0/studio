'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Github, Star, GitFork } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GithubDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const mockRepos = [
  {
    name: 'polyfolio',
    description: 'This very 3D portfolio!',
    stars: 128,
    forks: 12,
  },
  {
    name: 'react-babylon-starter',
    description: 'A starter kit for React and Babylon.js projects.',
    stars: 256,
    forks: 34,
  },
  {
    name: 'ai-design-tool',
    description: 'An experimental AI-powered design assistant.',
    stars: 512,
    forks: 55,
  },
];

export function GithubDialog({ isOpen, onOpenChange }: GithubDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-background/80 backdrop-blur-sm">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src="https://picsum.photos/100/100"
                data-ai-hint="male avatar"
              />
              <AvatarFallback>PF</AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="text-2xl font-headline">
                Polyfolio Master
              </DialogTitle>
              <DialogDescription className="text-md">
                UX Designer & Creative Developer
              </DialogDescription>
              <Button variant="link" asChild className="p-0 h-auto">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </a>
              </Button>
            </div>
          </div>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <h3 className="font-semibold text-lg font-headline">
            Pinned Repositories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockRepos.map((repo) => (
              <div
                key={repo.name}
                className="border rounded-lg p-4 bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <h4 className="font-bold text-foreground">{repo.name}</h4>
                <p className="text-sm text-muted-foreground mt-1 mb-2 h-10">
                  {repo.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-accent" />
                    {repo.stars}
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="h-3 w-3 text-accent" />
                    {repo.forks}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
