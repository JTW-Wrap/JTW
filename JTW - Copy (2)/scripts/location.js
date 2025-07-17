document.addEventListener('DOMContentLoaded', function () {
  const locationButton = document.getElementById('locationButton');
  if (!locationButton) {
    console.error('locationButton bulunamadı.');
    return;
  }

  // Konum listesini oluşturuyoruz ve başlangıçta gizli
  const locationList = document.createElement('div');
  locationList.className = 'location-list hidden'; // hidden CSS ile display:none yapacak

  const locations = [
    {
      name: 'Tokyo',
      url: 'https://www.google.com/maps/place/JTW%E7%94%A3%E6%A5%AD%E6%A0%AA%E5%BC%8F%E4%BC%9A%E7%A4%BE/@35.8173501,139.7559961,17z/data=!3m1!4b1!4m6!3m5!1s0x6018932918e92ea9:0x289451096aa21463!8m2!3d35.8173502!4d139.760867!16s%2Fg%2F11vdjq5g74?entry=ttu&g_ep=EgoyMDI1MDYxNy4wIKXMDSoASAFQAw%3D%3D'
    },
    {
      name: 'Osaka',
      url: 'https://www.google.com/maps/place/Osaka'
    }
  ];

  locations.forEach(loc => {
    const link = document.createElement('a');
    link.href = loc.url;
    link.textContent = loc.name;
    link.target = '_blank';
    // Stil sadece class ile verilmeli, JS'den kaldırıldı
    locationList.appendChild(link);
  });

  // Parent container'ın relative olmasını sağla
  locationButton.parentElement.style.position = 'relative';
  locationButton.parentElement.appendChild(locationList);

  // Butona tıklayınca dropdown toggle
  locationButton.addEventListener('click', function (e) {
    e.stopPropagation();
    locationList.classList.toggle('hidden');
  });

  // Sayfada başka bir yere tıklanınca dropdown gizlensin
  document.addEventListener('click', function () {
    if (!locationList.classList.contains('hidden')) {
      locationList.classList.add('hidden');
    }
  });
});
