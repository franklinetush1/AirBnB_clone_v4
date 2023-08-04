$(document).ready(function () {
  const url = 'http://' + window.location.hostname + ':5001/api/v1/status/';
  $.get(url, function (return_val) {
    if (return_val.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
  
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
