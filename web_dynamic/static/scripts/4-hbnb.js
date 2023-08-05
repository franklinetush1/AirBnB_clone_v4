$(document).ready(function () {
	const api = 'http://' + window.location.hostname;
  const url = 'http://' + window.location.hostname + ':5001/api/v1/status/';
  $.get(url, function (return_val) {
    if (return_val.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

$.post(api + ':5001/api/v1/places_search/', '{}', function (data) {
  const $sectionPlaces = $('SECTION.places');
  $sectionPlaces.empty();

  $.each(data, function (index, place) {
    const article = `<ARTICLE>
                      <DIV class="title">
                        <H2>${place.name}</H2>
                        <DIV class="price_by_night">
                          ${place.price_by_night}
                        </DIV>
                      </DIV>
                      <DIV class="information">
                        <DIV class="max_guest">
                          <I class="fa fa-users fa-3x" aria-hidden="true"></I>
                          </BR>
                          ${place.max_guest} Guests
                        </DIV>
                        <DIV class="number_rooms">
                          <I class="fa fa-bed fa-3x" aria-hidden="true"></I>
                          </BR>
                          ${place.number_rooms} Bedrooms
                        </DIV>
                        <DIV class="number_bathrooms">
                          <I class="fa fa-bath fa-3x" aria-hidden="true"></I>
                          </BR>
                          ${place.number_bathrooms} Bathrooms
                        </DIV>
                      </DIV>
                      <DIV class="description">
                        ${place.description}
                      </DIV>
                    </ARTICLE>`;
    $sectionPlaces.append(article);
  	});
	}, 'json');
  
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

  $('BUTTON').click(function () {
  $.post(api + ':5001/api/v1/places_search/', JSON.stringify({ 'amenities': Object.keys(amenities) }), appendPlaces, 'json');
});

function appendPlaces(data) {
  $('SECTION.places').html(data.map(place => `
    <ARTICLE>
      <DIV class="title">
        <H2>${place.name}</H2>
        <DIV class="price_by_night">
          ${place.price_by_night}
        </DIV>
      </DIV>
      <DIV class="information">
        <DIV class="max_guest">
          <I class="fa fa-users fa-3x" aria-hidden="true"></I>
          </BR>
          ${place.max_guest} Guests
        </DIV>
        <DIV class="number_rooms">
          <I class="fa fa-bed fa-3x" aria-hidden="true"></I>
          </BR>
          ${place.number_rooms} Bedrooms
        </DIV>
        <DIV class="number_bathrooms">
          <I class="fa fa-bath fa-3x" aria-hidden="true"></I>
          </BR>
          ${place.number_bathrooms} Bathrooms
        </DIV>
      </DIV>
      <DIV class="description">
        ${place.description}
      </DIV>
    </ARTICLE>
  `));
}

});

