'use client';

import type { Scene, Engine, Vector3, Camera } from '@babylonjs/core';
import {
  Engine as BabylonEngine,
  Scene as BabylonScene,
  Vector3 as BabylonVector3,
  Color3,
  Color4,
  StandardMaterial,
  MeshBuilder,
  Mesh,
  ActionManager,
  ExecuteCodeAction,
  GlowLayer,
  Texture,
  HemisphericLight,
  ArcRotateCamera,
  FreeCamera,
  TargetCamera,
} from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import '@babylonjs/loaders';

import React, { useEffect, useRef } from 'react';
import type { Certification, Hobby, Tech } from '@/lib/constants';
import { certifications, techStack, hobbies } from '@/lib/constants';
import projects from '@/app/data/projects.json';

interface OfficeSceneProps {
  activeCamera: 'third-person' | 'first-person';
  onObjectHover: (
    info: { id: string; type: 'tech' | 'hobby' | 'cert'; name: string } | null
  ) => void;
  onPCClick: () => void;
  isZoomed: boolean;
  setIsZoomed: React.Dispatch<React.SetStateAction<boolean>>;
}

const OfficeScene: React.FC<OfficeSceneProps> = ({
  activeCamera,
  onObjectHover,
  onPCClick,
  isZoomed,
  setIsZoomed,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{ 
    engine: Engine;
    scene: Scene;
    orbitCamera: ArcRotateCamera;
    fpCamera: FreeCamera;
    pcCamera: TargetCamera;
    avatar: Mesh;
  } | null>(null);
  const inputMap = useRef<Record<string, boolean>>({});
  const previousCameraRef = useRef<Camera | null>(null);
  const uiContainerRef = useRef<GUI.Rectangle | null>(null);
  const isZoomedRef = useRef(isZoomed);

  useEffect(() => {
    isZoomedRef.current = isZoomed;
  }, [isZoomed]);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (!sceneRef.current) {
      const engine = new BabylonEngine(canvasRef.current, true);
      const scene = new BabylonScene(engine);
      scene.clearColor = new Color4(235 / 255, 242 / 255, 250 / 255, 1);
      scene.collisionsEnabled = true;

      const light = new HemisphericLight(
        'light',
        new BabylonVector3(0, 1, 0),
        scene
      );
      light.intensity = 1.2;

      const glowLayer = new GlowLayer('glow', scene);
      glowLayer.intensity = 0.5;

      const deskHeight = 2.6;
      const avatarHeight = 6.0 * 1.1;
      const avatarRadius = 0.4;

      const avatar = MeshBuilder.CreateCapsule(
        'avatar',
        { height: avatarHeight, radius: avatarRadius },
        scene
      );
      avatar.position = new BabylonVector3(0, avatarHeight / 2, -8);
      avatar.visibility = 0;
      avatar.isPickable = false; // Prevent blocking clicks in FP
      avatar.checkCollisions = true;
      avatar.ellipsoid = new BabylonVector3(
        avatarRadius,
        avatarHeight / 2,
        avatarRadius
      );
      avatar.ellipsoidOffset = new BabylonVector3(0, 0, 0); // Corrected offset

      const avatarMat = new StandardMaterial('avatarMat', scene);
      avatarMat.diffuseColor = Color3.FromHexString('#4A5568');
      avatarMat.specularColor = new Color3(0.1, 0.1, 0.1);

      const torsoHeight = avatarHeight * 0.7;
      const headRadius = 0.4;

      const torso = MeshBuilder.CreateCylinder(
        'torso',
        { height: torsoHeight, diameter: avatarRadius * 2 },
        scene
      );
      torso.parent = avatar;
      torso.position.y = -(avatarHeight / 2 - torsoHeight / 2);
      torso.material = avatarMat;

      const head = MeshBuilder.CreateSphere(
        'head',
        { diameter: headRadius * 2 },
        scene
      );
      head.parent = avatar;
      head.position.y = torso.position.y + torsoHeight / 2 + headRadius * 0.9;
      head.material = avatarMat;

      const orbitCamera = new ArcRotateCamera(
        'orbitCamera',
        -Math.PI / 2,
        Math.PI / 3,
        10,
        avatar.position,
        scene
      );
      orbitCamera.upperBetaLimit = Math.PI / 2 - 0.1;
      orbitCamera.lowerRadiusLimit = 2;
      orbitCamera.upperRadiusLimit = 20;
      orbitCamera.inputs.remove(orbitCamera.inputs.attached.mousewheel);
      orbitCamera.checkCollisions = true;
      orbitCamera.collisionRadius = new BabylonVector3(0.5, 0.5, 0.5);
      orbitCamera.minZ = 0.1;

      const fpCamera = new FreeCamera(
        'fpCamera',
        new BabylonVector3(0, 1, 0),
        scene
      );
      fpCamera.parent = avatar;
      fpCamera.position.y = (avatarHeight / 2) * 0.8;
      fpCamera.minZ = 0.1;

      const pcCamera = new TargetCamera('pcCamera', BabylonVector3.Zero(), scene);
      pcCamera.minZ = 0.1;

      sceneRef.current = { engine, scene, orbitCamera, fpCamera, pcCamera, avatar };

      scene.actionManager = new ActionManager(scene);
      scene.actionManager.registerAction(
        new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, (evt) => {
          inputMap.current[evt.sourceEvent.key.toLowerCase()] = true;
        })
      );
      scene.actionManager.registerAction(
        new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, (evt) => {
          inputMap.current[evt.sourceEvent.key.toLowerCase()] = false;
        })
      );

      // --- Create scene objects ---
      const woodMat = new StandardMaterial('woodMat', scene);
      woodMat.diffuseColor = new Color3(0.6, 0.4, 0.2);

      const metalMat = new StandardMaterial('metalMat', scene);
      metalMat.diffuseColor = new Color3(0.75, 0.75, 0.75);

      const wallMat = new StandardMaterial('wallMat', scene);
      wallMat.diffuseColor = new Color3(0.95, 0.94, 0.9);

      const roomSize = 28.8 * 1.2;
      const roomHeight = 14.4;

      const floor = MeshBuilder.CreateGround(
        'floor',
        { width: roomSize, height: roomSize },
        scene
      );
      floor.checkCollisions = true;
      const floorMat = new StandardMaterial('floorMat', scene);
      floorMat.diffuseColor = new Color3(0.8, 0.7, 0.55);
      floor.material = floorMat;

      const wallThickness = 0.5;
      const createWall = (
        name: string,
        position: Vector3,
        rotation: Vector3,
        width: number,
        height: number,
        depth: number
      ) => {
        const wall = MeshBuilder.CreateBox(
          name,
          { width, height, depth },
          scene
        );
        wall.position = position;
        wall.rotation = rotation;
        wall.material = wallMat;
        wall.checkCollisions = true;
        return wall;
      };

      const halfRoomSize = roomSize / 2;
      createWall(
        'wall1',
        new BabylonVector3(0, roomHeight / 2, halfRoomSize),
        new BabylonVector3(0, 0, 0),
        roomSize,
        roomHeight,
        wallThickness
      );
      createWall(
        'wall2',
        new BabylonVector3(halfRoomSize, roomHeight / 2, 0),
        new BabylonVector3(0, -Math.PI / 2, 0),
        roomSize,
        roomHeight,
        wallThickness
      );
      createWall(
        'wall3',
        new BabylonVector3(0, roomHeight / 2, -halfRoomSize),
        new BabylonVector3(0, Math.PI, 0),
        roomSize,
        roomHeight,
        wallThickness
      );
      createWall(
        'wall4',
        new BabylonVector3(-halfRoomSize, roomHeight / 2, 0),
        new BabylonVector3(0, Math.PI / 2, 0),
        roomSize,
        roomHeight,
        wallThickness
      );

      const roof = MeshBuilder.CreateBox(
        'roof',
        { width: roomSize, height: wallThickness, depth: roomSize },
        scene
      );
      roof.position = new BabylonVector3(0, roomHeight, 0);
      roof.material = wallMat;
      roof.checkCollisions = true;

      const deskWidth = 8;
      const deskDepth = 3.5;
      const deskPositionZ = halfRoomSize - wallThickness - deskDepth / 2 - 1;

      const deskTop = MeshBuilder.CreateBox(
        'deskTop',
        { width: deskWidth, height: 0.2, depth: deskDepth },
        scene
      );
      deskTop.position = new BabylonVector3(0, deskHeight, deskPositionZ);
      deskTop.material = woodMat;
      deskTop.checkCollisions = true;

      for (let i = 0; i < 4; i++) {
        const leg = MeshBuilder.CreateBox(
          `leg${i}`,
          { width: 0.25, height: deskHeight, depth: 0.25 },
          scene
        );
        leg.position = new BabylonVector3(
          i % 2 === 0 ? deskWidth / 2 - 0.2 : -(deskWidth / 2 - 0.2),
          deskHeight / 2,
          deskPositionZ +
            (i < 2 ? deskDepth / 2 - 0.125 : -(deskDepth / 2 - 0.125))
        );
        leg.material = metalMat;
        leg.checkCollisions = true;
      }

      // Create Monitor
      const monitorBezel = MeshBuilder.CreateBox(
        'monitorBezel',
        { width: 2.2, height: 1.4, depth: 0.1 },
        scene
      );
      monitorBezel.position = new BabylonVector3(
        -2,
        deskHeight + 0.7,
        deskPositionZ
      );
      monitorBezel.material = metalMat;
      monitorBezel.checkCollisions = true;

      const monitorScreen = MeshBuilder.CreatePlane(
        'monitorScreen',
        { width: 2, height: 1.2 },
        scene
      );
      monitorScreen.position = new BabylonVector3(0, 0, -0.06);
      monitorScreen.parent = monitorBezel;
      const monitorScreenMat = new StandardMaterial('monitorScreenMat', scene);
      monitorScreenMat.diffuseColor = Color3.Black();
      monitorScreen.material = monitorScreenMat;

      const monitorStand = MeshBuilder.CreateCylinder(
        'monitorStand',
        { height: 0.6, diameter: 0.2 },
        scene
      );
      monitorStand.position = new BabylonVector3(
        -2,
        deskHeight + 0.3,
        deskPositionZ + 0.2
      );
      monitorStand.material = metalMat;
      monitorStand.checkCollisions = true;

      // Create PC Tower
      const pcTower = MeshBuilder.CreateBox(
        'pcTower',
        { width: 0.8, height: 2.5, depth: 2 },
        scene
      );
      pcTower.position = new BabylonVector3(
        2,
        deskHeight + 1.25,
        deskPositionZ
      );
      pcTower.material = metalMat;
      pcTower.checkCollisions = true;

      const createCertificationFrame = (
        cert: Certification,
        position: Vector3
      ) => {
        const frame = MeshBuilder.CreateBox(
          cert.id,
          { width: 2.5, height: 1.8, depth: 0.1 },
          scene
        );
        frame.position = position;
        const frameMat = new StandardMaterial(`${cert.id}-mat`, scene);
        frameMat.diffuseColor = new Color3(0.2, 0.2, 0.2);
        frame.material = frameMat;

        frame.actionManager = new ActionManager(scene);
        frame.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnPickTrigger, () => {
            window.open(cert.link, '_blank');
          })
        );
        frame.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, () => {
            onObjectHover({ id: cert.id, type: 'cert', name: cert.title });
            glowLayer.addIncludedOnlyMesh(frame);
          })
        );
        frame.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, () => {
            onObjectHover(null);
            glowLayer.removeIncludedOnlyMesh(frame);
          })
        );
      };

      certifications.forEach((cert, i) => {
        createCertificationFrame(
          cert,
          new BabylonVector3(
            -6 + i * 6,
            deskHeight + 3.5,
            halfRoomSize - wallThickness - 0.1
          )
        );
      });

      const bookshelfHeight = 8;
      const bookshelfWidth = 5;
      const bookshelfDepth = 1.2;
      const shelfThickness = 0.2;
      const bookshelfPosition = new BabylonVector3(
        deskWidth / 2 + 2.5 + bookshelfWidth / 2,
        bookshelfHeight / 2,
        deskPositionZ + 1
      );

      const bookshelf = new Mesh('bookshelf', scene);
      bookshelf.position = bookshelfPosition;

      const bookshelfBack = MeshBuilder.CreateBox(
        'bookshelfBack',
        {
          width: bookshelfWidth,
          height: bookshelfHeight,
          depth: shelfThickness,
        },
        scene
      );
      bookshelfBack.parent = bookshelf;
      bookshelfBack.position.z = -bookshelfDepth / 2 + shelfThickness / 2;
      bookshelfBack.material = woodMat;
      bookshelfBack.checkCollisions = true;

      const bookshelfLeft = MeshBuilder.CreateBox(
        'bookshelfLeft',
        {
          width: shelfThickness,
          height: bookshelfHeight,
          depth: bookshelfDepth,
        },
        scene
      );
      bookshelfLeft.parent = bookshelf;
      bookshelfLeft.position.x = -bookshelfWidth / 2 + shelfThickness / 2;
      bookshelfLeft.material = woodMat;
      bookshelfLeft.checkCollisions = true;

      const bookshelfRight = MeshBuilder.CreateBox(
        'bookshelfRight',
        {
          width: shelfThickness,
          height: bookshelfHeight,
          depth: bookshelfDepth,
        },
        scene
      );
      bookshelfRight.parent = bookshelf;
      bookshelfRight.position.x = bookshelfWidth / 2 - shelfThickness / 2;
      bookshelfRight.material = woodMat;
      bookshelfRight.checkCollisions = true;

      const numShelves = 4;
      for (let i = 0; i < numShelves; i++) {
        const shelfY =
          (bookshelfHeight / (numShelves + 1)) * (i + 1) - bookshelfHeight / 2;
        const shelf = MeshBuilder.CreateBox(
          `bookshelf_shelf_${i}`,
          {
            width: bookshelfWidth - shelfThickness * 2,
            height: shelfThickness,
            depth: bookshelfDepth,
          },
          scene
        );
        shelf.parent = bookshelf;
        shelf.position.y = shelfY;
        shelf.material = woodMat;
        shelf.checkCollisions = true;

        if (i === 1) {
          techStack.forEach((tech, j) => {
            const book = MeshBuilder.CreateBox(
              tech.id,
              { width: 0.4, height: 1.2, depth: 1 },
              scene
            );
            book.parent = shelf;
            const bookPosition = new BabylonVector3(
              -bookshelfWidth / 2 + 0.8 + j * 0.5,
              shelfThickness / 2 + 0.6,
              0
            );
            book.position = bookPosition;
            const bookMat = new StandardMaterial(`${tech.id}-mat`, scene);
            bookMat.diffuseColor = Color3.Random();
            book.material = bookMat;
            book.actionManager = new ActionManager(scene);
            book.actionManager.registerAction(
              new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, () => {
                onObjectHover({ id: tech.id, type: 'tech', name: tech.name });
                glowLayer.addIncludedOnlyMesh(book);
              })
            );
            book.actionManager.registerAction(
              new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, () => {
                onObjectHover(null);
                glowLayer.removeIncludedOnlyMesh(book);
              })
            );
          });
        }
      }

      const addInteraction = (
        mesh: Mesh,
        item: Hobby | Tech | Certification,
        type: 'hobby' | 'tech' | 'cert'
      ) => {
        mesh.actionManager = new ActionManager(scene);
        mesh.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, () => {
            onObjectHover({
              id: item.id,
              type,
              name: (item as any).title || item.name,
            });
            glowLayer.addIncludedOnlyMesh(mesh);
          })
        );
        mesh.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, () => {
            onObjectHover(null);
            glowLayer.removeIncludedOnlyMesh(mesh);
          })
        );
      };

      const soccerBall = MeshBuilder.CreateSphere(
        hobbies[0].id,
        { diameter: 1.2 },
        scene
      );
      soccerBall.position = new BabylonVector3(-8, 0.6, -8);
      const soccerMat = new StandardMaterial('soccerMat', scene);
      soccerMat.diffuseTexture = new Texture(
        'https://img.freepik.com/free-vector/football-ball-realistic-3d-icon-isolated-white-background_165488-3204.jpg',
        scene
      );
      soccerBall.material = soccerMat;
      addInteraction(soccerBall, hobbies[0], 'hobby');

      const moviePoster = MeshBuilder.CreatePlane(
        hobbies[1].id,
        { width: 2.5, height: 3.5 },
        scene
      );
      moviePoster.position = new BabylonVector3(
        -halfRoomSize + wallThickness,
        5,
        4
      );
      moviePoster.rotation.y = Math.PI / 2;
      const posterMat = new StandardMaterial('posterMat', scene);
      posterMat.diffuseTexture = new Texture(
        'https://www.themoviedb.org/t/p/original/f89JAYsftDPZH8BJ8dY5VM7GSCq.jpg',
        scene
      );
      moviePoster.material = posterMat;
      addInteraction(moviePoster, hobbies[1], 'hobby');

      const popcornCup = MeshBuilder.CreateCylinder(
        hobbies[2].id,
        { height: 1, diameterTop: 0.8, diameterBottom: 0.6 },
        scene
      );
      popcornCup.position = new BabylonVector3(
        2.5,
        deskHeight + 0.5,
        deskPositionZ
      );
      const popcornMat = new StandardMaterial('popcornMat', scene);
      const popcornTexture = new Texture(
        'https://www.the3dstudio.com/textures/19/9606-popcorn-texture.jpg',
        scene
      );
      popcornMat.diffuseTexture = popcornTexture;
      popcornCup.material = popcornMat;
      addInteraction(popcornCup, hobbies[2], 'hobby');

      for (let i = 0; i < 20; i++) {
        const kernel = MeshBuilder.CreateSphere(
          `kernel${i}`,
          { diameter: 0.2 },
          scene
        );
        kernel.parent = popcornCup;
        kernel.position = new BabylonVector3(
          Math.random() * 0.3 - 0.15,
          Math.random() * 0.2 + 0.4,
          Math.random() * 0.3 - 0.15
        );
        const kernelMat = new StandardMaterial(`kernelMat${i}`, scene);
        kernelMat.diffuseColor =
          Math.random() > 0.5 ? Color3.White() : Color3.Yellow();
        kernel.material = kernelMat;
      }

      const deskBarrier = MeshBuilder.CreateBox(
        'deskBarrier',
        { width: deskWidth + 1, height: roomHeight, depth: deskDepth + 1 },
        scene
      );
      deskBarrier.position = new BabylonVector3(
        0,
        roomHeight / 2,
        deskPositionZ
      );
      deskBarrier.visibility = 0;
      deskBarrier.checkCollisions = true;
      deskBarrier.isPickable = false;

      const bookshelfBarrier = MeshBuilder.CreateBox(
        'bookshelfBarrier',
        {
          width: bookshelfWidth + 1,
          height: roomHeight,
          depth: bookshelfDepth + 1,
        },
        scene
      );
      bookshelfBarrier.position = new BabylonVector3(
        bookshelfPosition.x,
        roomHeight / 2,
        bookshelfPosition.z
      );
      bookshelfBarrier.visibility = 0;
      bookshelfBarrier.checkCollisions = true;
      bookshelfBarrier.isPickable = false;

      // Add interaction to the whole PC
      const assignPCClickAction = (mesh: Mesh) => {
        mesh.actionManager = new ActionManager(scene);
        mesh.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnPickTrigger, () => {
            const { avatar } = sceneRef.current!;
            const distance = BabylonVector3.Distance(
              avatar.getAbsolutePosition(),
              mesh.getAbsolutePosition()
            );
            if (distance < 8) {
              onPCClick();
            } else {
              console.log('You are too far to interact with the PC.');
            }
          })
        );
      };
      assignPCClickAction(monitorScreen);
      assignPCClickAction(pcTower);
      assignPCClickAction(monitorBezel);

      // --- GUI for Monitor Screen ---
      const advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(
        monitorScreen,
        1024,
        576,
        false // No pointer events on the texture itself
      );

      const uiContainer = new GUI.Rectangle('ui-container');
      uiContainer.thickness = 0;
      uiContainer.isVisible = false;
      advancedTexture.addControl(uiContainer);
      uiContainerRef.current = uiContainer;

      const projectsBrowser = new GUI.Rectangle('projects-browser');
      projectsBrowser.width = '100%';
      projectsBrowser.height = '100%';
      projectsBrowser.cornerRadius = 10;
      projectsBrowser.color = '#333';
      projectsBrowser.thickness = 4;
      projectsBrowser.background = '#1a1a1a';
      uiContainer.addControl(projectsBrowser);

      const titleBar = new GUI.Rectangle('title-bar');
      titleBar.width = '100%';
      titleBar.height = '60px';
      titleBar.background = '#444';
      titleBar.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
      projectsBrowser.addControl(titleBar);

      const title = new GUI.TextBlock('title', "Fabio's Projects");
      title.color = 'white';
      title.fontSize = 24;
      titleBar.addControl(title);

      const closeButton = GUI.Button.CreateSimpleButton('close-button', 'X');
      closeButton.width = '40px';
      closeButton.height = '40px';
      closeButton.color = 'white';
      closeButton.background = '#d9534f';
      closeButton.cornerRadius = 5;
      closeButton.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
      closeButton.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
      closeButton.left = '-10px';
      closeButton.top = '10px';
      closeButton.onPointerUpObservable.add(() => {
        setIsZoomed(false);
      });
      titleBar.addControl(closeButton);

      const grid = new GUI.Grid();
      grid.paddingTop = '60px'; // leave space for title bar
      projectsBrowser.addControl(grid);

      grid.addColumnDefinition(250, true); // width in pixels
      grid.addColumnDefinition(1, false); // relative width

      const projectsList = new GUI.ScrollViewer('projects-list');
      projectsList.background = '#2a2a2a';
      grid.addControl(projectsList, 0, 0);

      const projectsListPanel = new GUI.StackPanel();
      projectsList.addControl(projectsListPanel);

      const webViewer = new GUI.Rectangle('web-viewer');
      webViewer.background = 'white';
      webViewer.thickness = 0;
      grid.addControl(webViewer, 0, 1);

      const placeholderText = new GUI.TextBlock(
        'placeholder',
        'Select a project to view'
      );
      placeholderText.color = 'black';
      webViewer.addControl(placeholderText);

      projects.forEach((project) => {
        const button = GUI.Button.CreateSimpleButton(project.id, project.name);
        button.height = '50px';
        button.width = '95%';
        button.color = 'white';
        button.background = '#555';
        button.paddingTop = '5px';
        button.paddingBottom = '5px';
        button.onPointerUpObservable.add(() => {
          const textControl = webViewer.children[0] as GUI.TextBlock;
          textControl.text = `Loading ${project.name}...\n\n(Live web view is not supported in this demo)`;
        });
        projectsListPanel.addControl(button);
      });

      const playerSpeed = 0.1;

      engine.runRenderLoop(() => {
        const { avatar, orbitCamera, fpCamera } = sceneRef.current!;
        const camera = scene.activeCamera!;

        let forward = BabylonVector3.Zero();
        if (camera) {
          forward = camera.getDirection(BabylonVector3.Forward());
          forward.y = 0;
          forward.normalize();
        }

        let right = new BabylonVector3(forward.z, 0, -forward.x);

        const moveDirection = BabylonVector3.Zero();

        if (inputMap.current['w']) {
          moveDirection.addInPlace(forward);
        }
        if (inputMap.current['s']) {
          moveDirection.subtractInPlace(forward);
        }
        if (inputMap.current['a']) {
          moveDirection.subtractInPlace(right);
        }
        if (inputMap.current['d']) {
          moveDirection.addInPlace(right);
        }

        if (moveDirection.lengthSquared() > 0) {
          moveDirection.normalize();
          avatar.moveWithCollisions(moveDirection.scale(playerSpeed));
        }
        // Apply gravity
        avatar.moveWithCollisions(new BabylonVector3(0, -0.5, 0));

        if (scene.activeCamera === fpCamera) {
          avatar.rotation.y = fpCamera.rotation.y;
        }

        if (scene.activeCamera === orbitCamera && orbitCamera && !isZoomedRef.current) {
          orbitCamera.target.copyFrom(avatar.position);
          orbitCamera.target.y += avatarHeight * 0.4;
        }

        scene.render();
      });

      const handleResize = () => engine.resize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        scene.dispose();
        engine.dispose();
      };
    }
  }, []);

  useEffect(() => {
    if (!sceneRef.current || !canvasRef.current) return;

    const { scene, orbitCamera, fpCamera, avatar, engine } = sceneRef.current;

    if (activeCamera === 'first-person') {
      if (scene.activeCamera !== fpCamera) {
        scene.activeCamera?.detachControl();
        scene.activeCamera = fpCamera;
        avatar.getChildMeshes().forEach((m) => (m.isVisible = false));
        setTimeout(() => fpCamera.attachControl(canvasRef.current, true), 50);
      }
    } else {
      // 'third-person'
      if (scene.activeCamera !== orbitCamera) {
        scene.activeCamera?.detachControl();
        scene.activeCamera = orbitCamera;
        avatar.getChildMeshes().forEach((m) => (m.isVisible = true));
        setTimeout(() => orbitCamera.attachControl(canvasRef.current, true), 50);
      }
    }
  }, [activeCamera]);

  useEffect(() => {
    if (!sceneRef.current || !canvasRef.current) return;
    const { scene, pcCamera, orbitCamera, fpCamera } = sceneRef.current;

    if (isZoomed) {
      if (!previousCameraRef.current) {
        previousCameraRef.current = scene.activeCamera;
      }
      scene.activeCamera?.detachControl();

      const monitorScreen = scene.getMeshByName('monitorScreen');
      if (monitorScreen) {
        const targetPosition = monitorScreen.getAbsolutePosition();
        const cameraPosition = new BabylonVector3(targetPosition.x, targetPosition.y, targetPosition.z - 3);
        pcCamera.position = cameraPosition;
        pcCamera.setTarget(targetPosition);
      }

      scene.activeCamera = pcCamera;
      if (uiContainerRef.current) uiContainerRef.current.isVisible = true;

    } else {
      if (previousCameraRef.current) {
        if (uiContainerRef.current) uiContainerRef.current.isVisible = false;
        scene.activeCamera = previousCameraRef.current;
        
        if(previousCameraRef.current === orbitCamera) {
            orbitCamera.attachControl(canvasRef.current, true);
        } else if (previousCameraRef.current === fpCamera) {
            fpCamera.attachControl(canvasRef.current, true);
        }

        previousCameraRef.current = null;
      }
    }
  }, [isZoomed]);


  return <canvas ref={canvasRef} className="w-full h-full outline-none" />;
};

export default OfficeScene;
