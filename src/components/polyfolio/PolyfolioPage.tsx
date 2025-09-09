'use client';

import React, { useState, useCallback } from 'react';
import OfficeScene from './OfficeScene';
import { Controls } from './Controls';
import { GithubDialog } from './GithubDialog';

export default function PolyfolioPage() {
  const [activeCamera, setActiveCamera] = useState<
    'third-person' | 'first-person'
  >('third-person');
  const [hoveredObject, setHoveredObject] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isGithubOpen, setIsGithubOpen] = useState(false);

  const handleObjectHover = useCallback(
    (
      info: { id: string; name: string; type: 'tech' | 'hobby' | 'cert' } | null
    ) => {
      setHoveredObject(info);
    },
    []
  );

  const handlePCClick = useCallback(() => {
    setIsGithubOpen(true);
  }, []);

  const handleCameraChange = useCallback(
    (cam: 'third-person' | 'first-person') => {
      setActiveCamera(cam);
    },
    []
  );

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-background">
      <OfficeScene
        activeCamera={activeCamera}
        onObjectHover={handleObjectHover}
        onPCClick={handlePCClick}
      />
      <Controls
        activeCamera={activeCamera}
        onCameraChange={handleCameraChange}
        hoveredObjectName={hoveredObject?.name || null}
      />
      <GithubDialog isOpen={isGithubOpen} onOpenChange={setIsGithubOpen} />
    </main>
  );
}
