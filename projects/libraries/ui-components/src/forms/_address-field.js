/* eslint-disable no-undef */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, withProps, lifecycle } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import SearchBox from 'react-google-maps/lib/components/places/SearchBox';
import { Field } from 'redux-form';

class AddressInputs extends Component {
  static propTypes = {
    address: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
  }

  static addressPartNames = [
    'number',
    'street',
    'area',
    'city',
    'zip',
    'state',
    'country',
  ];

  state = AddressInputs.addressPartNames.reduce((state, part) => ({
    ...state,
    [part]: this.props.address[part],
  }), {
    lat: this.props.address.lat,
    lng: this.props.address.lng,
  });

  componentDidMount() {
    this.props.onChange(this.state);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.address.lat !== this.props.address.lat
      || newProps.address.lng !== this.props.address.lng) {
      this.setState(AddressInputs.addressPartNames.reduce((state, part) => ({
        ...state,
        [part]: newProps.address[part],
      }), {
        lat: newProps.address.lat,
        lng: newProps.address.lng,
      }), () => {
        this.props.onChange(this.state);
      });
    }
  }

  onChange = (part, value) => {
    this.setState({
      [part]: value,
    }, () => this.props.onChange(this.state));
  }

  render() {
    return (
      <div
        style={{
          boxSizing: 'border-box',
          width: '100%',
          padding: 16,
          backgroundColor: '#E1DCCC',
          color: '#4B4637',
          fontFamily: 'Open Sans',
        }}
      >
        <table
          style={{
            boxSizing: 'border-box',
            width: '100%',
          }}
        >
          <tbody>
            {
              !!this.props.error &&
                <tr style={{ color: 'red' }}>
                  <td colSpan={2}>{this.props.error}</td>
                </tr>
            }
            {
              AddressInputs.addressPartNames.map(part => (
                <tr key={part}>
                  <td
                    style={{ width: 120 }}
                  >
                    {part.toUpperCase()}
                  </td>
                  <td>
                    <input
                      style={{
                        boxSizing: 'border-box',
                        width: '100%',
                        padding: 6,
                        border: '1px solid #6B6655',
                        color: part !== 'number'
                          ? '#6B6655'
                          : '#4B4637',
                        backgroundColor: part !== 'number'
                          ? '#F7F2E2'
                          : '#ffffff',
                      }}
                      readOnly={part !== 'number'}
                      type="text"
                      name={part}
                      onChange={e => this.onChange(part, e.target.value.trim())}
                      value={this.state[part]}
                    />
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

const normalizeAddress = (latlng, googleAddress) => (googleAddress
  ? googleAddress
    .address_components
    .reduce((address, part) => ({
      ...address,
      [part.types[0]]: part.long_name,
    }), { ...latlng })
  : { ...latlng });

export const AddressFieldInput = compose(
  withProps(props => ({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${props.apiKey}`,
    onChange: (props.input && props.input.onChange) || props.onChange || (() => {}),
    value: (props.input && props.input.value) || props.value || {},
    loadingElement: <div style={{ height: '100%', width: '100%' }} />,
    containerElement: <div
      style={{
        height: `${Math.min(600, Math.max(100, props.height || 400)) + 286}px`,
        width: `${Math.min(1200, Math.max(200, props.width || 800))}px`,
      }
      }
    />,
    mapElement: <div style={{ height: `${Math.min(600, Math.max(100, props.height || 400))}px`, width: '100%' }} />,
  })),
  withScriptjs,
  lifecycle({
    componentWillMount() {
      const refs = {};
      let firstMount = true;

      const setMarker = (targetOrPlace) => {
        const geocoder = new google.maps.Geocoder();

        let nextCenter = this.state.center;

        const latlng = {
          lat: targetOrPlace.lat || targetOrPlace.geometry.location.lat(),
          lng: targetOrPlace.lng || targetOrPlace.geometry.location.lng(),
        };

        geocoder.geocode({
          location: latlng,
        }, (results, status) => {
          const raw = normalizeAddress(latlng, (status === 'OK' && results[0]) || place);
          const nextMarker = {
            position: latlng, // place.geometry.location,
            address: {
              raw,
              lat: raw.lat,
              lng: raw.lng,
              number: (firstMount && this.props.value && this.props.value.number) || raw.street_number || '',
              street: raw.route || '',
              area: [
                raw.administrative_area_level_4,
                raw.administrative_area_level_3,
                ...[raw.locality && raw.administrative_area_level_2],
              ].filter(part => !!part).join(' '),
              city: raw.locality || raw.administrative_area_level_2 || '',
              zip: raw.postal_code || '',
              state: raw.administrative_area_level_1 || '',
              // TODO: Map this to a ISO 3166-1 list of country codes vs localized long names
              // and use it in a select control
              country: raw.country || '',
            },
          };

          nextCenter = nextMarker.position || this.state.center;

          this.setState({
            center: nextCenter,
            marker: nextMarker,
          }, () => { firstMount = false; });
        });
      };

      const latLongFromValue = this.props.value
        && (this.props.value.lat && this.props.value.lng)
        && {
          lat: this.props.value.lat,
          lng: this.props.value.lng,
        };

      const defaultLatlng = latLongFromValue || {
        lat: 52.506761,
        lng: 13.2843077,
      };

      this.setState({
        geoLocationAllowed: false,
        bounds: null,
        center: defaultLatlng,
        marker: null,
        onMapMounted: (ref) => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          });
        },
        onSearchBoxMounted: (ref) => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const place = places[0];
          if (place) {
            const bounds = new google.maps.LatLngBounds();
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
            setMarker(place);
          }
        },
        onLocationSelected(target) {
          setMarker({ lat: target.latLng.lat(), lng: target.latLng.lng() });
        },
      }, () => {
        if (latLongFromValue) {
          setMarker(latLongFromValue);
        } else if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(({ coords }) => {
            this.setState({
              geoLocationAllowed: true,
            }, () => {
              setMarker({
                lat: coords.latitude,
                lng: coords.longitude,
              });
            });
          }, () => {
            setMarker(defaultLatlng);
          });
        }
      });
    },
  }),
  withGoogleMap,
)(props => (
  <div>
    <GoogleMap
      ref={props.onMapMounted}
      defaultZoom={15}
      center={props.center}
      onBoundsChanged={props.onBoundsChanged}
      onClick={props.onLocationSelected}
    >
      <SearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Search for your address"
          style={{
            boxSizing: 'border-box',
            border: '1px solid transparent',
            width: props.width / 1.5,
            height: 29,
            marginTop: 10,
            padding: '0 10px',
            borderRadius: 2,
            boxShadow: '0 1px 8px rgba(0, 0, 0, 0.3)',
            fontFamily: 'Open Sans',
            color: '#4B4637',
            fontSize: 12,
            outline: 'none',
            textOverflow: 'ellipses',
          }}
        />
      </SearchBox>
      {props.marker && <Marker
        draggable
        onDragEnd={props.onLocationSelected}
        position={props.marker.position}
        address={props.marker.address}
      />
      }
    </GoogleMap>
    {
      props.marker && props.marker.address
      && <AddressInputs
        error={props.error}
        onChange={props.onChange}
        address={props.marker && props.marker.address}
      />
    }
    {
      props.debug && (
        <div
          style={{
            marginTop: 16,
            padding: 16,
            backgroundColor: '#E1DCCC',
            fontSize: 12,
            fontFamily: 'monospace',
            color: '#656050',
            borderRadius: 4,
          }}
        >
          <table>
            <tbody>
              {
                props.marker
                && props.marker.address
                && props.marker.address.raw
                && Object.entries(props.marker.address.raw).map(([k, v]) => (
                  <tr key={k}><td>{k}</td><td style={{ padding: '0 10px 0 20px' }}>:</td><td>{v}</td></tr>
                ))
              }
            </tbody>
          </table>
        </div>
      )
    }
  </div>
));

AddressFieldInput.displayName = 'AddressField';

AddressFieldInput.propTypes = {
  value: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onChange: PropTypes.func,
  input: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  error: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
};

AddressFieldInput.defaultProps = {
  onChange: () => {},
  value: {},
  height: 400,
  width: 800,
};

const AddressField = props => <Field component={AddressFieldInput} {...props} />;

export default AddressField;
