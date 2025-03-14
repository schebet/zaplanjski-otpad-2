import React, { useState, useEffect, useRef } from 'react';
import { Camera, MapPin, Trash2 } from 'lucide-react';
import { Loader } from '@googlemaps/js-api-loader';
import { WasteLocation, locations, addLocation, generateLocationId } from './data/locations';

function App() {
  const [wasteLocations, setWasteLocations] = useState<WasteLocation[]>(locations);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const markersRef = useRef<{ [key: string]: google.maps.Marker }>({});

  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      version: 'weekly',
    });

    loader.load().then(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const currentPos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setCurrentLocation(currentPos);

            const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
              center: currentPos,
              zoom: 13,
            });
            mapRef.current = map;

            // Add markers for existing locations
            wasteLocations.forEach((loc) => {
              const marker = new google.maps.Marker({
                position: { lat: loc.lat, lng: loc.lng },
                map: map,
                icon: {
                  url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                },
                animation: google.maps.Animation.DROP,
              });
              markersRef.current[loc.id] = marker;
            });
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      }
    });
  }, [wasteLocations]);

  const handleCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && currentLocation) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newLocation: WasteLocation = {
          id: generateLocationId(),
          lat: currentLocation.lat,
          lng: currentLocation.lng,
          imageUrl: reader.result as string,
          timestamp: new Date().toISOString(),
        };
        
        addLocation(newLocation);
        setWasteLocations([...locations]);

        // Add marker for new location
        if (mapRef.current) {
          const marker = new google.maps.Marker({
            position: { lat: currentLocation.lat, lng: currentLocation.lng },
            map: mapRef.current,
            icon: {
              url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
            },
            animation: google.maps.Animation.DROP,
          });
          markersRef.current[newLocation.id] = marker;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLocationClick = (location: WasteLocation) => {
    if (mapRef.current) {
      const marker = markersRef.current[location.id];
      if (marker) {
        mapRef.current.panTo({ lat: location.lat, lng: location.lng });
        mapRef.current.setZoom(16);
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(() => {
          marker.setAnimation(null);
        }, 2100);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-green-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Trash2 className="h-8 w-8 mr-3" />
              <h1 className="text-2xl font-bold">Ђубре у Запљању</h1>
            </div>
            <button
              onClick={handleCapture}
              className="bg-white text-green-700 px-4 py-2 rounded-lg flex items-center font-medium hover:bg-green-50 transition-colors"
            >
              <Camera className="h-5 w-5 mr-2" />
              Сликај ђубре
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div id="map" className="h-[600px] w-full"></div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wasteLocations.map((location) => (
            <div 
              key={location.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-200"
              onClick={() => handleLocationClick(location)}
            >
              <img
                src={location.imageUrl}
                alt="Waste location"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>
                    {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(location.timestamp).toLocaleString('sr-RS')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-600">
            🎉 Апликација је потпуно бесплатна за коришћење! 
          </p>
          <p className="text-center text-sm text-gray-500 mt-2">
            Направљено са ❤️ за чистије Запљање
          </p>
        </div>
      </footer>

      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={fileInputRef}
        className="hidden"
        onChange={handleImageUpload}
      />
    </div>
  );
}

export default App;