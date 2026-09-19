
import { CatalogItem } from '../types';

// UTILITY: Check if review is needed (30 Day Cycle)
export const checkReviewStatus = (dateStr: string): boolean => {
    if (!dateStr) return true;
    const last = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - last.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 30; 
};

export const masterAssetCatalog: CatalogItem[] = [
    // --- LAND DOMAIN ---
    {
        id: 'LND-01',
        name: 'Freightliner eCascadia',
        make: 'Freightliner', model: 'eCascadia',
        domain: 'LAND', category: 'LAND', type: 'TRUCK', power: 'ELECTRIC', year: '2024', status: 'ACTIVE_MODEL',
        schematic: { chassis: 'SEMI_CABOVER', propulsion: 'eAxle', sensors: ['LiDAR', 'Cam'], maxPayload: '82,000 lbs', range: '250 mi', criticalCheckpoints: ['Bridge Height', 'Tire Pressure'] },
        specs: { range: "250 miles", payload: "82,000 lbs", speed: "65 mph", dimensions: "L: 29' / W: 10'" },
        abilities: ["L4 Autonomous", "Regen Braking", "Platoon Linking"],
        last_review: "2026-01-10"
    },
    {
        id: 'LND-F150',
        name: 'Ford F-150 Lightning Pro',
        make: 'Ford', model: 'F-150 Lightning',
        domain: 'LAND', category: 'LAND', type: 'TRUCK', power: 'ELECTRIC', year: '2025', status: 'ACTIVE_MODEL',
        schematic: { chassis: 'PICKUP_FULL', propulsion: 'Dual eMotor', sensors: ['Co-Pilot360'], maxPayload: '2,235 lbs', range: '320 mi', criticalCheckpoints: ['Frunk Lock', 'Battery Rail'] },
        specs: { range: "320 miles", payload: "2,235 lbs", speed: "110 mph", dimensions: "L: 232.7 in" },
        abilities: ["Pro Power Onboard", "Off-Road Recovery", "Site Power"],
        last_review: "2026-01-12"
    },
    {
        id: 'LND-02',
        name: 'Tesla Semi G2',
        make: 'Tesla', model: 'Semi G2',
        domain: 'LAND', category: 'LAND', type: 'TRUCK', power: 'ELECTRIC', year: '2024', status: 'ACTIVE_MODEL',
        schematic: { chassis: 'SEMI_STREAMLINED', propulsion: 'Tri-Motor', sensors: ['Tesla Vision'], maxPayload: '82,000 lbs', range: '500 mi', criticalCheckpoints: ['HV Battery', 'Cooling Loop'] },
        specs: { range: "500 miles", payload: "82,000 lbs", speed: "75 mph", dimensions: "L: 28' / W: 8.5'" },
        abilities: ["Convoy Mode", "Megacharge", "0-60 in 20s (Loaded)"],
        last_review: "2025-12-15"
    },

    // --- SEA DOMAIN ---
    {
        id: 'SEA-TUG-01',
        name: 'Damen RSD-E Tug 2513',
        make: 'Damen', model: 'RSD-E',
        domain: 'SEA', category: 'SEA', type: 'SHIP', power: 'ELECTRIC', year: '2024', status: 'ACTIVE_MODEL',
        schematic: { chassis: 'TUGBOAT_HARBOR', propulsion: 'Twin Azimuth', sensors: ['360 Radar'], maxPayload: '70 Ton Bollard Pull', range: '8 Hrs', criticalCheckpoints: ['Winch Gear', 'Hull Fender'] },
        specs: { range: "8 Hours (Ops)", payload: "Tow Only", speed: "12 knots", dimensions: "L: 25m" },
        abilities: ["Zero Emission Harbor", "360 Maneuverability", "Rapid Charge"],
        last_review: "2026-01-20"
    },
    {
        id: 'SEA-77',
        name: 'Yara Birkeland G2',
        make: 'Yara', model: 'Birkeland',
        domain: 'SEA', category: 'SEA', type: 'SHIP', power: 'ELECTRIC', year: '2022', status: 'ACTIVE_MODEL',
        schematic: { chassis: 'FREIGHTER_FEEDER', propulsion: 'Azipull', sensors: ['AIS', 'Lidar'], maxPayload: '120 TEU', range: '30 nm', criticalCheckpoints: ['Auto-Dock', 'Battery Room'] },
        specs: { range: "30 nm", payload: "120 TEU", speed: "15 knots", dimensions: "L: 80m / W: 15m" },
        abilities: ["Uncrewed Navigation", "Auto-Docking", "Zero Emission"],
        last_review: "2026-02-01"
    },

    // --- DRONES (Construction & Emergency) ---
    {
        id: 'CONST-DRONE-01',
        name: 'DJI Matrice 350 RTK',
        make: 'DJI', model: 'M350',
        domain: 'AIR', category: 'AIR', type: 'DRONE', power: 'ELECTRIC', year: '2023', status: 'ACTIVE_MODEL',
        schematic: { chassis: 'QUAD_FOLD', propulsion: '4x High-KV Motors', sensors: ['RTK', 'Obstacle Sensing'], maxPayload: '2.7 kg', range: '55 min', criticalCheckpoints: ['Propellers', 'Gimbal', 'RTK Module'] },
        specs: { range: "55 mins", payload: "2.7 kg", speed: "23 m/s", dimensions: "810mm wheelbase" },
        abilities: ["Thermal Vision", "Centimeter Mapping", "IP55 Rating"],
        last_review: "2025-12-01"
    },
    {
        id: 'CONST-DRONE-02',
        name: 'WingtraOne GEN II',
        make: 'Wingtra', model: 'One Gen II',
        domain: 'AIR', category: 'AIR', type: 'DRONE', power: 'ELECTRIC', year: '2024', status: 'ACTIVE_MODEL',
        schematic: { chassis: 'VTOL_FIXED_WING', propulsion: '2x Tilt-Rotor', sensors: ['High-Res RGB', 'PPK'], maxPayload: '800g', range: '59 min', criticalCheckpoints: ['Wing Servo', 'Tail Sitter Gear'] },
        specs: { range: "59 mins", payload: "800 g", speed: "16 m/s", dimensions: "125cm wingspan" },
        abilities: ["Vertical Takeoff", "Large Area Survey", "42MP Mapping"],
        last_review: "2025-12-10"
    },
    {
        id: 'EMERG-DRONE-03',
        name: 'EHang 216-F (Firefighting)',
        make: 'EHang', model: '216-F',
        domain: 'AIR', category: 'AIR', type: 'DRONE', power: 'ELECTRIC', year: '2024', status: 'ACTIVE_MODEL',
        schematic: { chassis: 'OCTO_COAXIAL', propulsion: '16x Coaxial', sensors: ['Targeting Cam', 'Smoke Radar'], maxPayload: '150L Foam', range: '35 km', criticalCheckpoints: ['Nozzle Aim', 'Heat Shielding'] },
        specs: { range: "35 km", payload: "150L Extinguisher", speed: "130 km/h", dimensions: "H: 1.77m" },
        abilities: ["High-Rise Firefighting", "Window Breaking", "Auto-Aim"],
        last_review: "2026-01-12"
    },

    // --- PERSONAL MOBILITY ---
    {
        id: 'AIR-PM-01',
        name: 'Jetson ONE',
        make: 'Jetson Aero', model: 'ONE',
        domain: 'AIR', category: 'PERSONAL_EVTOL', type: 'EVTOL', power: 'ELECTRIC', year: '2024', status: 'ACTIVE_MODEL',
        schematic: { chassis: 'QUAD_RACING', propulsion: '8x Motor Coaxial', sensors: ['LiDAR', 'Terrain Tracking'], maxPayload: '210 lbs', range: '20 min', criticalCheckpoints: ['Rotor Sync', 'Ballistic Parachute'] },
        specs: { range: "20 mins", payload: "210 lbs", speed: "63 mph", dimensions: "L: 2.4m / W: 1.5m" },
        abilities: ["Hands-Free Hover", "Obstacle Avoidance", "Triple Redundancy"],
        last_review: "2026-01-20"
    }
];
