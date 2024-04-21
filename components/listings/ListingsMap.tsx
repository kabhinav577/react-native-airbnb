import { ListingGeo } from '@/interfaces/listingGeo';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-map-clustering';

interface Props {
  listings: any;
}

const INITIAL_REGION = {
  latitude: 37.33,
  longitude: -122,
  latitudeDelta: 9,
  longitudeDelta: 9,
};

const ListingsMap = ({ listings }: Props) => {
  const router = useRouter();
  const onMarkerSelected = (item: ListingGeo) => {
    router.push(`/listing/${item.properties.id}`);
  };

  // Overwrite the renderCluster function to customize the cluster markers
  const renderCluster = (cluster: any) => {
    const { id, geometry, onPress, properties } = cluster;
    const points = properties.point_count;

    return (
      <Marker
        key={`cluster-${id}`}
        coordinate={{
          longitude: geometry.coordinates[0],
          latitude: geometry.coordinates[1],
        }}
        onPress={onPress}
      >
        <View style={styles.marker}>
          <Text
            style={{
              color: '#000',
              textAlign: 'center',
              fontFamily: 'nunito-semibold',
            }}
          >
            {points}
          </Text>
        </View>
      </Marker>
    );
  };

  if (!listings) return null;

  return (
    <View style={styles.container}>
      <MapView
        animationEnabled={false}
        style={StyleSheet.absoluteFill}
        showsUserLocation
        showsMyLocationButton
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        clusterColor="#fff"
        clusterTextColor="#000"
        clusterFontFamily="nunito-semibold"
        renderCluster={renderCluster}
      >
        {listings.features.map((item: ListingGeo) => (
          <Marker
            key={item.properties.id}
            coordinate={{
              latitude: +item.properties.latitude,
              longitude: +item.properties.longitude,
            }}
            onPress={() => onMarkerSelected(item)}
          >
            <View style={styles.marker}>
              <Text>$ {item.properties.price}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

export default ListingsMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marker: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  markerText: {
    fontFamily: 'nunito-semibold',
    fontSize: 14,
    color: '#000',
  },
});
