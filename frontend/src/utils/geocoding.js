// Add delay between requests to avoid rate limiting
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1000; // 1 second between requests

export const searchLocation = async (query) => {
    try {
        // Rate limiting: wait if last request was too recent
        const now = Date.now();
        const timeSinceLastRequest = now - lastRequestTime;
        if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
            await delay(MIN_REQUEST_INTERVAL - timeSinceLastRequest);
        }
        lastRequestTime = Date.now();

        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`,
            {
                headers: {
                    'User-Agent': 'UberClone/1.0' // Nominatim requires a User-Agent
                }
            }
        );
        
        if (!response.ok) {
            console.warn(`Geocoding API returned status ${response.status}`);
            // Return a fallback location for testing (Times Square, NYC)
            return {
                lat: 40.7580,
                lng: -73.9855,
                display_name: query || 'Default Location'
            };
        }
        
        const data = await response.json();
        
        if (data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lng: parseFloat(data[0].lon),
                display_name: data[0].display_name
            };
        }
        return null;
    } catch (error) {
        console.error('Geocoding error:', error);
        // Return fallback location for testing
        return {
            lat: 40.7580,
            lng: -73.9855,
            display_name: query || 'Default Location'
        };
    }
};

export const getLocationSuggestions = async (query) => {
    if (!query || query.length < 3) return [];
    
    try {
        // Rate limiting: wait if last request was too recent
        const now = Date.now();
        const timeSinceLastRequest = now - lastRequestTime;
        if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
            await delay(MIN_REQUEST_INTERVAL - timeSinceLastRequest);
        }
        lastRequestTime = Date.now();

        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?` + 
            `format=json&q=${encodeURIComponent(query)}&limit=5`,
            {
                headers: {
                    'User-Agent': 'UberClone/1.0'
                }
            }
        );
        
        if (!response.ok) {
            console.warn(`Suggestions API returned status ${response.status}`);
            // Return sample suggestions for testing
            return [
                {
                    id: 1,
                    name: `${query} - Sample Location 1`,
                    lat: 40.7580,
                    lng: -73.9855
                },
                {
                    id: 2,
                    name: `${query} - Sample Location 2`,
                    lat: 40.7614,
                    lng: -73.9776
                }
            ];
        }
        
        const data = await response.json();
        
        return data.map(item => ({
            id: item.place_id,
            name: item.display_name,
            lat: parseFloat(item.lat),
            lng: parseFloat(item.lon)
        }));
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        // Return sample suggestions for testing
        return [
            {
                id: 1,
                name: `${query} - Sample Location 1`,
                lat: 40.7580,
                lng: -73.9855
            },
            {
                id: 2,
                name: `${query} - Sample Location 2`,
                lat: 40.7614,
                lng: -73.9776
            }
        ];
    }
};