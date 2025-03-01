'use client';
import { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, Libraries } from '@react-google-maps/api';


const containerStyle = {
  width: '100%',
  height: '75vh',
  borderRadius: '1rem',
  overflow: 'hidden'
};

const defaultCenter = {
  lat: 20.5937, // Default to center of India
  lng: 78.9629
};

const libraries: Libraries = ['places'];

// Hospital icon mapping based on keywords
const getHospitalIcon = (name: string = '') => {
  const nameLower = name.toLowerCase();
  if (nameLower.includes('children') || nameLower.includes('pediatric')) {
    return '👶';
  } else if (nameLower.includes('heart') || nameLower.includes('cardiac')) {
    return '❤️';
  } else if (nameLower.includes('eye') || nameLower.includes('vision')) {
    return '👁️';
  } else if (nameLower.includes('dental') || nameLower.includes('teeth')) {
    return '🦷';
  } else if (nameLower.includes('mental') || nameLower.includes('psychiatric')) {
    return '🧠';
  } else if (nameLower.includes('cancer') || nameLower.includes('oncology')) {
    return '🎗️';
  } else if (nameLower.includes('maternity') || nameLower.includes('women')) {
    return '👶';
  } else if (nameLower.includes('ortho') || nameLower.includes('bone')) {
    return '🦴';
  } else {
    return '🏥';
  }
};

// Function to handle phone calls
const handlePhoneCall = (phoneNumber: string) => {
  // Remove any non-numeric characters
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  
  // Check if the device supports telephone links
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  if (isMobile) {
    window.location.href = `tel:${cleanNumber}`;
  } else {
    // For desktop, copy to clipboard
    navigator.clipboard.writeText(phoneNumber).then(() => {
      alert('Phone number copied to clipboard: ' + phoneNumber);
    }).catch(() => {
      alert('Phone number: ' + phoneNumber);
    });
  }
};

export default function HospitalFinder() {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [hospitals, setHospitals] = useState<google.maps.places.PlaceResult[]>([]);
  const [userLocation, setUserLocation] = useState(defaultCenter);
  const [isLoading, setIsLoading] = useState(false);
  const [locationError, setLocationError] = useState<string>('');
  const [selectedHospital, setSelectedHospital] = useState<google.maps.places.PlaceResult | null>(null);
  const [hospitalDetails, setHospitalDetails] = useState<{ [key: string]: google.maps.places.PlaceResult }>({});
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const getHospitalDetails = useCallback((hospital: google.maps.places.PlaceResult) => {
    if (!map || !hospital.place_id || hospitalDetails[hospital.place_id]) return;

    const service = new google.maps.places.PlacesService(map);
    service.getDetails(
      {
        placeId: hospital.place_id,
        fields: ['name', 'formatted_address', 'formatted_phone_number', 'rating', 'opening_hours', 'website']
      },
      (result, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && result) {
          setHospitalDetails(prev => ({
            ...prev,
            [hospital.place_id!]: result
          }));
        }
      }
    );
  }, [map, hospitalDetails]);

  const searchNearbyHospitals = useCallback(() => {
    if (!map) return;
    setIsLoading(true);
    setLocationError('');

    const service = new google.maps.places.PlacesService(map);
    const request: google.maps.places.PlaceSearchRequest = {
      location: userLocation,
      radius: 5000,
      type: 'hospital'
    };

    service.nearbySearch(
      request,
      (
        results: google.maps.places.PlaceResult[] | null,
        status: google.maps.places.PlacesServiceStatus
      ) => {
        setIsLoading(false);
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          setHospitals(results);
          // Get details for each hospital
          results.forEach(hospital => getHospitalDetails(hospital));
        } else {
          setLocationError('Unable to find hospitals in this area. Please try again.');
        }
      }
    );
  }, [map, userLocation, getHospitalDetails]);

  const getUserLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    setIsLoading(true);
    setLocationError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(newLocation);
        map?.panTo(newLocation);
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Location access denied. Please enable location services in your browser.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location information is unavailable. Please try again.');
            break;
          case error.TIMEOUT:
            setLocationError('Location request timed out. Please try again.');
            break;
          default:
            setLocationError('An unknown error occurred while getting your location.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  }, [map]);

  // Auto-get user location and search for hospitals when component mounts
  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  // Auto-search hospitals when user location changes
  useEffect(() => {
    if (userLocation !== defaultCenter) {
      searchNearbyHospitals();
    }
  }, [userLocation, searchNearbyHospitals]);

  if (!isLoaded) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 rounded-xl shadow-sm">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 font-medium">Loading Maps...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="space-y-6">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Nearby Hospitals</h1>
          <p className="text-gray-600">Automatically locating medical facilities in your area</p>
        </div>

        {locationError && (
          <div className="bg-red-50 text-red-800 px-4 py-3 rounded-lg border border-red-200">
            <p className="font-medium">{locationError}</p>
          </div>
        )}

        {hospitals.length > 0 && !locationError && (
          <div className="bg-green-50 text-green-800 px-4 py-3 rounded-lg border border-green-200">
            <p className="font-medium">Found {hospitals.length} hospitals in your area</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={userLocation}
                zoom={13}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: true,
                  zoomControl: true,
                  styles: [
                    {
                      featureType: "poi.business",
                      elementType: "labels",
                      stylers: [{ visibility: "off" }],
                    },
                  ],
                }}
              >
                <Marker
                  position={userLocation}
                  icon={{
                    url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                    scaledSize: new google.maps.Size(40, 40)
                  }}
                />

                {hospitals.map((hospital, index) => (
                  hospital.geometry?.location && (
                    <Marker
                      key={hospital.place_id || index}
                      position={{
                        lat: hospital.geometry.location.lat(),
                        lng: hospital.geometry.location.lng()
                      }}
                      title={hospital.name}
                      onClick={() => setSelectedHospital(hospital)}
                      icon={{
                        url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                        scaledSize: new google.maps.Size(32, 32)
                      }}
                    />
                  )
                ))}

                {selectedHospital && selectedHospital.geometry?.location && (
                  <InfoWindow
                    position={{
                      lat: selectedHospital.geometry.location.lat(),
                      lng: selectedHospital.geometry.location.lng()
                    }}
                    onCloseClick={() => setSelectedHospital(null)}
                  >
                    <div className="p-3 max-w-xs bg-white rounded-lg">
                      <div className="flex items-center gap-2 border-b pb-2 mb-2">
                        <span className="text-2xl" role="img" aria-label="hospital icon">
                          {getHospitalIcon(selectedHospital.name)}
                        </span>
                        <h3 className="font-semibold text-lg text-gray-900">{selectedHospital.name}</h3>
                      </div>
                      {hospitalDetails[selectedHospital.place_id!] && (
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <span className="text-gray-600 mt-1">📍</span>
                            <p className="text-sm text-gray-600 flex-1">
                              {hospitalDetails[selectedHospital.place_id!].formatted_address}
                            </p>
                          </div>
                          {hospitalDetails[selectedHospital.place_id!].formatted_phone_number && (
                            <button
                              onClick={() => handlePhoneCall(hospitalDetails[selectedHospital.place_id!].formatted_phone_number!)}
                              className="flex items-center gap-2 w-full hover:bg-gray-50 p-1 rounded transition-colors"
                            >
                              <span className="text-gray-600">📞</span>
                              <p className="text-sm text-blue-600 hover:text-blue-800 flex-1 text-left">
                                {hospitalDetails[selectedHospital.place_id!].formatted_phone_number}
                              </p>
                            </button>
                          )}
                          {hospitalDetails[selectedHospital.place_id!].rating && (
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">⭐</span>
                              <p className="text-sm text-gray-600">
                                {hospitalDetails[selectedHospital.place_id!].rating} / 5
                              </p>
                            </div>
                          )}
                          {hospitalDetails[selectedHospital.place_id!].website && (
                            <a
                              href={hospitalDetails[selectedHospital.place_id!].website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-2 mt-2 hover:bg-gray-50 p-1 rounded transition-colors"
                            >
                              <span>🌐</span>
                              <span className="group-hover:underline">Visit Website</span>
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </div>
          </div>

          <div className="md:col-span-1 space-y-4">
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 pb-2 border-b">Nearby Hospitals</h2>
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {hospitals.map((hospital) => (
                  <div
                    key={hospital.place_id}
                    className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200 shadow-sm"
                    onClick={() => {
                      setSelectedHospital(hospital);
                      if (map && hospital.geometry?.location) {
                        map.panTo({
                          lat: hospital.geometry.location.lat(),
                          lng: hospital.geometry.location.lng()
                        });
                      }
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl" role="img" aria-label="hospital icon">
                        {getHospitalIcon(hospital.name)}
                      </span>
                      <h3 className="font-medium text-lg text-gray-900">{hospital.name}</h3>
                    </div>
                    {hospitalDetails[hospital.place_id!] && (
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <span className="text-gray-600 mt-1">📍</span>
                          <p className="text-sm text-gray-600 flex-1">
                            {hospitalDetails[hospital.place_id!].formatted_address}
                          </p>
                        </div>
                        {hospitalDetails[hospital.place_id!].formatted_phone_number && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePhoneCall(hospitalDetails[hospital.place_id!].formatted_phone_number!);
                            }}
                            className="flex items-center gap-2 w-full hover:bg-gray-100 p-1 rounded transition-colors"
                          >
                            <span className="text-gray-600">📞</span>
                            <p className="text-sm text-blue-600 hover:text-blue-800 flex-1 text-left">
                              {hospitalDetails[hospital.place_id!].formatted_phone_number}
                            </p>
                          </button>
                        )}
                        {hospitalDetails[hospital.place_id!].rating && (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">⭐</span>
                            <p className="text-sm text-gray-600">
                              {hospitalDetails[hospital.place_id!].rating} / 5
                            </p>
                          </div>
                        )}
                        {hospitalDetails[hospital.place_id!].website && (
                          <a
                            href={hospitalDetails[hospital.place_id!].website}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-2 mt-1 group hover:bg-gray-100 p-1 rounded transition-colors"
                          >
                            <span>🌐</span>
                            <span className="group-hover:underline">Visit Website</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 