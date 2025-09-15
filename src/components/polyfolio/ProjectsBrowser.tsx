
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Folder, File } from 'lucide-react';
import projects from '@/app/data/projects.json';

interface ProjectsBrowserProps {
  onClose: () => void;
}

export function ProjectsBrowser({ onClose }: ProjectsBrowserProps) {
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-6xl h-[90vh] bg-white dark:bg-gray-800 shadow-2xl flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between p-2 border-b dark:border-gray-700 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300 truncate">
            {selectedProject.name} - Project Browser
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <div className="flex flex-grow overflow-hidden">
          <div className="w-64 bg-gray-50 dark:bg-gray-900 border-r dark:border-gray-700 p-2 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-2 flex items-center"><Folder className="w-5 h-5 mr-2"/>Projects</h2>
            <ul>
              {projects.map((project) => (
                <li key={project.name}>
                  <Button
                    variant={selectedProject.name === project.name ? 'secondary' : 'ghost'}
                    className="w-full justify-start mb-1"
                    onClick={() => setSelectedProject(project)}
                  >
                    <File className="w-4 h-4 mr-2" />
                    {project.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          <CardContent className="p-0 flex-grow overflow-y-auto">
            <iframe
              src={selectedProject.url}
              className="w-full h-full border-0"
              title={selectedProject.name}
            />
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
