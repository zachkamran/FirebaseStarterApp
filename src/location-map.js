import React, {Component} from 'react';

import GoogleMapReact from 'google-map-react';
import PlaceIcon from '@material-ui/icons/Place'

const AnyReactComponent = ({text}) => (
  <PlaceIcon>
    {text}
  </PlaceIcon>
);


function createMapOptions(maps) {
  // next props are exposed at maps
  // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
  // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
  // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
  // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
  // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
  return {
    zoomControlOptions: {
      position: maps.ControlPosition.RIGHT_CENTER,
      style: maps.ZoomControlStyle.SMALL
    },
    mapTypeControlOptions: {
      position: maps.ControlPosition.TOP_RIGHT
    },
    mapTypeControl: true
  };
}

export class LocationMap extends Component {

  static defaultProps = {
    center: {
      lat: 41.8781,
      lng: -87.6298
    },
    zoom: 12
  };



  render() {
    const {locations, center} = this.props; // this is an object with latitude longitude and address
    console.log(center);
    return (
      <div style={{width: '100%', height: '400px'}}>
        <GoogleMapReact
          bootstrapURLKeys={{key: process.env.REACT_APP_MAPS_KEY /* YOUR KEY HERE */}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options={createMapOptions}
        >
          {locations.map((val, idx) => {
            return (
              <AnyReactComponent
                key={idx}
                lat={val.lat}
                lng={val.lng}
                text={val.address}
              />);
          })}
        </GoogleMapReact>
      </div>
    )
  }
}
