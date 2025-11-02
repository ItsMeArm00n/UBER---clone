# Quick Reference - Captain Map Component

## 🚀 Quick Start

```jsx
import CaptainMap from '../Components/CaptainMap';

// Basic usage (shows captain's current location only)
<CaptainMap />

// Full trip mode with route
<CaptainMap
  pickupLocation={{ lat: 28.6139, lng: 77.2090, address: "Pickup" }}
  dropoffLocation={{ lat: 28.5355, lng: 77.3910, address: "Drop-off" }}
  showRoute={true}
  autoFitBounds={true}
/>
```

---

## 📋 Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `center` | `[lat, lng]` | `[28.6139, 77.2090]` | Initial center (overridden by GPS) |
| `pickupLocation` | `{ lat, lng, address }` | `null` | Green pickup marker |
| `dropoffLocation` | `{ lat, lng, address }` | `null` | Red drop-off marker |
| `showRoute` | `boolean` | `false` | Calculate and show route line |
| `autoFitBounds` | `boolean` | `false` | Auto-zoom to fit all markers |

---

## 🎨 Markers

### Captain (Blue Car)
- Automatically shows your GPS location
- Updates in real-time (every 1-2 seconds)
- Click to see coordinates

### Pickup (Green P)
- Pass `pickupLocation` prop
- Shows when location provided
- Displays address in popup

### Drop-off (Red D)
- Pass `dropoffLocation` prop
- Shows when location provided
- Displays address in popup

---

## 🎮 Controls

### Built-in Controls
- **Zoom +/-**: Bottom-right corner
- **Recenter**: Button with target icon
- **Pan**: Click and drag
- **Popup**: Click any marker

### Programmatic Control
```jsx
// Access map instance via ref (advanced)
const mapRef = useRef();
<MapContainer ref={mapRef}>
```

---

## 📡 GPS Tracking

### How It Works
1. Component requests location permission
2. Gets initial position
3. Starts watching position changes
4. Updates captain marker automatically
5. Cleans up on unmount

### Settings
- **High accuracy**: Enabled
- **Timeout**: 5 seconds
- **Max age**: 1 second (for battery efficiency)

---

## 🛣️ Route Calculation

### OSRM Integration
- Automatically calculates route when both pickup and drop-off present
- Shows blue polyline between locations
- Displays distance (km) and duration (min) in badge

### Response Example
```json
{
  "routes": [{
    "distance": 12534,  // meters
    "duration": 1020,   // seconds
    "geometry": { ... }
  }]
}
```

---

## ⚡ Performance Tips

### Optimize GPS Updates
```jsx
// Reduce update frequency if needed
navigator.geolocation.watchPosition(callback, error, {
  enableHighAccuracy: true,
  maximumAge: 2000  // Accept 2-second-old position
});
```

### Reduce Tile Loads
- Limit zoom range
- Use lower resolution tiles
- Cache tiles aggressively

### Battery Optimization
- Increase `maximumAge` for less GPS polling
- Stop tracking when app in background
- Use `getCurrentPosition()` instead of `watchPosition()` for static view

---

## 🐛 Troubleshooting

### "Location not available"
✅ **Check**: HTTPS or localhost  
✅ **Check**: Browser permissions  
✅ **Check**: GPS enabled on device

### "Tiles not loading"
✅ **Check**: Internet connection  
✅ **Check**: CORS settings  
✅ **Check**: OSM tile server status

### "Route not showing"
✅ **Check**: Both pickup and dropoff set  
✅ **Check**: `showRoute={true}`  
✅ **Check**: OSRM API accessible  
✅ **Check**: Valid coordinates

### "Performance lag"
✅ **Check**: Reduce GPS update frequency  
✅ **Check**: Limit zoom levels  
✅ **Check**: Simplify markers  
✅ **Check**: Browser hardware acceleration

---

## 🔧 Customization

### Change Map Style
```jsx
// Replace OSM tiles with different style
<TileLayer
  url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
  attribution="..."
/>
```

Popular alternatives:
- `hot` - Humanitarian style
- `cycle` - Cycling map
- `transport` - Public transport

### Custom Markers
```jsx
const myIcon = divIcon({
  html: '<div>🚗</div>',
  iconSize: [40, 40],
  className: 'my-custom-marker'
});

<Marker position={pos} icon={myIcon} />
```

### Route Color
```jsx
<Polyline
  positions={coords}
  color="#ff0000"  // Change to red
  weight={8}        // Thicker line
  opacity={0.9}     // More opaque
/>
```

---

## 📱 Mobile Considerations

### Touch Gestures
- ✅ Pinch to zoom
- ✅ Two-finger pan
- ✅ Tap markers for popup
- ✅ Double-tap to zoom

### Responsive Sizing
```jsx
// Map always fills container
<div className="h-screen w-screen">
  <CaptainMap />
</div>
```

### Battery Saving
- Use `maximumAge: 5000` on mobile
- Stop tracking when screen off
- Reduce tile quality on slow connections

---

## 🌐 Offline Support

### Cache Tiles
```javascript
// Service Worker example
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('tile.openstreetmap.org')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
```

### Store Last Location
```javascript
// Save location to localStorage
localStorage.setItem('lastLocation', JSON.stringify([lat, lng]));

// Restore on offline
const lastLocation = JSON.parse(localStorage.getItem('lastLocation'));
```

---

## 🧪 Testing

### Unit Test Example
```javascript
import { render } from '@testing-library/react';
import CaptainMap from './CaptainMap';

test('renders map container', () => {
  const { container } = render(<CaptainMap />);
  expect(container.querySelector('.leaflet-container')).toBeInTheDocument();
});
```

### E2E Test Example
```javascript
// Cypress
cy.visit('/captain-home');
cy.get('.leaflet-container').should('be.visible');
cy.get('.custom-captain-marker').should('exist');
```

---

## 📊 Analytics

### Track Map Events
```jsx
const Map = () => {
  useEffect(() => {
    // Track when route calculated
    if (routeCoords.length > 0) {
      analytics.track('route_calculated', {
        distance: distanceKm,
        duration: durationMin
      });
    }
  }, [routeCoords]);
};
```

---

## 🔐 Security

### API Key (if using commercial service)
```jsx
// .env
VITE_MAP_API_KEY=your_key_here

// In component
const apiKey = import.meta.env.VITE_MAP_API_KEY;
```

### Sanitize User Input
```jsx
// Validate coordinates
const isValidCoord = (lat, lng) => {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
};
```

---

## 📚 Resources

- [Leaflet Docs](https://leafletjs.com/)
- [React Leaflet](https://react-leaflet.js.org/)
- [OSRM API](http://project-osrm.org/docs/v5.24.0/api/)
- [OpenStreetMap](https://www.openstreetmap.org/)

---

## 💡 Pro Tips

1. **Always clean up**: Remove geolocation watcher on unmount
2. **Memoize markers**: Prevent unnecessary re-renders
3. **Use refs for map**: Avoid re-initialization
4. **Cache routes**: Don't recalculate on every render
5. **Handle errors**: Always show user-friendly messages
6. **Test on real devices**: GPS behavior differs from emulator

---

## 🎓 Common Patterns

### Show User's Location Too
```jsx
const [userLocation, setUserLocation] = useState(null);
const [captainLocation, setCaptainLocation] = useState(null);

<CaptainMap>
  {userLocation && (
    <Marker position={userLocation} icon={userIcon} />
  )}
</CaptainMap>
```

### Multiple Captains (Fleet View)
```jsx
const captains = useContext(FleetContext);

<CaptainMap>
  {captains.map((captain) => (
    <Marker
      key={captain.id}
      position={[captain.lat, captain.lng]}
      icon={captainIcon}
    />
  ))}
</CaptainMap>
```

### Route with Waypoints
```jsx
const waypoints = [pickup, waypoint1, waypoint2, dropoff];
const url = `https://router.project-osrm.org/route/v1/driving/${
  waypoints.map(w => `${w.lng},${w.lat}`).join(';')
}`;
```

---

**Last Updated**: November 2, 2025  
**Version**: 1.0.0  
**Component**: CaptainMap.jsx
