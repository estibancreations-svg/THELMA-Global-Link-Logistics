
import { DispatchOrder, FleetVehicle, AquaticAsset, AviationAsset } from '../types';

// --- GENERATORS ---

const ORIGINS = ["Los Angeles, CA", "Shanghai, CN", "Rotterdam, NL", "Houston, TX", "Singapore", "New York, NY", "Dubai, UAE", "London, UK", "Tokyo, JP"];
const DESTINATIONS = ["Austin, TX", "Berlin, DE", "Chicago, IL", "Denver, CO", "Mumbai, IN", "Sydney, AU", "Toronto, CA", "Miami, FL", "Seattle, WA"];
const CARGOS = [
    "Quantum Processors (Classified)", "Tesla Megapacks", "Organs (Cryo)", "Project Z Fuel Cells", 
    "Humanitarian Aid", "Raw Lithium", "Server Racks", "Heavy Machinery", "Drone Swarm Kits", 
    "Aerospace Alloys", "Medical Isotopes", "LNG Containers", "Autonomous Lidar Sensors"
];
const DRIVERS = ["S. Henry", "M. Cole", "J. Kirk", "S. Connor", "A. Ripley", "D. Bowman", "K. Thrace", "H. Solo", "System AI", "L. Skywalker"];

// 1. LOAD BOARD GENERATOR (200 ITEMS)
export const generateLoadBoard = (): DispatchOrder[] => {
    return Array.from({ length: 200 }, (_, i) => {
        const isProjectZ = Math.random() > 0.95;
        const origin = ORIGINS[Math.floor(Math.random() * ORIGINS.length)];
        const dest = DESTINATIONS[Math.floor(Math.random() * DESTINATIONS.length)];
        
        return {
            id: isProjectZ ? `Z-ORD-${9000 + i}` : `ORD-${1000 + i}`,
            client: isProjectZ ? 'US SPACE FORCE' : `Client_${Math.floor(Math.random() * 500)}`,
            origin: origin,
            destination: dest,
            priority: isProjectZ ? 'CRITICAL' : Math.random() > 0.8 ? 'EXPEDITED' : 'STANDARD',
            domain: Math.random() > 0.6 ? 'LAND' : Math.random() > 0.5 ? 'AIR' : 'SEA',
            status: Math.random() > 0.8 ? 'ASSIGNED' : 'PENDING',
            payload: CARGOS[Math.floor(Math.random() * CARGOS.length)],
            assignedAssetId: Math.random() > 0.8 ? `UNIT-${Math.floor(Math.random() * 200)}` : undefined,
            value: Math.floor(Math.random() * 50000) + 2000,
            eta: `${Math.floor(Math.random() * 48) + 2} Hours`,
            bids: Array.from({ length: Math.floor(Math.random() * 5) }, (_, j) => ({
                id: `bid-${i}-${j}`,
                driverName: DRIVERS[Math.floor(Math.random() * DRIVERS.length)],
                driverId: `DRV-${Math.floor(Math.random() * 100)}`,
                amount: Math.floor(Math.random() * 5000) + 1000,
                timestamp: 'Just now',
                status: 'PENDING'
            }))
        };
    });
};

// 2. GOD'S QUEUE (OMNI) GENERATOR (250 ITEMS)
export const generateOmniAssets = () => {
    return Array.from({ length: 250 }, (_, i) => {
        const typeRoll = Math.random();
        let type = 'LAND';
        if (typeRoll > 0.6) type = 'SEA';
        if (typeRoll > 0.8) type = 'AIR';
        if (typeRoll > 0.95) type = 'SPACE';

        const isGhost = Math.random() > 0.93; // 7% stealth probability

        return {
            id: `${type.substring(0,1)}-${2000 + i}`,
            type: type,
            label: `${type === 'SPACE' ? 'SAT' : 'UNIT'} ${i}`,
            lat: (Math.random() * 160) - 80, // Global spread
            lng: (Math.random() * 360) - 180,
            status: Math.random() > 0.9 ? 'ALERT' : 'ACTIVE',
            orbit: type === 'SPACE',
            isGhost: isGhost
        };
    });
};

// 3. FLEET MATRIX GENERATOR (200 ITEMS)
export const generateFleetMatrix = (): any[] => {
    return Array.from({ length: 200 }, (_, i) => {
        const health = Math.floor(Math.random() * 30) + 70; // 70-100%
        return {
            id: `F-${1000 + i}`,
            name: `Fleet Unit ${1000 + i}`,
            type: Math.random() > 0.5 ? 'CLASS-8' : 'EV-VAN',
            status: health < 80 ? 'MAINTENANCE' : Math.random() > 0.3 ? 'ENROUTE' : 'IDLE',
            fuelLevel: Math.floor(Math.random() * 100),
            mileage: Math.floor(Math.random() * 150000),
            lastService: '2025-12-01',
            vin: `1HV${Math.random().toString(36).substring(2, 10).toUpperCase()}9921`,
            verified: true,
            driver: DRIVERS[Math.floor(Math.random() * DRIVERS.length)],
            lat: 34.05 + (Math.random() - 0.5),
            lng: -118.24 + (Math.random() - 0.5),
            heading: Math.floor(Math.random() * 360),
            health: health,
            trainingStatus: Math.floor(Math.random() * 100)
        };
    });
};
