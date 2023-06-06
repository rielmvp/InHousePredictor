function goIndonesian(){
  document.body.classList.add('loadingCursor');
  setTimeout(function(){
    window.location.href = '/';
    document.body.classList.remove('loadingCursor');
  }, 1000);
  
}

function goEnglish(){
  document.body.classList.add('loadingCursor');
  setTimeout(function(){
    window.location.href = '/english';
    document.body.classList.remove('loadingCursor');
  }, 1000);
  
}

function goToPredict(){
  var section = document.getElementById("signup");
  section.scrollIntoView({ behavior: "smooth"});
}

function sellProperty(){
  window.location.href = 'https://www.rumah.com/'
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */

function myFunction(dropdownName) {
  document.getElementById(dropdownName).classList.toggle("show");
}

function filterFunction(dropdownName, input) {
  var input, filter, ul, li, a, i;
  input = document.getElementById(input);
  filter = input.value.toUpperCase();
  div = document.getElementById(dropdownName);
  a = div.getElementsByTagName("button");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

function replaceName(myName, buttonName, label){
  const mainbutton = document.getElementById(buttonName);
  mainbutton.innerText = label + myName;
}

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const csrftoken = '{{ csrf_token }}';

function submitForm() {
  document.getElementById("popup").style.display = "block";
  const street_address = document.getElementById('button').innerText.split(': ')[1]; // 드롭다운 버튼의 텍스트 값 가져오기
  const bathroom_count= document.getElementById('button1').innerText.split(': ')[1]; // 드롭다운 버튼의 텍스트 값 가져오기
  const bedroom_count = document.getElementById('button2').innerText.split(': ')[1]; // 드롭다운 버튼의 텍스트 값 가져오기
  const listing_area = document.getElementById('button3').innerText.split(': ')[1]; // 드롭다운 버튼의 텍스트 값 가져오기
  const certificate = document.getElementById('button4').innerText.split(': ')[1]; // 드롭다운 버튼의 텍스트 값 가져오기
  const jakarta_division = document.getElementById('button5').innerText.split(': ')[1]; // 드롭다운 버튼의 텍스트 값 가져오기
  fetch('/prediction/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken
    },
    body: JSON.stringify({
      street_address: street_address,
      bathroom_count: bathroom_count,
      bedroom_count: bedroom_count,
      listing_area: listing_area,
      certificate: certificate,
      jakarta_division: jakarta_division
    }),
    credentials: 'same-origin'
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error occurred during prediction.');
    }
  }).then(data => {
    const prediction = data.prediction;
    const convertedAmount = data.toUSdollar;
    document.getElementById('result').innerText = prediction;
    if (convertedAmount) {
      document.getElementById('usd').innerText = convertedAmount;
    }
  }).catch(error => {
    console.error(error);
  });
}


function myFunction1(myDropdown, buttonNumber, description, initializer, final, description1, input) {
  document.getElementById(myDropdown).classList.toggle("show");

  var line = '<input type="text" placeholder="Search ' + description1 + '" id="' + input + '" onkeyup="filterFunction(\'' + myDropdown + '\', \'' + input + '\')">';
  document.getElementById(myDropdown).insertAdjacentHTML('beforeend', line);

  // Add an "Other" option
  var otherOption = '<button onclick="showInput(\'' + myDropdown + '\', \'' + buttonNumber + '\', \'' + description + '\', \'' + input + '\')" class="myButtons">Other</button>';
  document.getElementById(myDropdown).insertAdjacentHTML('beforeend', otherOption);

  for (var i = initializer; i < final; i++) {
    var button = '<button onclick="replaceName(' + "'" + i + "'" + ', ' + "'" + buttonNumber + "'" + ', ' + "'" + description + "'" + ')" class="myButtons">' + i + '</button>';
    document.getElementById(myDropdown).insertAdjacentHTML('beforeend', button);
  }

  

  window.onclick = function (event) {
    if (!event.target.matches('.dropbtn') && !event.target.matches('#myInput')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
}

function showInput(myDropdown, buttonNumber, description, input) {
  var inputValue = prompt("Enter your value:");
  if (inputValue !== null) {
    replaceName(inputValue, buttonNumber, description);
  }
  document.getElementById("warning").style.display = 'block';
}


// function myFunction1(myDropdown, buttonNumber, description, initializer, final, description1, input) {
  
//   document.getElementById(myDropdown).classList.toggle("show");

//   var line = '<input type="text" placeholder="Search ' + description1 + '" id="'+ input +'" onkeyup="filterFunction('+ "'" +myDropdown+ "'" +', '+ "'" +input+ "'" +')">';
//   document.getElementById(myDropdown).insertAdjacentHTML('beforeend', line);
  

//   for(var i=initializer; i<final; i++){
//       var button = '<button onclick="replaceName(' + "'" + i + "'" +', ' + "'" + buttonNumber + "'" + ', '+ "'" +description+ "'" +')" class="myButtons">'+ i +'</button>';
//       document.getElementById(myDropdown).insertAdjacentHTML('beforeend', button);
//   }

//   window.onclick = function(event) {
//     document.getElementById(myDropdown).removeEventListener("click", myFunction1);
//     if (!event.target.matches('.dropbtn') && !event.target.matches('#myInput')) {
//       var dropdowns = document.getElementsByClassName("dropdown-content");
//       var i;
//       for (i = 0; i < dropdowns.length; i++) {
//         var openDropdown = dropdowns[i];
//         if (openDropdown.classList.contains('show')) {
//           openDropdown.classList.remove('show');
//         }
//       }
//     }
//   }
// }

function readFile(myDropdown, buttonNumber, description, description1, input){

  var lines = [
    "Ampera",
    "Ancol",
    "Angke",
    "Asemka",
    "Bandengan",
    "Bangka",
    "Bendungan Hilir",
    "Bintaro",
    "Buaran",
    "Buncit",
    "Cakung",
    "Cawang",
    "Cempaka Putih",
    "Cengkareng",
    "Cibubur",
    "Cideng",
    "Ciganjur",
    "Cijantung",
    "Cilandak",
    "Cilangkap",
    "Cililitan",
    "Cilincing",
    "Cinere",
    "Cipayung",
    "Cipedak",
    "Cipete",
    "Cipinang",
    "Ciputat",
    "Ciputat Timur",
    "Ciracas",
    "Cirendeu",
    "Citra Garden",
    "Condet",
    "Daan Mogot",
    "Dewi Sartika",
    "Duren Sawit",
    "Duren Tiga",
    "Duri Kepa",
    "Duri Kosambi",
    "Duri Pulo",
    "Fatmawati",
    "Gambir",
    "Gandaria",
    "Glodok",
    "Green Garden",
    "Green Ville",
    "Grogol Petamburan",
    "Gunung Sahari",
    "Halim",
    "Jagakarsa",
    "Jakarta Garden City/JGC",
    "Jalan Panjang",
    "Jati Padang",
    "Jatinegara",
    "Jatiwaringin",
    "Jelambar",
    "Jembatan Dua",
    "Jembatan Lima",
    "Jl. Bekasi Raya",
    "Jl. Daan Mogot Raya",
    "Jl. Griya Agung",
    "Jl. H. Saaba",
    "Jl. Kembangan Raya",
    "Jl. Meruya Selatan",
    "Jl. Permata Palem Raya",
    "Jl. Peta Barat",
    "Jl. Sunter Paradise",
    "Jl. Taman Palem Lestari",
    "Jl. Taman Sunter Indah",
    "Jl. Tanjung Pura",
    "Jl. Utama III",
    "Joglo",
    "Johar Baru",
    "Kali Deres",
    "Kalibata",
    "Kalimalang",
    "Kalisari",
    "Kamal",
    "Kampung Ambon",
    "Kampung Rambutan",
    "Kapuk",
    "Kapuk Muara",
    "Kayu Jati",
    "Kayu Putih",
    "Kebagusan",
    "Kebayoran Baru",
    "Kebayoran Lama",
    "Kebon Jeruk",
    "Kedoya",
    "Kelapa Dua",
    "Kelapa Gading",
    "Kemang",
    "Kemanggisan",
    "Kemayoran",
    "Kembangan",
    "Kepa Duri",
    "Klender",
    "Koja",
    "Kota",
    "Kota Wisata Cibubur",
    "Kramat Jati",
    "Lebak Bulus",
    "Lenteng Agung",
    "Lubang Buaya",
    "Makasar",
    "Mampang Prapatan",
    "Mangga Besar",
    "Mangga Dua",
    "Manggarai",
    "Matraman",
    "Menteng",
    "Meruya",
    "Meruya Selatan",
    "Muara Karang",
    "Otista",
    "Pademangan",
    "Palmerah",
    "Pancoran",
    "Pantai Indah Kapuk",
    "Pantai Mutiara",
    "Pasar Minggu",
    "Pasar Rebo",
    "Pegadungan",
    "Pegangsaan",
    "Pejaten",
    "Penjaringan",
    "Permata Buana",
    "Permata Hijau",
    "Permata Puri Media",
    "Pesanggrahan",
    "Petojo Utara",
    "Petukangan",
    "Pisangan Lama",
    "Pluit",
    "Pondok Bambu",
    "Pondok Cabe",
    "Pondok Gede",
    "Pondok Indah",
    "Pondok Kelapa",
    "Pondok Kopi",
    "Pondok Labu",
    "Pondok Pinang",
    "Pondok Ranggon",
    "Pos Pengumben",
    "Pulo Asem",
    "Pulo Gadung",
    "Pulo Gebang",
    "Pulomas",
    "Puri Indah",
    "Puri Mansion",
    "Radio Dalam",
    "Ragunan",
    "Rawa Belong",
    "Rawajati",
    "Rawalumbu",
    "Rawamangun",
    "Roxy",
    "Salemba",
    "Sawah Besar",
    "Semper",
    "Senen",
    "Serpong",
    "Setia Budi",
    "Slipi",
    "Srengseng",
    "Sudirman",
    "Sunrise",
    "Sunter",
    "Supomo",
    "Taman Cosmos",
    "Taman Kencana",
    "Taman Mini",
    "Taman Modern",
    "Taman Palem",
    "Taman Ratu",
    "Taman Sari",
    "Taman Semanan Indah",
    "Taman Surya",
    "Tambora",
    "Tanah Abang",
    "Tanah Kusir",
    "Tanjung Barat",
    "Tanjung Duren",
    "Tanjung Priok",
    "Tb. Simatupang",
    "Tebet",
    "Tebet Barat",
    "Tebet Timur",
    "Teluk Gong",
    "Thamrin",
    "Tomang",
    "Ulujami",
    "Utan Kayu",
    "Warung Buncit"
  ];
  

  var lines1 = [
    'AJB - Akta Jual Beli',
    'Hak Pakai',
    'None',
    'PPJB - Perjanjian Pengikatan Jual Beli',
    'Sertifikat Belum Pecah',
    'SHGB - Hak Guna Bangunan',
    'SHM - Sertifikat Hak Milik',
    'Strata',
    'Surat Ijo / Surat Hijau',
    'Tanah Girik / Rincik / Kikitir'
  ];
  
  
  var lines2 = ['North','Central','East','Weast','South'];

  document.getElementById(myDropdown).classList.toggle("show");

  var line = '<input type="text" placeholder="Search ' + description1 + '" id="'+ input +'" onkeyup="filterFunction('+ "'" +myDropdown+ "'" +', '+ "'" +input+ "'" +')">';
  document.getElementById(myDropdown).insertAdjacentHTML('beforeend', line);

  // Add an "Other" option
  var otherOption = '<button onclick="showInput(\'' + myDropdown + '\', \'' + buttonNumber + '\', \'' + description + '\', \'' + input + '\')" class="myButtons">Other</button>';
  document.getElementById(myDropdown).insertAdjacentHTML('beforeend', otherOption);

  if(myDropdown == 'myDropdown'){

    for(var i=0; i < lines.length; i++){
      var button = '<button onclick="replaceName(' + "'" + lines[i] + "'" +', ' + "'" + buttonNumber + "'" + ', '+ "'" +description+ "'" +')" class="myButtons">'+ lines[i] +'</button>';
      document.getElementById(myDropdown).insertAdjacentHTML('beforeend', button);
    }

  } else if(myDropdown == 'myDropdown4'){

    for(var i=0; i < lines1.length; i++){
      var button = '<button onclick="replaceName(' + "'" + lines1[i] + "'" +', ' + "'" + buttonNumber + "'" + ', '+ "'" +description+ "'" +')" class="myButtons">'+ lines1[i] +'</button>';
      document.getElementById(myDropdown).insertAdjacentHTML('beforeend', button);
    }

  } else if(myDropdown == 'myDropdown5'){

    for(var i=0; i < lines2.length; i++){
      var button = '<button onclick="replaceName(' + "'" + lines2[i] + "'" +', ' + "'" + buttonNumber + "'" + ', '+ "'" +description+ "'" +')" class="myButtons">'+ lines2[i] +'</button>';
      document.getElementById(myDropdown).insertAdjacentHTML('beforeend', button);
    }

  }

  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn') && !event.target.matches('#myInput')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

}

function showSellButton(){
  document.getElementById("sellProperty").style.display = 'block';
}

// function goToPopUp() {
//   document.getElementById("popup").style.display = "block";
//   //document.getElementById("result").style.display = "block";
// }

function shareWhatssapp() {
  window.location.href = 'https://www.whatsapp.com/'
}

function sellProperty() {
  window.location.href = 'https://www.rumah.com/'
}

function hidePopup() {
  document.getElementById("popup").style.display = "none";
}










