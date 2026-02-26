/* eslint-disable react/no-unknown-property */
"use client";
import React, {
  useRef,
  useState,
  useMemo,
  Suspense,
  useEffect,
  useSyncExternalStore,
} from "react";
import { ThreeElement } from "@react-three/fiber";
import { createPortal } from "react-dom";
import {
  Canvas,
  extend,
  useFrame,
  useThree,
  ThreeEvent,
} from "@react-three/fiber";
import {
  useGLTF,
  useTexture,
  Environment,
  Lightformer,
} from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  RigidBodyProps,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";

extend({ MeshLineGeometry, MeshLineMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: ThreeElement<typeof MeshLineGeometry>;
    meshLineMaterial: ThreeElement<typeof MeshLineMaterial>;
  }
}

const subscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

interface LanyardProps {
  show: boolean;
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
}

export default function Lanyard({
  show,
  gravity = [0, -20, 0],
  fov = 20,
  transparent = true,
}: LanyardProps) {
  const isClient = useIsClient();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  if (!show || !isClient) return null;

  return createPortal(
    <div className="fixed inset-0 z-99999 pointer-events-none bg-transparent transition-opacity duration-1000 ease-out opacity-100">
      <Canvas
        camera={{ position: [0, 0, 20], fov }}
        gl={{ alpha: transparent, antialias: true }}
        dpr={[1, isMobile ? 1.5 : 2]}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), 0)}
        className="block w-full h-full pointer-events-auto"
      >
        <Suspense fallback={null}>
          <Physics
            gravity={gravity}
            interpolate={true}
            timeStep={isMobile ? 1 / 30 : 1 / 60}
          >
            <Band isMobile={isMobile} />
          </Physics>
        </Suspense>

        <Environment blur={0.75}>
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>,
    document.body,
  );
}

interface BandProps {
  isMobile: boolean;
}

function Band({ isMobile }: BandProps) {
  const { size } = useThree();
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = new THREE.Vector3();
  const dir = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();

  const { nodes, materials } = useGLTF("/3d/card.glb") as any;
  const texture = useTexture("/3d/lanyard.png");
  const badgeTexture = useTexture("/3d/badge_texture.png");

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3(
        new Array(4).fill(null).map(() => new THREE.Vector3()),
      ),
  );
  const [dragged, drag] = useState<THREE.Vector3 | false>(false);

  useEffect(() => {
    if (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(-4, 1);
      texture.anisotropy = 16;
    }
    if (badgeTexture) {
      badgeTexture.flipY = false;
      badgeTexture.anisotropy = 16;
    }
  }, [texture, badgeTexture]);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1.2]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1.2]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1.2]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.1, 0],
  ]);

  useFrame((state, delta) => {
    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));

      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());

      card.current.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (
      fixed.current &&
      card.current &&
      j1.current &&
      j2.current &&
      band.current
    ) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped)
          ref.current.lerped = new THREE.Vector3().copy(
            ref.current.translation(),
          );
        ref.current.lerped.lerp(ref.current.translation(), delta * 20);
      });

      const cardPos = card.current.translation();
      curve.points[0].set(cardPos.x, cardPos.y + 0.8, cardPos.z);
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  const physicsProps = {
    linearDamping: 6,
    angularDamping: 4,
    friction: 0.5,
  };

  return (
    <>
      <group position={[1, 5, 0]}>
        <RigidBody ref={fixed} type="fixed" />
        <RigidBody
          position={[0, 2, 0]}
          ref={j1}
          type="dynamic"
          {...physicsProps}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[0, 2, 0]}
          ref={j2}
          type="dynamic"
          {...physicsProps}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[0, 2, 0]}
          ref={j3}
          type="dynamic"
          {...physicsProps}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          ref={card}
          type={dragged ? "kinematicPosition" : "dynamic"}
          position={[0, 2, 0]}
          {...physicsProps}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, 0]}
            onPointerDown={(e: ThreeEvent<PointerEvent>) => {
              (e.target as HTMLElement).setPointerCapture(e.pointerId);
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current.translation())),
              );
            }}
            onPointerUp={(e: ThreeEvent<PointerEvent>) => {
              (e.target as HTMLElement).releasePointerCapture(e.pointerId);
              drag(false);
            }}
          >
            <mesh
              geometry={nodes.card.geometry}
              rotation={[Math.PI / 2, 0, 0]}
              renderOrder={2}
            >
              <meshPhysicalMaterial
                map={badgeTexture}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.3}
                metalness={0.2}
              />
            </mesh>
            {nodes.clip && (
              <mesh
                geometry={nodes.clip.geometry}
                material={materials.metal}
                renderOrder={2}
              />
            )}
          </group>
        </RigidBody>
      </group>

      <mesh ref={band} renderOrder={1}>
        <meshLineGeometry />
        <meshLineMaterial
          args={[
            {
              resolution: new THREE.Vector2(size.width, size.height),
            } as any,
          ]}
          transparent={true}
          depthTest={false}
          resolution={[size.width, size.height]}
          useMap={1}
          map={texture}
          repeat={[-4, 1]}
          lineWidth={1.2}
        />
      </mesh>
    </>
  );
}
