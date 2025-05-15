import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { MuscleGroup } from "../types/workout";
import { Mesh, MeshStandardMaterial, PointLight } from "three";

interface MuscleModelProps {
  priorityMuscles: MuscleGroup[];
}

// Simple human figure component
function HumanFigure({ priorityMuscles }: MuscleModelProps) {
  const meshRef = useRef<Mesh>(null);
  
  // Map muscle groups to body part positions
  const musclePositions: Record<MuscleGroup, [number, number, number]> = {
    "demonic chest": [0, 0.4, 0.5],
    "titanic back": [0, 0.4, -0.3],
    "shoulder domination": [0, 0.6, 0],
    "arm control": [0.7, 0.2, 0],
    "legs of steel": [0, -0.5, 0],
    "core seal": [0, 0, 0.3],
    "v-taper lats": [0.3, 0.3, -0.3],
    "mountain traps": [0, 0.6, -0.2],
    "explosive glutes": [0, -0.3, -0.5],
    "unshakeable calves": [0.2, -1, 0],
    "grip of a curse user": [0.9, 0, 0],
    "posture stabilizers": [0, 0.8, -0.1],
    "mobility and flexibility": [0, 0, 0],
    "cardio conditioning": [0, 0.2, 0.1],
    "recovery and regeneration": [0, 0, 0]
  };
  
  // Rotate the model slowly
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <>
      {/* Basic human figure */}
      <mesh ref={meshRef}>
        {/* Head */}
        <mesh position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial color="#444" />
        </mesh>
        
        {/* Torso */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[0.7, 0.7, 0.3]} />
          <meshStandardMaterial color="#444" />
        </mesh>
        
        {/* Left Arm */}
        <mesh position={[-0.5, 0.3, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.7, 16]} />
          <meshStandardMaterial color="#444" />
        </mesh>
        
        {/* Right Arm */}
        <mesh position={[0.5, 0.3, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.7, 16]} />
          <meshStandardMaterial color="#444" />
        </mesh>
        
        {/* Hips */}
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[0.6, 0.3, 0.3]} />
          <meshStandardMaterial color="#444" />
        </mesh>
        
        {/* Left Leg */}
        <mesh position={[-0.2, -0.6, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.8, 16]} />
          <meshStandardMaterial color="#444" />
        </mesh>
        
        {/* Right Leg */}
        <mesh position={[0.2, -0.6, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.8, 16]} />
          <meshStandardMaterial color="#444" />
        </mesh>
      </mesh>
      
      {/* Add highlighted muscle groups with a glowing effect */}
      {priorityMuscles.map((muscle, index) => {
        if (musclePositions[muscle]) {
          const [x, y, z] = musclePositions[muscle];
          return (
            <group key={`${muscle}-${index}`} position={[x, y, z]}>
              <pointLight 
                intensity={5} 
                distance={1} 
                color="#ff3333" 
                position={[0, 0, 0]} 
              />
              <mesh>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial 
                  color="#ff3333" 
                  emissive="#ff0000"
                  emissiveIntensity={2}
                  transparent={true}
                  opacity={0.7}
                />
              </mesh>
            </group>
          );
        }
        return null;
      })}
    </>
  );
}

export function MuscleVisualization({ priorityMuscles }: MuscleModelProps) {
  return (
    <div className="w-full h-[300px] bg-black/40 border-2 border-red-600 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 0, 2.5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <HumanFigure priorityMuscles={priorityMuscles} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}

export default MuscleVisualization;
