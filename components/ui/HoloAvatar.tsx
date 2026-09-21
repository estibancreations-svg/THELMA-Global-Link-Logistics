import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

interface HoloAvatarProps {
  state: 'IDLE' | 'THINKING' | 'SPEAKING' | 'ALERT';
  size?: number;
}

const Core = ({ state }: { state: string }) => {
  const mesh = useRef<any>(null);
  
  useFrame((stateObj) => {
    if (mesh.current) {
        const t = stateObj.clock.getElapsedTime();
        if (state === 'SPEAKING') {
            mesh.current.scale.setScalar(1 + Math.sin(t * 10) * 0.1);
            mesh.current.rotation.x = Math.sin(t * 2);
        } else if (state === 'THINKING') {
            mesh.current.rotation.y += 0.05;
            mesh.current.rotation.z += 0.05;
        } else if (state === 'ALERT') {
            mesh.current.scale.setScalar(1 + Math.sin(t * 20) * 0.2);
        } else {
            // IDLE
            mesh.current.rotation.y += 0.01;
            mesh.current.position.y = Math.sin(t) * 0.1;
        }
    }
  });

  const getColor = () => {
      switch(state) {
          case 'ALERT': return '#ef4444';
          case 'THINKING': return '#a855f7';
          case 'SPEAKING': return '#3b82f6';
          default: return '#10b981';
      }
  };

  return (
    <Sphere ref={mesh} visible args={[1, 100, 200]} scale={1}>
      <MeshDistortMaterial 
        color={getColor()} 
        attach="material" 
        distort={state === 'ALERT' ? 0.6 : 0.3} 
        speed={state === 'IDLE' ? 1.5 : 4} 
        roughness={0.2}
        metalness={0.8}
        wireframe={state === 'THINKING'}
      />
    </Sphere>
  );
};

export const HoloAvatar: React.FC<HoloAvatarProps> = ({ state, size = 100 }) => {
  return (
    <div style={{ width: size, height: size }}>
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color={state === 'ALERT' ? 'red' : 'blue'} intensity={2} />
        <Core state={state} />
      </Canvas>
    </div>
  );
};
