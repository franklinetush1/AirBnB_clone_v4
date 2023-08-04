$(document).ready(function () {
  let amenities = {};

  function updateAmenities() {
    $('.amenities H4').text(Object.values(amenities).join(', '));
  }

  $('INPUT[type="checkbox"]').on('change', function () {
    const dataId = $(this).attr('data-id');
    const dataName = $(this).attr('data-name');

    if ($(this).is(':checked')) {
      amenities[dataId] = dataName;
    } else {
      delete amenities[dataId];
    }

    updateAmenities();
  });
});
