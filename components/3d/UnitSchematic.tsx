import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Text } from '@react-three/drei';
import * as THREE from 'three';

interface UnitSchematicProps {
  type: 'TRUCK' | 'DRONE' | 'SERVER' | 'SHIP';
  exploded: boolean;
  highlightPart?: string;
  onPartClick?: (part: string) => void;
  subType?: string; // e.g. PICKUP_FULL, TUGBOAT_HARBOR
}

// Reusable Part Component with Animation Logic
const Part = ({ position, size, color, label, exploded, explodeVector, isHighlighted, onClick, rotation = [0,0,0], shape = 'box' }: any) => {
  const mesh = useRef<THREE.Mesh>(null);
  const targetPos = new THREE.Vector3(...position).add(
    new THREE.Vector3(...explodeVector).multiplyScalar(exploded ? 1.5 : 0)
  );

  useFrame(() => {
    if (mesh.current) {
      mesh.current.position.lerp(targetPos, 0.1);
      if (isHighlighted) {
        mesh.current.rotation.y += 0.05;
        mesh.current.scale.setScalar(1.1);
        (mesh.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 2;
      } else {
        mesh.current.rotation.set(rotation[0], rotation[1], rotation[2]);
        mesh.current.scale.setScalar(1);
        (mesh.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0;
      }
    }
  });

  return (
    <group>
      <mesh 
        ref={mesh} 
        rotation={rotation}
        onClick={(e) => { e.stopPropagation(); onClick(label); }}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'default'}
      >
        {shape === 'cylinder' ? <cylinderGeometry args={size} /> : shape === 'cone' ? <coneGeometry args={size} /> : <boxGeometry args={size} />}
        <meshStandardMaterial 
          color={isHighlighted ? '#ef4444' : color} 
          wireframe={true}
          emissive={isHighlighted ? '#ef4444' : '#000000'}
          transparent
          opacity={0.9}
        />
        {exploded && (
            <Text position={[0, size[1] + 0.5, 0]} fontSize={0.25} color="white" anchorX="center" anchorY="middle">
                {label}
            </Text>
        )}
      </mesh>
    </group>
  );
};

// --- VEHICLE MODELS ---

const TruckModel = ({ exploded, highlightPart, onPartClick, subType }: any) => {
  const isPickup = subType?.includes('PICKUP');
  
  return (
    <group rotation={[0, -Math.PI / 4, 0]}>
      {isPickup ? (
        <>
          {/* --- FORD F-150 LIGHTNING STYLE --- */}
          <Part position={[0, 0.8, 0]} size={[2, 1.2, 1.8]} color="#3b82f6" label="CABIN_CREW" exploded={exploded} explodeVector={[0, 1, 0]} isHighlighted={highlightPart === 'CAB'} onClick={onPartClick}/>
          <Part position={[0, 0.6, -1.8]} size={[2, 0.8, 1.8]} color="#3b82f6" label="CARGO_BED" exploded={exploded} explodeVector={[0, 0.5, -1]} isHighlighted={highlightPart === 'BED'} onClick={onPartClick}/>
          <Part position={[0, 0.6, 1.5]} size={[2, 0.8, 1.2]} color="#60a5fa" label="FRUNK_STORAGE" exploded={exploded} explodeVector={[0, 0.5, 1]} isHighlighted={highlightPart === 'FRUNK'} onClick={onPartClick}/>
          <Part position={[0, -0.2, 0]} size={[2, 0.4, 4.8]} color="#10b981" label="HV_BATTERY_ARRAY" exploded={exploded} explodeVector={[0, -1, 0]} isHighlighted={highlightPart === 'BATTERY'} onClick={onPartClick}/>

          <Part position={[-1.1, -0.5, 1.5]} size={[0.45, 0.45, 0.3, 32]} shape="cylinder" rotation={[0,0,Math.PI/2]} color="#94a3b8" label="TIRE_FL" exploded={exploded} explodeVector={[-1, -0.5, 0.5]} isHighlighted={highlightPart === 'TIRES'} onClick={onPartClick}/>
          <Part position={[1.1, -0.5, 1.5]} size={[0.45, 0.45, 0.3, 32]} shape="cylinder" rotation={[0,0,Math.PI/2]} color="#94a3b8" label="TIRE_FR" exploded={exploded} explodeVector={[1, -0.5, 0.5]} isHighlighted={highlightPart === 'TIRES'} onClick={onPartClick}/>
          <Part position={[-1.1, -0.5, -1.5]} size={[0.45, 0.45, 0.3, 32]} shape="cylinder" rotation={[0,0,Math.PI/2]} color="#94a3b8" label="TIRE_RL" exploded={exploded} explodeVector={[-1, -0.5, -0.5]} isHighlighted={highlightPart === 'TIRES'} onClick={onPartClick}/>
          <Part position={[1.1, -0.5, -1.5]} size={[0.45, 0.45, 0.3, 32]} shape="cylinder" rotation={[0,0,Math.PI/2]} color="#94a3b8" label="TIRE_RR" exploded={exploded} explodeVector={[1, -0.5, -0.5]} isHighlighted={highlightPart === 'TIRES'} onClick={onPartClick}/>
        </>
      ) : (
        <>
          {/* --- CLASS 8 SEMI --- */}
          <Part position={[0, 0, 0]} size={[2, 1, 4]} color="#1e40af" label="CHASSIS_RAIL" exploded={exploded} explodeVector={[0, 0, 0]} isHighlighted={highlightPart === 'CHASSIS'} onClick={onPartClick}/>
          <Part position={[0, 1.5, 1.2]} size={[2.2, 2, 1.5]} color="#3b82f6" label="DRIVER_CAB" exploded={exploded} explodeVector={[0, 1, 1]} isHighlighted={highlightPart === 'CAB'} onClick={onPartClick}/>
          <Part position={[0, -0.2, 1]} size={[1.8, 0.5, 1.5]} color="#10b981" label="MEGA_PACK" exploded={exploded} explodeVector={[0, -1, 0]} isHighlighted={highlightPart === 'BATTERY'} onClick={onPartClick}/>

          <Part position={[-1.2, -0.5, 1.5]} size={[0.5, 0.5, 0.3]} shape="cylinder" rotation={[0,0,Math.PI/2]} color="#64748b" label="STEER_L" exploded={exploded} explodeVector={[-1, 0, 0]} onClick={onPartClick} isHighlighted={highlightPart === 'TIRES'}/>
          <Part position={[1.2, -0.5, 1.5]} size={[0.5, 0.5, 0.3]} shape="cylinder" rotation={[0,0,Math.PI/2]} color="#64748b" label="STEER_R" exploded={exploded} explodeVector={[1, 0, 0]} onClick={onPartClick} isHighlighted={highlightPart === 'TIRES'}/>

          <Part position={[-1.2, -0.5, -1.0]} size={[0.5, 0.5, 0.3]} shape="cylinder" rotation={[0,0,Math.PI/2]} color="#64748b" label="DRIVE_L1" exploded={exploded} explodeVector={[-1, 0, -1]} onClick={onPartClick} isHighlighted={highlightPart === 'TIRES'}/>
          <Part position={[1.2, -0.5, -1.0]} size={[0.5, 0.5, 0.3]} shape="cylinder" rotation={[0,0,Math.PI/2]} color="#64748b" label="DRIVE_R1" exploded={exploded} explodeVector={[1, 0, -1]} onClick={onPartClick} isHighlighted={highlightPart === 'TIRES'}/>

          <Part position={[-1.2, -0.5, -2.0]} size={[0.5, 0.5, 0.3]} shape="cylinder" rotation={[0,0,Math.PI/2]} color="#64748b" label="DRIVE_L2" exploded={exploded} explodeVector={[-1, 0, -2]} onClick={onPartClick} isHighlighted={highlightPart === 'TIRES'}/>
          <Part position={[1.2, -0.5, -2.0]} size={[0.5, 0.5, 0.3]} shape="cylinder" rotation={[0,0,Math.PI/2]} color="#64748b" label="DRIVE_R2" exploded={exploded} explodeVector={[1, 0, -2]} onClick={onPartClick} isHighlighted={highlightPart === 'TIRES'}/>
        </>
      )}
    </group>
  );
};

const ShipModel = ({ exploded, highlightPart, onPartClick, subType }: any) => {
    const isTug = subType?.includes('TUG');

    return (
        <group rotation={[0, -Math.PI / 4, 0]}>
            {/* Hull */}
            <Part position={[0, -0.5, 0]} size={isTug ? [2.5, 1.5, 4] : [3, 2, 8]} color="#0e7490" label="HULL_PRIMARY" exploded={exploded} explodeVector={[0, -1, 0]} isHighlighted={highlightPart === 'HULL'} onClick={onPartClick}/>
            
            {isTug ? (
                <>
                    {/* Tug Cabin (High visibility) */}
                    <Part position={[0, 1, 0]} size={[1.5, 1.5, 1.5]} color="#cbd5e1" label="BRIDGE_360" exploded={exploded} explodeVector={[0, 1, 0]} isHighlighted={highlightPart === 'CABIN'} onClick={onPartClick}/>
                    {/* Smokestacks / Vents */}
                    <Part position={[0, 2, -0.5]} size={[0.4, 1, 0.4]} shape="cylinder" color="#64748b" label="EXHAUST_STACK" exploded={exploded} explodeVector={[0, 2, -1]} isHighlighted={highlightPart === 'ENGINE'} onClick={onPartClick}/>
                    {/* Azimuth Thrusters */}
                    <Part position={[0.8, -1.5, -1]} size={[0.3, 0.6, 0.3]} shape="cylinder" color="#ef4444" label="THRUSTER_PORT" exploded={exploded} explodeVector={[1, -1, -1]} isHighlighted={highlightPart === 'PROPULSION'} onClick={onPartClick}/>
                    <Part position={[-0.8, -1.5, -1]} size={[0.3, 0.6, 0.3]} shape="cylinder" color="#ef4444" label="THRUSTER_STBD" exploded={exploded} explodeVector={[-1, -1, -1]} isHighlighted={highlightPart === 'PROPULSION'} onClick={onPartClick}/>
                </>
            ) : (
                <>
                    {/* Freighter Bridge (Rear) */}
                    <Part position={[0, 1.5, -3]} size={[2.5, 2, 1]} color="#cbd5e1" label="COMMAND_BRIDGE" exploded={exploded} explodeVector={[0, 2, -1]} isHighlighted={highlightPart === 'BRIDGE'} onClick={onPartClick}/>
                    {/* Cargo Containers */}
                    <Part position={[0, 0.5, 0]} size={[2, 1, 1]} color="#ef4444" label="CONTAINER_A" exploded={exploded} explodeVector={[0, 1, 0]} isHighlighted={highlightPart === 'CARGO'} onClick={onPartClick}/>
                    <Part position={[0, 0.5, 1.2]} size={[2, 1, 1]} color="#f59e0b" label="CONTAINER_B" exploded={exploded} explodeVector={[0, 1, 1]} isHighlighted={highlightPart === 'CARGO'} onClick={onPartClick}/>
                    <Part position={[0, 0.5, 2.4]} size={[2, 1, 1]} color="#10b981" label="CONTAINER_C" exploded={exploded} explodeVector={[0, 1, 2]} isHighlighted={highlightPart === 'CARGO'} onClick={onPartClick}/>
                </>
            )}
        </group>
    );
};

const DroneModel = ({ exploded, highlightPart, onPartClick, subType }: any) => {
    const isFixedWing = subType?.includes('FIXED') || subType?.includes('VTOL');
    const isOcto = subType?.includes('OCTO') || subType?.includes('16x');

    return (
      <group rotation={[0, 0, 0]}>
        {/* Core Body */}
        <Part position={[0, 0, 0]} size={[1, 0.5, 1]} color="#a855f7" label="AVIONICS_CORE" exploded={exploded} explodeVector={[0, 0, 0]} isHighlighted={highlightPart === 'CORE'} onClick={onPartClick}/>
        
        {/* Sensor Pod */}
        <Part position={[0, -0.6, 0]} size={[0.4, 0.4, 0.4]} color="#ef4444" label="SENSOR_GIMBAL" exploded={exploded} explodeVector={[0, -1, 0]} isHighlighted={highlightPart === 'SENSORS'} onClick={onPartClick}/>

        {isFixedWing ? (
            <>
                {/* Wings */}
                <Part position={[0, 0, 0]} size={[5, 0.1, 1]} color="#e879f9" label="WING_SPAN_MAIN" exploded={exploded} explodeVector={[0, 1, 0]} isHighlighted={highlightPart === 'WINGS'} onClick={onPartClick}/>
                {/* VTOL Rotors */}
                <Part position={[2, 0.2, 0.4]} size={[0.6, 0.05, 0.05]} shape="cylinder" color="#3b82f6" label="VTOL_ROTOR_L" exploded={exploded} explodeVector={[1, 1, 0]} isHighlighted={highlightPart === 'ROTORS'} onClick={onPartClick}/>
                <Part position={[-2, 0.2, 0.4]} size={[0.6, 0.05, 0.05]} shape="cylinder" color="#3b82f6" label="VTOL_ROTOR_R" exploded={exploded} explodeVector={[-1, 1, 0]} isHighlighted={highlightPart === 'ROTORS'} onClick={onPartClick}/>
                {/* Tail */}
                <Part position={[0, 0.5, -2]} size={[1.5, 0.8, 0.1]} color="#e879f9" label="V_TAIL" exploded={exploded} explodeVector={[0, 1, -1]} isHighlighted={highlightPart === 'WINGS'} onClick={onPartClick}/>
            </>
        ) : (
            <>
                {/* Multirotor Arms */}
                {[45, 135, 225, 315].map((angle, i) => {
                    const rad = angle * (Math.PI / 180);
                    const x = Math.cos(rad) * 1.5;
                    const z = Math.sin(rad) * 1.5;
                    return (
                        <group key={i}>
                            <Part position={[x/2, 0, z/2]} size={[0.8, 0.1, 0.1]} color="#64748b" label={`ARM_${i+1}`} exploded={exploded} explodeVector={[x, 0, z]} rotation={[0, -rad, 0]} isHighlighted={highlightPart === 'CHASSIS'} onClick={onPartClick}/>
                            <Part position={[x, 0.2, z]} size={[0.8, 0.05, 0.05]} shape="cylinder" color="#f472b6" label={`ROTOR_${i+1}`} exploded={exploded} explodeVector={[x, 0.5, z]} isHighlighted={highlightPart === 'ROTORS'} onClick={onPartClick}/>
                            {isOcto && (
                                 <Part position={[x, -0.2, z]} size={[0.8, 0.05, 0.05]} shape="cylinder" color="#f472b6" label={`ROTOR_${i+1}_LOWER`} exploded={exploded} explodeVector={[x, -0.5, z]} isHighlighted={highlightPart === 'ROTORS'} onClick={onPartClick}/>
                            )}
                        </group>
                    );
                })}
            </>
        )}
      </group>
    );
};

export const UnitSchematic: React.FC<UnitSchematicProps> = ({ type, exploded, highlightPart, onPartClick, subType }) => {
  return (
    <div className="w-full h-full bg-slate-950/50 rounded-xl overflow-hidden relative border border-slate-800">
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
          <p className="text-[10px] font-black uppercase text-blue-500 tracking-[0.2em]">Schematic View: {type}</p>
          <p className="text-[8px] text-slate-500 font-mono">CHASSIS: {subType || 'STANDARD_REF'}</p>
          <p className="text-[8px] text-emerald-500 font-mono">{exploded ? 'MODE: COMPONENT ANALYSIS' : 'MODE: ASSEMBLY OVERVIEW'}</p>
      </div>
      <Canvas>
        <PerspectiveCamera makeDefault position={[5, 4, 5]} />
        <OrbitControls enablePan={true} enableZoom={true} minDistance={3} maxDistance={12} autoRotate={!exploded} autoRotateSpeed={0.5} />
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -5, -5]} intensity={0.5} color="#3b82f6" />
        
        {type === 'TRUCK' && <TruckModel exploded={exploded} highlightPart={highlightPart} onPartClick={onPartClick} subType={subType} />}
        {type === 'DRONE' && <DroneModel exploded={exploded} highlightPart={highlightPart} onPartClick={onPartClick} subType={subType} />}
        {type === 'SHIP' && <ShipModel exploded={exploded} highlightPart={highlightPart} onPartClick={onPartClick} subType={subType} />}
        
        {/* Holographic Grid Floor */}
        <gridHelper args={[20, 20, 0x1e293b, 0x0f172a]} position={[0, -2, 0]} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};