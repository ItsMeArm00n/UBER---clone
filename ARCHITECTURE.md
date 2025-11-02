# Architecture Diagram - OpenStreetMap Integration

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Captain Application                       │
│                         (React + Vite)                           │
└─────────────────────────────────────────────────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                          │
          ┌─────────▼─────────┐     ┌─────────▼─────────┐
          │   CaptainHome     │     │  CaptainRiding    │
          │     Page          │     │      Page         │
          └─────────┬─────────┘     └─────────┬─────────┘
                    │                          │
                    └────────────┬─────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │    CaptainMap.jsx       │
                    │   (Main Component)      │
                    └────────────┬────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                          │
          ┌─────────▼─────────┐     ┌─────────▼─────────┐
          │   Geolocation     │     │   React Leaflet   │
          │   API (Browser)   │     │    (Map Library)  │
          └─────────┬─────────┘     └─────────┬─────────┘
                    │                          │
                    │                ┌─────────▼─────────┐
                    │                │   OpenStreetMap   │
                    │                │   Tile Servers    │
                    │                └───────────────────┘
                    │
                    │                ┌─────────────────────┐
                    └───────────────▶│   OSRM API Server   │
                                     │  (Route Calculation)│
                                     └─────────────────────┘
```

---

## Component Hierarchy

```
CaptainHome / CaptainRiding
    │
    └── CaptainMap
         │
         ├── MapContainer (react-leaflet)
         │    │
         │    ├── TileLayer (OSM tiles)
         │    │
         │    ├── Marker (Captain - Blue Car)
         │    │    └── Popup (Coordinates)
         │    │
         │    ├── Marker (Pickup - Green Pin) [Optional]
         │    │    └── Popup (Address)
         │    │
         │    ├── Marker (Drop-off - Red Pin) [Optional]
         │    │    └── Popup (Address)
         │    │
         │    ├── Polyline (Route - Blue Line) [Optional]
         │    │
         │    ├── ZoomControl (Zoom +/-)
         │    │
         │    └── AutoFitBounds [Optional]
         │
         ├── RecenterButton (Custom Control)
         │
         ├── Distance/ETA Badge [Optional]
         │
         └── Error Message [Conditional]
```

---

## Data Flow

### 1. GPS Location Tracking
```
Browser Geolocation API
         │
         ├─ getCurrentPosition() ──► Initial Location
         │                             │
         │                             ▼
         │                      [lat, lng] → captainLocation state
         │                             │
         │                             ▼
         │                      Update Captain Marker
         │
         └─ watchPosition() ────► Real-time Updates
                                   (every 1-2 seconds)
                                        │
                                        ▼
                                Update captainLocation state
                                        │
                                        ▼
                                Marker moves on map
```

### 2. Route Calculation
```
User Props (pickup + dropoff)
         │
         ▼
useEffect detects change
         │
         ▼
Fetch OSRM API
   https://router.project-osrm.org/route/v1/driving/{coords}
         │
         ▼
Response: { distance, duration, geometry }
         │
         ├─► setDistanceKm()
         ├─► setDurationMin()
         └─► setRouteCoords()
              │
              ▼
Display Polyline + Badge
```

### 3. Map Tile Loading
```
User Pans/Zooms Map
         │
         ▼
Leaflet requests tiles
         │
         ▼
OSM Tile Server
   https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
         │
         ├─► Browser Cache (hit) → Load from cache
         │
         └─► Browser Cache (miss) → Download tile
                                      │
                                      ▼
                              Cache for future use
```

---

## State Management

```javascript
// CaptainMap Component State
const [captainLocation, setCaptainLocation] = useState([lat, lng]);
                                                          │
                                                          ▼
                                                   Default: [28.6139, 77.2090]
                                                   Updates: GPS watchPosition()

const [routeCoords, setRouteCoords] = useState([]);
                                                 │
                                                 ▼
                                          [[lat, lng], [lat, lng], ...]
                                          From OSRM API response

const [distanceKm, setDistanceKm] = useState(null);
                                              │
                                              ▼
                                       Number (e.g., 12.5)
                                       From OSRM API response

const [durationMin, setDurationMin] = useState(null);
                                                │
                                                ▼
                                         Number (e.g., 18)
                                         From OSRM API response

const [locationError, setLocationError] = useState(null);
                                                    │
                                                    ▼
                                             String error message
                                             or null
```

---

## API Calls

### Geolocation API
```javascript
// Initial Position
navigator.geolocation.getCurrentPosition(
  successCallback,  // → setCaptainLocation([lat, lng])
  errorCallback,    // → setLocationError(message)
  options           // { enableHighAccuracy, timeout, maximumAge }
);

// Watch Position
watchId = navigator.geolocation.watchPosition(
  successCallback,  // → setCaptainLocation([lat, lng])
  errorCallback,    // → console.error()
  options           // { enableHighAccuracy, timeout, maximumAge }
);

// Cleanup
navigator.geolocation.clearWatch(watchId);
```

### OSRM API
```javascript
// Request
GET https://router.project-osrm.org/route/v1/driving/{lng},{lat};{lng},{lat}
    ?overview=full
    &geometries=geojson

// Response
{
  "routes": [{
    "distance": 12534,        // meters
    "duration": 1020,         // seconds
    "geometry": {
      "coordinates": [
        [lng, lat],
        [lng, lat],
        ...
      ]
    }
  }]
}

// Processing
const coords = data.routes[0].geometry.coordinates;
const latlngs = coords.map(([lng, lat]) => [lat, lng]);
setRouteCoords(latlngs);
setDistanceKm(data.routes[0].distance / 1000);
setDurationMin(data.routes[0].duration / 60);
```

---

## File Structure

```
UBER---clone/
│
├── frontend/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── CaptainMap.jsx          ← NEW (Main component)
│   │   │   ├── CaptainMap.css          ← NEW (Optimized styles)
│   │   │   └── Map.jsx                 (Existing - unchanged)
│   │   │
│   │   └── pages/
│   │       ├── CaptainHome.jsx         ← MODIFIED (Uses CaptainMap)
│   │       └── CaptainRiding.jsx       ← MODIFIED (Uses CaptainMap)
│   │
│   └── package.json                    (No changes - all deps exist)
│
├── OSM_INTEGRATION_GUIDE.md            ← NEW (Documentation)
├── TESTING_GUIDE.md                    ← NEW (Documentation)
├── IMPLEMENTATION_SUMMARY.md           ← NEW (Documentation)
├── QUICK_REFERENCE.md                  ← NEW (Documentation)
├── MIGRATION_GUIDE.md                  ← NEW (Documentation)
└── README.md                           ← MODIFIED (Updated features)
```

---

## Network Traffic Flow

```
Initial Page Load
    │
    ├─► Load React App (~500 KB)
    ├─► Load Leaflet CSS (~10 KB)
    ├─► Request Location Permission (0 KB)
    │
    └─► Get GPS Position (0 KB - browser native)
         │
         ▼
    Load Map Tiles
         │
         ├─► Tile 1 (~20 KB)
         ├─► Tile 2 (~20 KB)
         ├─► Tile 3 (~20 KB)
         └─► ... (8-12 tiles for initial view)
         │
         Total: ~200-300 KB
         │
         ▼
    [If route needed]
         │
         └─► OSRM API Request (~2 KB)
              │
              ▼
         OSRM API Response (~5-10 KB)
              │
              ▼
         Total First Load: ~400-500 KB

Subsequent Use (with cache)
    │
    ├─► GPS Updates (0 KB - native)
    ├─► Cached Tiles (0 KB)
    └─► Route Calculation (~10 KB)
         │
         Total: ~10 KB
```

---

## Performance Optimization Points

```
┌──────────────────────────────────────┐
│         CaptainMap Component         │
│                                      │
│  1. useMemo for markers array        │◄── Prevent re-renders
│                                      │
│  2. useRef for map instance          │◄── Prevent re-initialization
│                                      │
│  3. GPS maximumAge: 1000ms           │◄── Reduce polling frequency
│                                      │
│  4. Conditional route fetching       │◄── Only when showRoute=true
│                                      │
│  5. GPU acceleration (CSS)           │◄── will-change, translateZ(0)
│                                      │
│  6. Tile caching (Leaflet)           │◄── Browser cache
│                                      │
│  7. Cleanup geolocation watcher      │◄── Prevent memory leaks
│                                      │
│  8. Auto-fit bounds (optional)       │◄── Only when autoFitBounds=true
│                                      │
└──────────────────────────────────────┘
```

---

## Error Handling Flow

```
Component Mount
    │
    ├─► Check Geolocation Support
    │    ├─► Not Supported → setLocationError()
    │    └─► Supported → Continue
    │
    ├─► Request Location Permission
    │    ├─► Denied → setLocationError()
    │    ├─► Timeout → setLocationError()
    │    └─► Granted → Get Position
    │
    ├─► Fetch Route (if needed)
    │    ├─► Network Error → console.error() + no route
    │    ├─► Invalid Response → console.error() + no route
    │    └─► Success → Display Route
    │
    └─► Load Map Tiles
         ├─► Network Error → Gray tiles (graceful degradation)
         └─► Success → Display Tiles
```

---

## Browser Compatibility Matrix

```
┌─────────────┬──────────┬─────────────┬─────────────┐
│  Browser    │ Version  │ Geolocation │ Leaflet Map │
├─────────────┼──────────┼─────────────┼─────────────┤
│ Chrome      │   90+    │      ✅      │      ✅      │
│ Firefox     │   88+    │      ✅      │      ✅      │
│ Safari      │   14+    │  ✅ (HTTPS)  │      ✅      │
│ Edge        │   90+    │      ✅      │      ✅      │
│ Mobile      │  Modern  │      ✅      │      ✅      │
└─────────────┴──────────┴─────────────┴─────────────┘
```

---

## Security & Privacy

```
┌────────────────────────────────────────┐
│          User Privacy Layer            │
│                                        │
│  ┌──────────────────────────────────┐ │
│  │  Browser asks user permission    │ │
│  │  for location access             │ │
│  └──────────────┬───────────────────┘ │
│                 │                      │
│     ┌───────────▼──────────┐          │
│     │  User Grants Access  │          │
│     └───────────┬──────────┘          │
│                 │                      │
│     ┌───────────▼──────────────────┐  │
│     │  GPS data stays client-side  │  │
│     │  (not sent to backend yet)   │  │
│     └──────────────────────────────┘  │
│                                        │
└────────────────────────────────────────┘
```

---

## Future Extensions

```
Current Implementation
    │
    ├─► Phase 1: Basic GPS + Map ✅
    │
    ├─► Phase 2: Route Display ✅
    │
    └─► Future Phases:
         │
         ├─► Turn-by-Turn Navigation
         │    ├── Voice guidance
         │    ├── Maneuver instructions
         │    └── Lane guidance
         │
         ├─► Traffic Integration
         │    ├── Real-time traffic data
         │    ├── Alternative routes
         │    └── Traffic layer overlay
         │
         ├─► Offline Maps
         │    ├── Download map regions
         │    ├── Service Worker caching
         │    └── Offline route calculation
         │
         └─► Advanced Features
              ├── 3D buildings
              ├── Satellite imagery
              ├── Street view integration
              └── Multi-stop routes
```

---

## Deployment Pipeline

```
Development (localhost)
    │
    ├─► npm run dev
    ├─► Hot reload enabled
    ├─► Geolocation works (localhost exception)
    └─► Map tiles load
    │
    ▼
Staging (HTTPS required)
    │
    ├─► npm run build
    ├─► Deploy to staging server
    ├─► Test with HTTPS
    └─► Verify geolocation
    │
    ▼
Production (HTTPS required)
    │
    ├─► Final build
    ├─► Deploy to production
    ├─► Monitor performance
    └─► Collect user feedback
```

---

## Monitoring Points

```javascript
// Key metrics to monitor in production

1. Geolocation Permission Rate
   - % of users granting location access
   
2. GPS Accuracy
   - Average accuracy in meters
   
3. Map Load Time
   - Time to first tile display
   
4. Route Calculation Time
   - Time from request to display
   
5. Error Rate
   - Location errors
   - Tile loading errors
   - Route calculation errors
   
6. Battery Usage
   - % drain per hour of use
   
7. Data Usage
   - KB downloaded per session
```

---

**Diagram Version**: 1.0  
**Last Updated**: November 2, 2025  
**Status**: ✅ Complete
