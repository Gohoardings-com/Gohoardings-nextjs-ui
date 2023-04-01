import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import {Link} from 'next/link'
import Streetview from "./streetview";
import styles from '../../styles/markers.module.scss'
import { markersPosition } from "@/redux/adminAction";

const Markers = ({ markers, removefromCart, addonCart,zoom}) => {
  const [map, setMap] = useState(null);
  const dispatch = useDispatch()
  const { iconfilter, loading } = useSelector((state) => state.iconfilter);

  markers.forEach((e) => {
    e["position"] = { lat: e.latitude, lng: e.longitude };
  });
 
  if (!loading) {
    iconfilter.forEach((e) => {
      e["position"] = { lat: e.lat, lng: e.lng };
    });
  }

  const [activeMarker, setActiveMarker] = useState(null);

 
  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };
  const handleOnLoad = (map) => {
    setMap(map);
    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };
 
  const onBoundsChanged = async() => {
    if (map) {
      const mapThing = map
      const bounds = mapThing.getBounds()
      const ne = bounds.getNorthEast()
      const sw = bounds.getSouthWest()
      dispatch(markersPosition(ne.lat(), sw.lat(),  ne.lng(), sw.lng()))
    }
  };
  const customMapStyle = [
    {
        featureType: "landscape.man_made",
        elementType: "geometry",
        stylers: [
            {
                color: "#f7f1df"
            }
        ]
    },
    {
        featureType: "landscape.natural",
        elementType: "geometry",
        stylers: [
            {
                color: "#d0e3b4"
            }
        ]
    },
    {
        featureType: "landscape.natural.terrain",
        elementType: "geometry",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "poi.business",
        elementType: "all",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "poi.medical",
        elementType: "geometry",
        stylers: [
            {
                color: "#fbd3da"
            }
        ]
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
            {
                color: "#bde6ab"
            }
        ]
    },
    {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "road",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#ffe15f"
            }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
            {
                color: "#efd151"
            }
        ]
    },
    {
        featureType: "road.arterial",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#ffffff"
            }
        ]
    },
    {
        featureType: "road.local",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "black"
            }
        ]
    },
    {
        featureType: "transit.station.airport",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#cfb2db"
            }
        ]
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [
            {
                color: "#a2daf2"
            }
        ]
    }
]

  const [streetView, setStreetView] = useState(false);
  const [latitude, setLatitude] = useState();
  const [longitude, setlongitude] = useState();

  const onStreet = (latitude, longitude) => {
    setlongitude(longitude);
    setLatitude(latitude);
    setStreetView(!streetView);
  };
  const closeKeyword = () =>  { 
    setStreetView(!streetView)
    setActiveMarker(null);
  }

  return (
    <>
      {streetView ? (
        <Streetview
          latitude={latitude}
          longitude={longitude}
          closeKeyword={closeKeyword}
        />
      ) : (
        <>
             {/* <button className=" this-area" onClick={onBoundsChanged} >Search in this area</button> */}
          <GoogleMap
            onLoad={handleOnLoad}
            zoom={"8"}
            onClick={() => setActiveMarker(null)}
            mapContainerStyle={{ height: "100%" }}
            options={{
              styles: customMapStyle,
            }}
            streetView={activeMarker}
          >
       <button>Load more  </button> 
            {!markers ? (
              <h1>Loading.... Please Wait</h1>
            ) : (
              markers.map(
                ({
                  id,
                  position,
                  medianame,
                  price,
                  illumination,
                  subcategory,
                  height,
                  width,
                  ftf,
                  code,
                  category_name,
                  thumb,
                  isDelete,
                  mediaownercompanyname,
                  latitude,
                  longitude,
                  meta_title
                }) => (
                  <Marker
                    key={id}
                   
                    icon={isDelete==0?"../images/all_image/placeholder2.png":"../images/all_image/placeholder.png"}
                    position={position}
                    onClick={() => handleActiveMarker(id)}
                  >
                    {activeMarker === id  ? (
                      <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                        <div className={styles.infoWindow}>
                          <div className={styles.media_image}>
                          {/* <Link
                        to={`/services/${category_name}/${meta_title}`}
                        className="text-decoration-none"
                      > */}
                            <img
                              src={
                                thumb.startsWith("https")
                                  ? thumb
                                  : `https://${mediaownercompanyname
                                      .trim()
                                      .split(" ")
                                      .slice(0, 2)
                                      .join("_")
                                      .toLowerCase()}.odoads.com/media/${mediaownercompanyname
                                      .trim()
                                      .split(" ")
                                      .slice(0, 2)
                                      .join("_")
                                      .toLowerCase()}/media/images/new${thumb}`
                              }
                              alt="About media"
                              className="rounded-top"
                            />
                               {/* </Link> */}
                          </div>

                          <div className={`${styles.info_window} bg-white`}>
                          {/* <Link
                        to={`/services/${category_name}/${meta_title}`}
                        className="text-decoration-none"
                      > */}
                            <h5  className=" text-dark" >{illumination + "-" + medianame}</h5>
                            {/* </Link> */}
                            <p>
                              <span>Media Type : </span>
                              {subcategory}
                            </p>
                            <p>
                              <span>Height X Width : </span>
                              {height} X {width} feet
                            </p>

                            <p
                             
                            >
                              <span>FTF : </span>
                              {ftf}
                            </p>
                            <img src="../images/all_image/streetv.gif" className={styles.streetv}      onClick={(e, i) => onStreet(latitude, longitude)}/>
                           
                            {isDelete === 0 ? (
                              <img
                                src="../images/all_image/A-chek.png"
                                onClick={() =>
                                  removefromCart(code)
                                }
                                className={`${styles.addonCart} icon-clr ${styles.sitemark} `}
                                alt="check_button"
                              />
                            ) : (
                              <img
                                alt="cart_icon"
                                src="../images/all_image/A-cart.png"
                                onClick={() => addonCart(code, category_name)}
                                className={`${styles.addonCart} icon-clr ${styles.sitemark} `}
                              />
                            )}
                          </div>
                        </div>
                      </InfoWindow>
                    ) : null}
                  </Marker>
                )
              )
            )}
            {loading ? (
              <h1>Loading.... Please Wait</h1>
            ) : (
            iconfilter.map(({ id, position, name, lat, lng }) => (
              <Marker
                key={id}
                icon={"../images/all_image/restaurant.png"}
                position={position}
                onClick={() => handleActiveMarker(id)}
              >
                {activeMarker === id && (
                  <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                    <div className={styles.infoWindow}>
                      <p>{name}</p>
                      <p>
                        {lat},{lng}
                      </p>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            ))
             
            )}
          </GoogleMap>
        </>
      )}

      
    </>
  );
};

export default Markers;
