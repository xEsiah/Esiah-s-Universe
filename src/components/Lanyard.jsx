"use client";
import {
  useRef,
  useState,
  useMemo,
  Suspense,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
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
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";

import "./Lanyard.css";

extend({ MeshLineGeometry, MeshLineMaterial });

// Détection propre du client (Standard React 19) pour éviter les erreurs ESLint
const subscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

export default function Lanyard({ show, gravity = [0, -20, 0], fov = 20 }) {
  const isClient = useIsClient();
  if (!show || !isClient) return null;

  return createPortal(
    <div className="lanyard-root-container">
      <Canvas
        camera={{ position: [0, 0, 20], fov }}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), 0)}
      >
        <Suspense fallback={null}>
          <Physics gravity={gravity} interpolate={true}>
            <Band />
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

function Band() {
  const { size } = useThree();
  const band = useRef(),
    fixed = useRef(),
    j1 = useRef(),
    j2 = useRef(),
    j3 = useRef(),
    card = useRef();
  const vec = new THREE.Vector3(),
    dir = new THREE.Vector3();

  const { nodes, materials } = useGLTF("/3d/card.glb");

  const texture = useTexture("/3d/lanyard.png", (t) => {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(-4, 1);
    t.anisotropy = 16;
  });

  const cardTexture = useTexture("/3d/badge_texture.png", (t) => {
    t.flipY = false;
    t.anisotropy = 16;
  });

  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        new Array(4).fill(null).map(() => new THREE.Vector3()),
      ),
    [],
  );
  const [dragged, drag] = useState(false);

  // JOINTS PHYSIQUES
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1.2]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1.2]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1.2]);

  // CONNEXION PHYSIQUE : L'ancre j3 est soudée au haut du collider de la carte
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.1, 0],
  ]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (fixed.current) {
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
      band.current.geometry.setPoints(curve.getPoints(32));
    }
  });

  const physicsProps = {
    type: "dynamic",
    linearDamping: 4,
    angularDamping: 4,
    friction: 0.5,
  };

  return (
    <>
      <group position={[4, 5, 0]}>
        <RigidBody ref={fixed} type="fixed" />
        <RigidBody position={[0, 2, 0]} ref={j1} {...physicsProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0, 2, 0]} ref={j2} {...physicsProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0, 2, 0]} ref={j3} {...physicsProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          ref={card}
          {...physicsProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
          position={[0, 2, 0]}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, 0]}
            onPointerDown={(e) => {
              e.target.setPointerCapture(e.pointerId);
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current.translation())),
              );
            }}
            onPointerUp={(e) => (
              e.target.releasePointerCapture(e.pointerId),
              drag(false)
            )}
          >
            {/* renderOrder={2} : La carte passe DEVANT la lanière */}
            <mesh
              geometry={nodes.card.geometry}
              rotation={[Math.PI / 2, 0, 0]}
              renderOrder={2}
            >
              <meshPhysicalMaterial
                map={cardTexture}
                clearcoat={1}
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

      {/* renderOrder={1} : Dessiné en premier (derrière) */}
      <mesh ref={band} renderOrder={1}>
        <meshLineGeometry />
        <meshLineMaterial
          transparent
          depthTest={false}
          resolution={[size.width, size.height]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={1.2}
        />
      </mesh>
    </>
  );
}
