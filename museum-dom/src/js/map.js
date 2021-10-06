const mapBox = () => {
  // The value for 'accessToken' begins with 'pk...'
  mapboxgl.accessToken =
  "pk.eyJ1IjoibGl1Ym9teXI4NiIsImEiOiJja3VkeG9oZ2oxZXJ3MndsbXl2eHIzemcxIn0.b3QoHdx92ecggQi1Y_3tRg";
  const map = new mapboxgl.Map({
  container: "map",
  // Replace YOUR_STYLE_URL with your style URL.
  style: "mapbox://styles/liubomyr86/ckudyyq463gjz18qjvux1ucaa",
  center: [2.3364, 48.86091],
  zoom: 15.5,
  });

  // Code from the next step will go here.
  /*
  Add an event listener that runs
  when a user clicks on the map element.
  */
  map.on("click", ({ point }) => {
  // If the user clicked on one of your markers, get its information.
  const features = map.queryRenderedFeatures(point, {
    layers: ["museum-louvre"], // replace with your layer name
  });
  if (!features.length) {
    return;
  }
  const feature = features[0];

  // Code from the next step will go here.

  /*
  Create a popup, specify its options
  and properties, and add it to the map.
  */
  const popup = new mapboxgl.Popup({ offset: [0, -15] })
    .setLngLat(feature.geometry.coordinates)
    .setHTML(
      `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
    )
    .addTo(map);
  });

   // Add zoom and rotation controls to the map.
  map.addControl(new mapboxgl.NavigationControl());
}

export default mapBox()
