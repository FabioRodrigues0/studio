'use client';

import type { Scene, Engine, Vector3, Mesh } from '@babylonjs/core';
import {
  Engine as BabylonEngine,
  Scene as BabylonScene,
  Vector3 as BabylonVector3,
  Color3,
  Color4,
  StandardMaterial,
  MeshBuilder,
  ActionManager,
  ExecuteCodeAction,
  GlowLayer,
  Texture,
  HemisphericLight,
  ArcRotateCamera,
  FreeCamera,
} from '@babylonjs/core';
import '@babylonjs/loaders';

import React, { useEffect, useRef } from 'react';
import type { Certification, Hobby, Tech } from '@/lib/constants';
import { certifications, techStack, hobbies } from '@/lib/constants';

interface OfficeSceneProps {
  activeCamera: 'third-person' | 'first-person';
  onObjectHover: (
    info: { id: string; type: 'tech' | 'hobby' | 'cert'; name: string } | null
  ) => void;
  onPCClick: () => void;
}

const OfficeScene: React.FC<OfficeSceneProps> = ({
  activeCamera,
  onObjectHover,
  onPCClick,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    engine: Engine;
    scene: Scene;
    orbitCamera: ArcRotateCamera;
    fpCamera: FreeCamera;
    avatar: Mesh;
  } | null>(null);
  const inputMap = useRef<Record<string, boolean>>({});

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
      const avatarHeight = 6.0 * 1.1; // 10% increase from original 6.0
      const avatarRadius = 0.4;

      const avatar = MeshBuilder.CreateCapsule(
        'avatar',
        { height: avatarHeight, radius: avatarRadius },
        scene
      );
      avatar.position = new BabylonVector3(0, avatarHeight / 2, -8);
      avatar.visibility = 0;
      avatar.checkCollisions = true;
      avatar.ellipsoid = new BabylonVector3(
        avatarRadius,
        avatarHeight / 2,
        avatarRadius
      );
      avatar.ellipsoidOffset = new BabylonVector3(0, avatarHeight / 2, 0);

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
        Math.PI / 2.5,
        5,
        BabylonVector3.Zero(),
        scene
      );
      orbitCamera.upperBetaLimit = Math.PI / 2 - 0.1;
      orbitCamera.lowerRadiusLimit = 5;
      orbitCamera.upperRadiusLimit = 30;
      orbitCamera.inputs.remove(orbitCamera.inputs.attached.mousewheel);
      orbitCamera.checkCollisions = true;
      orbitCamera.collisionRadius = new BabylonVector3(0.5, 0.5, 0.5);

      const fpCamera = new FreeCamera(
        'fpCamera',
        new BabylonVector3(0, 1, 0),
        scene
      );
      fpCamera.parent = avatar;
      fpCamera.position.y = (avatarHeight / 2) * 0.8;

      sceneRef.current = { engine, scene, orbitCamera, fpCamera, avatar };

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
      woodMat.specularColor = new Color3(0.2, 0.1, 0.05);

      const metalMat = new StandardMaterial('metalMat', scene);
      metalMat.diffuseColor = new Color3(0.75, 0.75, 0.75);
      metalMat.specularColor = Color3.Gray();

      const wallMat = new StandardMaterial('wallMat', scene);
      wallMat.diffuseColor = new Color3(0.95, 0.94, 0.9); // Warm off-white
      wallMat.specularColor = Color3.Black();

      const roomSize = 28.8 * 1.2;
      const roomHeight = 14.4;

      const floor = MeshBuilder.CreateGround(
        'floor',
        { width: roomSize, height: roomSize },
        scene
      );
      floor.checkCollisions = true;
      const floorMat = new StandardMaterial('floorMat', scene);
      floorMat.diffuseColor = new Color3(0.8, 0.7, 0.55); // Light brownish cream for wood simulation
      floorMat.specularColor = Color3.Black();
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
      monitorBezel.position = new BabylonVector3(-2, deskHeight + 0.7, deskPositionZ);
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
      monitorScreenMat.emissiveColor = Color3.FromHexString('#BDB2FF').scale(0.5);
      monitorScreen.material = monitorScreenMat;

      const monitorStand = MeshBuilder.CreateCylinder(
        'monitorStand',
        { height: 0.6, diameter: 0.2 },
        scene
      );
      monitorStand.position = new BabylonVector3(-2, deskHeight + 0.3, deskPositionZ + 0.2);
      monitorStand.material = metalMat;
      monitorStand.checkCollisions = true;

      // Create PC Tower
      // You can edit this model in the Babylon.js Sandbox: https://sandbox.babylonjs.com/
      const pcTower = MeshBuilder.CreateBox(
        'pcTower',
        { width: 0.8, height: 2.5, depth: 2 },
        scene
      );
      pcTower.position = new BabylonVector3(2, deskHeight + 1.25, deskPositionZ);
      pcTower.material = metalMat;
      pcTower.checkCollisions = true;

      // Add interaction to the monitor screen
      monitorScreen.actionManager = new ActionManager(scene);
      monitorScreen.actionManager.registerAction(
        new ExecuteCodeAction(ActionManager.OnPickTrigger, () => {
          onPCClick();
        })
      );

      const createCertificationFrame = (cert: Certification, position: Vector3) => {
        // You can edit this model in the Babylon.js Sandbox: https://sandbox.babylonjs.com/
        const frame = MeshBuilder.CreateBox(
          cert.id,
          { width: 2.5, height: 1.8, depth: 0.1 },
          scene
        );
        frame.position = position;
        const frameMat = new StandardMaterial(`${cert.id}-mat`, scene);
        frameMat.diffuseColor = new Color3(0.2, 0.2, 0.2);
        frame.material = frameMat;

        const backboard = MeshBuilder.CreateBox(
          `${cert.id}-backboard`,
          { width: 2.3, height: 1.6, depth: 0.05 },
          scene
        );
        backboard.parent = frame;
        backboard.position.z = -0.05;
        const backboardMat = new StandardMaterial(`${cert.id}-backboard-mat`, scene);
        backboardMat.diffuseColor = new Color3(0.9, 0.9, 0.9);
        backboard.material = backboardMat;

        const textPlane = MeshBuilder.CreatePlane(
          `${cert.id}-text`,
          { width: 2, height: 1.4 },
          scene
        );
        textPlane.parent = backboard;
        textPlane.position.z = -0.03;

        const textTexture = new Texture(
          `data:text/plain,${cert.title}`,
          scene,
          true,
          true,
          Texture.NEAREST_SAMPLINGMODE,
          () => {
            textTexture.update();
          }
        );

        const textMat = new StandardMaterial(`${cert.id}-text-mat`, scene);
        textMat.diffuseTexture = textTexture;
        textPlane.material = textMat;

        const ribbon = MeshBuilder.CreateCylinder(
          `${cert.id}-ribbon`,
          { height: 0.5, diameter: 0.2 },
          scene
        );
        ribbon.parent = frame;
        ribbon.position.y = -0.7;
        ribbon.position.z = -0.1;
        const ribbonMat = new StandardMaterial(`${cert.id}-ribbon-mat`, scene);
        ribbonMat.diffuseColor = new Color3(0.8, 0.2, 0.2);
        ribbon.material = ribbonMat;

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

      // Create Bookshelf
      // You can edit this model in the Babylon.js Sandbox: https://sandbox.babylonjs.com/
      const bookshelfHeight = 8;
      const bookshelfWidth = 5;
      const bookshelfDepth = 1.2;
      const shelfThickness = 0.2;
      const bookshelfPosition = new BabylonVector3(
        deskWidth / 2 + 2.5 + bookshelfWidth / 2,
        bookshelfHeight / 2,
        deskPositionZ + 1
      );

      const bookshelfBack = MeshBuilder.CreateBox(
        'bookshelfBack',
        {
          width: bookshelfWidth,
          height: bookshelfHeight,
          depth: shelfThickness,
        },
        scene
      );
      bookshelfBack.position = new BabylonVector3(
        bookshelfPosition.x,
        bookshelfPosition.y,
        bookshelfPosition.z - bookshelfDepth / 2 + shelfThickness / 2
      );
      bookshelfBack.rotation.y = Math.PI;
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
      bookshelfLeft.position = new BabylonVector3(
        bookshelfPosition.x - bookshelfWidth / 2 + shelfThickness / 2,
        bookshelfPosition.y,
        bookshelfPosition.z
      );
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
      bookshelfRight.position = new BabylonVector3(
        bookshelfPosition.x + bookshelfWidth / 2 - shelfThickness / 2,
        bookshelfPosition.y,
        bookshelfPosition.z
      );
      bookshelfRight.material = woodMat;
      bookshelfRight.checkCollisions = true;

      const numShelves = 4;
      for (let i = 0; i < numShelves; i++) {
        const shelfY = (bookshelfHeight / (numShelves + 1)) * (i + 1);
        const shelf = MeshBuilder.CreateBox(
          `bookshelf_shelf_${i}`,
          {
            width: bookshelfWidth - shelfThickness * 2,
            height: shelfThickness,
            depth: bookshelfDepth,
          },
          scene
        );
        shelf.position = new BabylonVector3(
          bookshelfPosition.x,
          shelfY,
          bookshelfPosition.z
        );
        shelf.material = woodMat;
        shelf.checkCollisions = true;

        if (i === 1) {
          // Place books on the second shelf from the bottom
          techStack.forEach((tech, j) => {
            const book = MeshBuilder.CreateBox(
              tech.id,
              { width: 0.4, height: 1.2, depth: 1 },
              scene
            );
            const bookPosition = new BabylonVector3(
              bookshelfPosition.x - bookshelfWidth / 2 + 0.8 + j * 0.5,
              shelfY + shelfThickness / 2 + 0.6,
              bookshelfPosition.z
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
      soccerMat.diffuseColor = Color3.White();
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
        'https://picsum.photos/250/350?random=4',
        scene
      );
      moviePoster.material = posterMat;
      addInteraction(moviePoster, hobbies[1], 'hobby');

      const popcorn = MeshBuilder.CreateCylinder(
        hobbies[2].id,
        { height: 1, diameterTop: 0.8, diameterBottom: 0.6 },
        scene
      );
      popcorn.position = new BabylonVector3(
        2.5,
        deskHeight + 0.5,
        deskPositionZ
      );
      const popcornMat = new StandardMaterial('popcornMat', scene);
      popcornMat.diffuseColor = Color3.Red();
      popcorn.material = popcornMat;
      addInteraction(popcorn, hobbies[2], 'hobby');

      // Add Rugs
      const rugMat1 = new StandardMaterial('rugMat1', scene);
      rugMat1.diffuseColor = new Color3(0.4, 0.4, 0.6); // Blue-ish rug
      const rug1 = MeshBuilder.CreateGround(
        'rug1',
        { width: 10, height: 7 },
        scene
      );
      rug1.material = rugMat1;
      rug1.position = new BabylonVector3(0, 0.05, 0);

      const rugMat2 = new StandardMaterial('rugMat2', scene);
      rugMat2.diffuseColor = new Color3(0.7, 0.3, 0.3); // Red-ish rug
      const rug2 = MeshBuilder.CreateGround(
        'rug2',
        { width: 4, height: 6 },
        scene
      );
      rug2.material = rugMat2;
      rug2.position = new BabylonVector3(-10, 0.05, 5);
      rug2.rotation.y = Math.PI / 4;

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

          if (scene.activeCamera === orbitCamera) {
            const angle = Math.atan2(moveDirection.x, moveDirection.z);
            avatar.rotation.y = angle;
          }
        }

        if (scene.activeCamera === fpCamera) {
          avatar.rotation.y = fpCamera.rotation.y;
        }

        if (scene.activeCamera === orbitCamera) {
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

    if (scene.activeCamera) {
      scene.activeCamera.detachControl();
    }

    if (activeCamera === 'first-person') {
      scene.activeCamera = fpCamera;
      avatar.getChildMeshes().forEach((m) => (m.isVisible = false));

      setTimeout(() => {
        fpCamera.attachControl(canvasRef.current, true);
        engine.getRenderingCanvas()?.focus();
      }, 50);
    } else {
      // 'third-person'
      scene.activeCamera = orbitCamera;
      avatar.getChildMeshes().forEach((m) => (m.isVisible = true));

      setTimeout(() => {
        orbitCamera.attachControl(canvasRef.current, true);
        engine.getRenderingCanvas()?.focus();
      }, 50);
    }
  }, [activeCamera]);

  return <canvas ref={canvasRef} className="w-full h-full outline-none" />;
};

export default OfficeScene;
