function goIndonesian(){
  document.body.classList.add('loadingCursor');
  setTimeout(function(){
    window.location.href = 'Indonesian Version.html';
    document.body.classList.remove('loadingCursor');
  }, 1000);
  
}

function goEnglish(){
  document.body.classList.add('loadingCursor');
  setTimeout(function(){
    window.location.href = 'Ai Based House Estimation Price.html';
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


function myFunction1(myDropdown, buttonNumber, description, initializer, final, description1, input) {
  
  document.getElementById(myDropdown).classList.toggle("show");

  var line = '<input type="text" placeholder="Search ' + description1 + '" id="'+ input +'" onkeyup="filterFunction('+ "'" +myDropdown+ "'" +', '+ "'" +input+ "'" +')">';
  document.getElementById(myDropdown).insertAdjacentHTML('beforeend', line);
  

  for(var i=initializer; i<final; i++){
      var button = '<button onclick="replaceName(' + "'" + i + "'" +', ' + "'" + buttonNumber + "'" + ', '+ "'" +description+ "'" +')" class="myButtons">'+ i +'</button>';
      document.getElementById(myDropdown).insertAdjacentHTML('beforeend', button);
  }

  window.onclick = function(event) {
    document.getElementById(myDropdown).removeEventListener("click", myFunction1);
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

function readFile(myDropdown, buttonNumber, description, description1, input){

  var lines = [". Jl. Bekasi Raya", ". Jl. Lingkar Luar" , "Ampera","Ancol","Angke", "Antasari", "Asemka","Bandengan","Bangka","Bekasi","Bendungan Hilir","Bintaro","Buaran","Buncit"
  ,"Cakung","Cawang","Cempaka Putih","Cengkareng","Cibubur","Cideng","Ciganjur","Cijantung","Cilandak","Cilangkap","Cililitan","Cilincing","Cinere","Cipayung","Cipedak"
  ,"Cipete","Cipinang","Ciputat","Ciputat Timur","Ciracas","Cirendeu","Citra Garden","Condet","Daan Mogot","Dewi Sartika","Duren Sawit","Duren Tiga","Duri Kepa","Duri Kosambi","Duri Pulo"
  ,"Fatmawati","Gambir","Gandaria","Gatot Subroto","Gelong","Glodok","Green Garden","Green Ville","Grogol Petamburan","Gunung Sahari","Halim","Jagakarsa","Jakarta Garden City/JGC","Jalan Panjang","Jati Padang"
  ,"Jatinegara","Jatiwaringin","Jelambar","Jembatan Dua","Jembatan Lima","Jembatan Tiga","Jl. Agung Perkasa","Jl. Bekasi Raya","Jl. Daan Mogot Raya","Jl. Griya Agung","Jl. H. Saaba","Jl. Joglo Raya"
  ,"Jl. Kembangan Raya","Jl. Meruya Selatan","Jl. Permata Palem Raya","Jl. Peta Barat","Jl. Sunter Paradise","Jl. Taman Palem Lestari","Jl. Taman Sunter Indah","Jl. Tanjung Pura","Jl. Utama III","Joglo","Johar Baru","Kali Deres"
  ,"Kalibata","Kalimalang","Kalisari","Kamal","Kampung Ambon","Kampung Rambutan","Kapuk",'Kapuk Muara','Kayu Jati','Kayu Putih','Kebagusan','Kebayoran Baru','Kebayoran Lama','Kebon Jeruk'
  ,'Kedoya','Kel. Sunter Agung','Kelapa Dua','Kelapa Gading','Kemang','Kemanggisan','Kemayoran','Kembangan','Kepa Duri','Klender','Koja','Kota','Kota Wisata Cibubur'
  ,'Kramat Jati','Kuningan','Lebak Bulus','Lenteng Agung','Lubang Buaya','Makasar','Mampang Prapatan','Mangga Besar','Mangga Dua','Manggarai','Matraman','Menteng','Meruya','Meruya Selatan'
  ,'Muara Karang','Otista','Pademangan','Palmerah','Pancoran','Pantai Indah Kapuk','Pantai Mutiara','Parung Panjang','Pasar Minggu','Pasar Rebo','Pegadungan','Pegangsaan','Pejaten','Penjaringan','Permata Buana','Permata Hijau'
  ,'Permata Puri Media','Pesanggrahan','Petojo Utara','Petukangan','Pisangan Lama','Pluit','Plumpang','Pondok Bambu','Pondok Cabe','Pondok Gede','Pondok Indah','Pondok Kelapa'
  ,'Pondok Kopi','Pondok Labu','Pondok Pinang','Pondok Ranggon','Pos Pengumben','Pulo Asem','Pulo Gadung','Pulo Gebang','Pulomas','Puri Indah','Puri Mansion','Radio Dalam'
  ,'Ragunan','Rawa Belong','Rawalumbu','Rawamangun','Roxy','Salemba','Sawah Besar','Sawangan','Semper','Senen','Setia Budi','Slipi','Srengseng','Sudirman','Sunrise','Sunter','Sunter Agung'
  ,'Supomo','Taman Cosmos','Taman Kencana','Taman Mini','Taman Modern','Taman Palem','Taman Ratu','Taman Sari','Taman Semanan Indah','Taman Surya','Tambora','Tanah Abang'
  ,'Tanah Kusir','Tanjung Duren','Tanjung Priok','Tb. Simatupang','Tebet','Tebet Barat','Tebet Timur','Tebet Utara','Teluk Gong','Thamrin','Tomang','Ulujami','Utan Kayu','Warung Buncit']

  var lines1 = ['None', 'AJB - Akta Jual Beli',"Built: 2006",'Built: 2015','Hak Pakai','Hak Sewa','PPJB - Perjanjian Pengikatan Jual Beli'
    ,'SHGB - Hak Guna Bangunan','SHM - Sertifikat Hak Milik','Sertifikat Belum Pecah','Strata','Surat Ijo / Surat Hijau','Tanah Eigendom Verponding','Tanah Girik / Rincik / Kikitir','Warisan'];
  
  var lines2 = ['North','Central','East','Weast','South'];

  document.getElementById(myDropdown).classList.toggle("show");

  var line = '<input type="text" placeholder="Search ' + description1 + '" id="'+ input +'" onkeyup="filterFunction('+ "'" +myDropdown+ "'" +', '+ "'" +input+ "'" +')">';
  document.getElementById(myDropdown).insertAdjacentHTML('beforeend', line);

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

  document.getElementById('submitBtn').addEventListener('click', function() {
    var form = document.getElementById('contactForm');
    var formData = new FormData(form);
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'email_content.php', true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        if (response.success) {
          // Display success message
          var successMessage = document.createElement('div');
          successMessage.className = 'alert alert-success';
          successMessage.textContent = response.message;
          document.getElementById('contact').appendChild(successMessage);
          
          // Reset the form
          form.reset();
        } else {
          // Display error message
          var errorMessage = document.createElement('div');
          errorMessage.className = 'alert alert-danger';
          errorMessage.textContent = response.message;
          document.getElementById('contact').appendChild(errorMessage);
        }
      }
    };
    
    xhr.send(formData);
  });

