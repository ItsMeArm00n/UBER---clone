# Testing Guide - OpenStreetMap Captain Integration

## Pre-Testing Setup

### 1. Environment Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

### 2. Browser Requirements
- **HTTPS Required**: Geolocation API requires secure context
  - Development: `localhost` is considered secure
  - Production: Must use HTTPS
- **Location Permission**: Browser will prompt for permission
- **Recommended Browsers**:
  - Chrome/Edge (best performance)
  - Firefox
  - Safari (mobile testing)

## Testing Checklist

### ✅ Basic Map Display (CaptainHome)

#### Test 1: Map Initialization
- [ ] Navigate to `/captain-home`
- [ ] Map loads without errors
- [ ] OpenStreetMap tiles display correctly
- [ ] No GIF background visible

**Expected Result**: Interactive map appears in top 60% of screen

#### Test 2: GPS Location Tracking
- [ ] Browser prompts for location permission
- [ ] Grant location permission
- [ ] Blue captain marker appears at your current location
- [ ] Marker updates when you move (test by walking or driving)

**Expected Result**: Captain marker shows your real-time GPS location

#### Test 3: Map Controls
- [ ] Zoom In button (+) increases zoom level
- [ ] Zoom Out button (-) decreases zoom level
- [ ] Recenter button (📍) returns view to captain location
- [ ] Click and drag to pan the map

**Expected Result**: All controls work smoothly without lag

#### Test 4: Marker Popup
- [ ] Click on captain marker
- [ ] Popup appears with location details
- [ ] Coordinates display correctly
- [ ] Popup closes when clicking map

**Expected Result**: Popup shows current coordinates

---

### ✅ Route Visualization (CaptainRiding)

#### Test 5: Route Display
- [ ] Navigate to `/captain-riding`
- [ ] Map displays with captain marker
- [ ] Green pickup marker (P) appears
- [ ] Red drop-off marker (D) appears
- [ ] Blue route line connects pickup to drop-off

**Expected Result**: Complete route with all three markers visible

#### Test 6: Auto-Fit Bounds
- [ ] Map automatically adjusts to show all markers
- [ ] Route line is fully visible
- [ ] Markers are not cut off at screen edges
- [ ] Reasonable zoom level (not too close or far)

**Expected Result**: Entire route fits in viewport with padding

#### Test 7: Distance & ETA Badge
- [ ] White badge appears at top center of map
- [ ] Distance shown in kilometers (e.g., "12.5 km")
- [ ] Duration shown in minutes (e.g., "18 min")
- [ ] Values update when locations change

**Expected Result**: Accurate distance and time estimation displayed

#### Test 8: Real-Time Tracking During Ride
- [ ] Captain marker updates as you move
- [ ] Route line remains visible
- [ ] Distance badge updates in real-time
- [ ] Map stays centered (or use recenter)

**Expected Result**: Smooth real-time tracking without performance issues

---

### ✅ Performance Testing

#### Test 9: Battery Usage
- [ ] Start map on fully charged device
- [ ] Monitor battery drain over 30 minutes
- [ ] Compare with GIF background (if available)

**Expected Result**: 
- Battery drain < 5% per 30 minutes
- Lower than GIF animation
- No device overheating

#### Test 10: Memory Usage
- [ ] Open browser DevTools (F12)
- [ ] Go to Performance/Memory tab
- [ ] Record 5 minutes of map usage
- [ ] Check memory consumption

**Expected Result**:
- Memory stable (no leaks)
- < 100MB RAM for map component
- No continuous memory growth

#### Test 11: Network Usage
- [ ] Open DevTools Network tab
- [ ] Load map and pan around
- [ ] Check tile download sizes

**Expected Result**:
- Initial load: 200-500 KB
- Additional tiles: 20-50 KB each
- Tiles cached on reload (0 KB)

#### Test 12: Frame Rate
- [ ] Open DevTools Performance
- [ ] Record while panning and zooming
- [ ] Check FPS (frames per second)

**Expected Result**:
- Smooth 60 FPS on desktop
- 30+ FPS on mobile
- No janky animations

---

### ✅ Mobile Testing

#### Test 13: Mobile Responsiveness
- [ ] Test on mobile device or emulator
- [ ] Map fills available screen space
- [ ] Touch gestures work (pinch zoom, pan)
- [ ] Controls are touch-friendly (44px min)

**Expected Result**: Smooth mobile experience

#### Test 14: Mobile GPS Accuracy
- [ ] Test on actual mobile device (not emulator)
- [ ] Move around while viewing map
- [ ] Check marker updates frequency

**Expected Result**:
- Updates every 1-2 seconds
- Accuracy within 10-50 meters
- No excessive jumping

---

### ✅ Error Handling

#### Test 15: Location Permission Denied
- [ ] Deny location permission in browser
- [ ] Check for error message
- [ ] Verify map still displays (default center)

**Expected Result**: Red error banner with user-friendly message

#### Test 16: No Internet Connection
- [ ] Disable internet connection
- [ ] Try to load map

**Expected Result**: 
- Cached tiles display if available
- New tiles fail gracefully
- Error message if route can't load

#### Test 17: OSRM API Failure
- [ ] Block OSRM domain (developer tools)
- [ ] Navigate to CaptainRiding

**Expected Result**: 
- Route line doesn't appear
- Distance badge hidden
- No JavaScript errors in console

---

### ✅ Edge Cases

#### Test 18: Very Long Route
- [ ] Modify pickup/dropoff to be 100+ km apart
- [ ] Check route visualization
- [ ] Verify distance and ETA accuracy

**Expected Result**: Route displays correctly, may take longer to calculate

#### Test 19: Indoor Location
- [ ] Use map indoors (building)
- [ ] Check GPS accuracy

**Expected Result**: 
- Location may be less accurate (expected)
- Error message if GPS unavailable

#### Test 20: Rapid Location Changes
- [ ] Use location spoofing to simulate fast movement
- [ ] Check marker updates

**Expected Result**: 
- Marker animates smoothly between positions
- No crashes or freezes

---

## Performance Benchmarks

### Target Metrics

| Metric | Target | Critical |
|--------|--------|----------|
| **Initial Load Time** | < 2 seconds | < 5 seconds |
| **Tile Load Time** | < 500ms | < 2 seconds |
| **Route Calculation** | < 1 second | < 3 seconds |
| **GPS Update Frequency** | 1-2 seconds | 5 seconds |
| **Memory Usage** | < 100 MB | < 200 MB |
| **Battery Drain** | < 5%/30min | < 10%/30min |
| **Frame Rate** | 60 FPS | 30 FPS |

### How to Measure

#### Load Time
```javascript
// Add to CaptainMap.jsx useEffect
console.time('Map Load');
// ... map initialization
console.timeEnd('Map Load');
```

#### Memory Usage
```javascript
// In browser console
console.log(performance.memory);
```

#### Battery (Android)
```bash
adb shell dumpsys battery
```

---

## Automated Testing (Optional)

### Unit Tests (Jest + React Testing Library)

```javascript
// CaptainMap.test.jsx
import { render, screen } from '@testing-library/react';
import CaptainMap from './CaptainMap';

describe('CaptainMap Component', () => {
  test('renders map container', () => {
    render(<CaptainMap />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  test('displays pickup and dropoff markers', () => {
    const pickup = { lat: 28.6, lng: 77.2, address: 'Test' };
    const dropoff = { lat: 28.5, lng: 77.3, address: 'Test2' };
    render(
      <CaptainMap 
        pickupLocation={pickup} 
        dropoffLocation={dropoff} 
        showRoute={true}
      />
    );
    // Add assertions
  });
});
```

### E2E Tests (Playwright/Cypress)

```javascript
// captain-map.spec.js
describe('Captain Map Integration', () => {
  it('should display map on captain home', () => {
    cy.visit('/captain-home');
    cy.get('.leaflet-container').should('be.visible');
    cy.get('.custom-captain-marker').should('exist');
  });

  it('should show route on captain riding page', () => {
    cy.visit('/captain-riding');
    cy.get('.leaflet-overlay-pane path').should('exist'); // Route polyline
  });
});
```

---

## Troubleshooting Common Issues

### Issue 1: Map Tiles Not Loading
**Symptoms**: Gray tiles or broken images  
**Solutions**:
- Check internet connection
- Verify CORS settings
- Check browser console for errors
- Try different OSM tile server

### Issue 2: GPS Not Working
**Symptoms**: No location permission prompt  
**Solutions**:
- Ensure HTTPS (or localhost)
- Check browser location settings
- Reset site permissions
- Test with different browser

### Issue 3: Route Not Displaying
**Symptoms**: No blue line between markers  
**Solutions**:
- Check OSRM API is accessible
- Verify pickup/dropoff coordinates are valid
- Check browser console for errors
- Test with sample coordinates

### Issue 4: Performance Issues
**Symptoms**: Lag, stuttering, high battery drain  
**Solutions**:
- Reduce GPS update frequency (increase `maximumAge`)
- Limit zoom levels
- Reduce marker complexity
- Check for memory leaks

### Issue 5: Markers Not Appearing
**Symptoms**: Missing custom icons  
**Solutions**:
- Check divIcon HTML is valid
- Verify CSS is loaded
- Check z-index layering
- Test with default markers

---

## Reporting Issues

### Information to Include
1. **Device/Browser**: Chrome 120 on Android 14
2. **Screen Recording**: Video of the issue
3. **Console Logs**: Any JavaScript errors
4. **Network Tab**: Failed requests
5. **Steps to Reproduce**: Exact sequence to trigger bug
6. **Expected vs Actual**: What should happen vs what happens

### Example Report
```
**Issue**: Captain marker not updating

**Environment**:
- Device: iPhone 13
- Browser: Safari 17
- OS: iOS 17.2

**Steps to Reproduce**:
1. Open /captain-home
2. Grant location permission
3. Walk 100 meters
4. Marker doesn't update

**Expected**: Marker should move with GPS location
**Actual**: Marker stays at initial position

**Console Errors**: [Screenshot of errors]
```

---

## Sign-Off Criteria

Before marking the issue as complete, ensure:

- [ ] All 20 tests pass
- [ ] Performance benchmarks met
- [ ] No console errors
- [ ] Mobile tested on real device
- [ ] Battery drain acceptable
- [ ] Documentation complete
- [ ] Code reviewed
- [ ] Screenshots/video recorded

---

## Testing Timeline

| Phase | Duration | Responsible |
|-------|----------|-------------|
| Unit Tests | 2 hours | Developer |
| Manual Testing | 4 hours | QA |
| Performance Tests | 2 hours | DevOps |
| Mobile Testing | 3 hours | QA |
| Bug Fixes | Varies | Developer |
| Final Verification | 1 hour | Product Owner |

**Total Estimated Time**: 12-16 hours

---

## Success Criteria

✅ **Functional**:
- Map displays correctly on all pages
- GPS tracking works in real-time
- Route visualization is accurate
- All controls function properly

✅ **Performance**:
- Meets or exceeds benchmark targets
- No memory leaks
- Smooth animations (60 FPS)
- Battery-efficient

✅ **UX**:
- Intuitive interactions
- Clear error messages
- Fast load times
- Responsive on mobile

✅ **Compliance**:
- OSM attribution present
- OSRM API used correctly
- Accessibility standards met
- Privacy-conscious (location handling)

---

## Next Steps After Testing

1. **Document any issues found** in GitHub Issues
2. **Gather user feedback** from beta testers
3. **Optimize based on real-world data**
4. **Plan Phase 2 features** (turn-by-turn navigation, etc.)
5. **Deploy to staging** for final verification
6. **Production release** with monitoring

---

**Testing Started**: [Date]  
**Testing Completed**: [Date]  
**Tested By**: [Name]  
**Status**: ✅ Passed / ⚠️ Issues Found / ❌ Failed
