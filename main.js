const db_poliklinik = {
	anak: ['Raihan', 'Matthew', 'fathur'],
	internis: ['Agnia', 'Arif', 'Colin'],
	gigi: ['Darwin', 'Yura', 'Huang'],
	umum: ['Gilbert', 'Krisna', 'Juluis'],
	bedah: ['Indra', 'Vina', 'Royan'],
};

let db_appointments = [
	{
		name: 'damar',
		tglLahir: '1998-08-17',
		gender: 'male',
		poli: 'umum',
		keluhan: 'flu',
		dokter: 'dr. Gilbert',
		jam: '09:00',
		dateBooking: '2021-09-03',
		idPengunjung: '01',
	},
	{
		name: 'damar',
		tglLahir: '1998-08-17',
		gender: 'male',
		poli: 'internis',
		keluhan: 'sesak nafas',
		dokter: 'dr. Agnia',
		jam: '10:00',
		dateBooking: '2021-09-20',
		idPengunjung: '01',
	},
	{
		name: 'damar',
		tglLahir: '1998-08-17',
		gender: 'male',
		poli: 'gigi',
		keluhan: 'gusi berdarah',
		dokter: 'dr. Yura',
		jam: '12:45',
		dateBooking: '2021-09-16',
		idPengunjung: '01',
	},
	{
		name: 'damar',
		tglLahir: '1998-08-17',
		gender: 'male',
		poli: 'umum',
		keluhan: 'sakit kepala',
		dokter: 'dr. Juluis',
		jam: '16:20',
		dateBooking: '2021-08-30',
		idPengunjung: '01',
	},
	{
		name: 'damar',
		tglLahir: '1998-08-17',
		gender: 'male',
		poli: 'bedah',
		keluhan: 'perut bocor',
		dokter: 'dr. Vina',
		jam: '13:50',
		dateBooking: '2021-10-05',
		idPengunjung: '01',
	},
];

// inisialisasi untuk beberapa field pada form
chooseDoc(
	Number(document.getElementById('appointmentTime').value.replace(':', '')),
	document.getElementById('poliklinik').value
)
document.getElementById('birthday').max = new Date()
	.toISOString()
	.split('T')[0];
document.getElementById('birthdaySearch').max = new Date()
	.toISOString()
	.split('T')[0];
document.getElementById('appointmentDate').min = new Date()
	.toISOString()
	.split('T')[0];
document.getElementById('appointmentDate').value = new Date()
	.toISOString()
	.split('T')[0];

// ======= Functions untuk handle form create appointment =======

/**
 * chooseDoc
 *
 * Untuk menentukan dokter berdasarkan waktu dan poliklinik
 * @param jam  => jam appointment
 * @param poli => poliklinik tujuan
 */
function chooseDoc(jam, poli) {
	if (jam >= 800 && jam <= 1059) {
		document.getElementById('dokter').value = "dr. " + db_poliklinik[poli][0];
	} else if (jam >= 1100 && jam <= 1359) {
		document.getElementById('dokter').value = "dr. " + db_poliklinik[poli][1];
	} else if (jam >= 1400 && jam <= 1700) {
		document.getElementById('dokter').value = "dr. " + db_poliklinik[poli][2];
	} else if (jam < 800) {
		document.getElementById('appointmentTime').value = '08:00';
		document.getElementById('dokter').value = "dr. " + db_poliklinik[poli][0];
	} else if (jam > 1700) {
		document.getElementById('appointmentTime').value = '17:00';
		document.getElementById('dokter').value = "dr. " + db_poliklinik[poli][2];
	}
}

/**
 * choosePoli
 *
 * Event handler (change) untuk perubahan pada field waktu appointment di form
 * @param event
 */
function choosePoli(event) {
	let jam = Number(
		document.getElementById('appointmentTime').value.replace(':', '')
	);
	let poli = event.target.value;
	chooseDoc(jam, poli);
}

/**
 * createAppointment
 *
 * Event handler (change) untuk perubahan pada field poliklinik di form
 * @param event
 */
function handleTimeChange(event) {
	let jam = Number(event.target.value.replace(':', ''));
	let poli = document.getElementById('poliklinik').value;
	chooseDoc(jam, poli);
}

// tambah event handler (change) untuk perubahan pada field waktu appointment di form
document
	.getElementById('appointmentTime')
	.addEventListener('change', handleTimeChange);

// tambah event handler (change) untuk perubahan pada field poliklinik di form
document.getElementById('poliklinik').addEventListener('change', choosePoli);

// ======= Functions untuk CREATE appointment =======

/**
 * generateId
 *
 * Untuk membuat id untuk appintment baru menggunakan data dari user
 * @param nama => nama user
 * @param tgl  => tanggal lahir user
 * @param poli => poiliklinik yang akan dikunjungi user
 */
function generateId(nama, tgl, poli) {
	let id = `${
		nama[0].toUpperCase() +
		tgl +
		poli[0].toUpperCase() +
		poli[1].toUpperCase()
	}`;
	return id;
}

let submit = document.getElementById('form-create');
submit.onsubmit = createAppointment; // assign event handler untuk form submit

/**
 * createAppointment
 *
 * Event handler (submit) untuk membuat appointment baru dan menyimpan appointment tersebut ke db_appointments
 * @param event
 */
function createAppointment(event) {
	let appointment = {
		name: undefined,
		tglLahir: undefined,
		gender: undefined,
		poli: undefined,
		keluhan: undefined,
		dokter: undefined,
		jam: undefined,
		dateBooking: undefined,
		idPengunjung: undefined,
	};

	let namaPengunjung = document.getElementById('nama').value;
	let genderPengunjung = document.getElementById('gender').value;
	let tanggalLahir = document.getElementById('birthday').value;
	let poliklinik = document.getElementById('poliklinik').value;
	let tanggalAppointment = document.getElementById('appointmentDate').value;
	let keluhan = document.getElementById('keluhan').value;
	let jam = document.getElementById('appointmentTime').value;
	let dokter = document.getElementById('dokter').value;

	appointment.name = namaPengunjung.toLowerCase();
	appointment.gender = genderPengunjung;
	appointment.tglLahir = tanggalLahir;
	appointment.poli = poliklinik;
	appointment.dateBooking = tanggalAppointment;
	appointment.keluhan = keluhan;
	appointment.jam = jam;
	appointment.dokter = dokter;

	let tanggal =
		appointment.tglLahir[appointment.tglLahir.length - 2] +
		appointment.tglLahir[appointment.tglLahir.length - 1];

	appointment.idPengunjung = generateId(
		appointment.name,
		tanggal,
		appointment.poli
	);

	db_appointments.push(appointment);

	// reset (kosongin) form
	event.target.reset()
	document.getElementById('appointmentDate').value = new Date()
		.toISOString()
		.split('T')[0];
	document.getElementById('appointmentTime').value = '08:00';
	chooseDoc(
		Number(document.getElementById('appointmentTime').value.replace(':', '')),
		document.getElementById('poliklinik').value
	)

	// tampilkan alert success
	document.getElementById('alert-success').style.display = 'block';

	setTimeout(function () {
		document.getElementById('alert-success').style.display = 'none';
	}, 3000);

	event.preventDefault();
}

// ======= Functions untuk READ appointment =======

let read = document.getElementById('form-read');
read.onsubmit = handleRead; // assign event handler untuk form submit

/**
 * handleRead
 *
 * Event handler (submit) untuk mencari appointment berdasarkan nama dan tanggal lahir user.
 * Memanggil function renderResult() diakhir function.
 * @param event
 */
function handleRead(event) {
	event.preventDefault();
	let output = [];
	let nama = document.getElementById('nameSearch').value;
	nama = nama.toLowerCase();
	let tglLahir = document.getElementById('birthdaySearch').value;

	let found = db_appointments.find(function (value) {
		return value.name === nama && value.tglLahir === tglLahir;
	});

	if (!found) {
		document.getElementById('alert-warning').style.display = 'block';

		setTimeout(function () {
			document.getElementById('alert-warning').style.display = 'none';
		}, 3000);
	} else {
		output = db_appointments.filter(function (value) {
			return nama === value.name && tglLahir === value.tglLahir;
		});

		renderResult(output);
	}
}

/**
 * renderResult
 *
 * Untuk render appointment cards secara dinamis dengan memasukan element baru ke DOM.
 * @param appointments => daftar appointment yang akan di render
 */
function renderResult(appointments) {
	let results = document.getElementsByClassName('wrapper')[0];
	results.textContent = '';

	for (const appointment of appointments) {
		let card = document.createElement('div');
		card.classList.add('card');

		if (appointment.poli === 'umum') {
			card.classList.add('umum');
		} else if (appointment.poli === 'anak') {
			card.classList.add('anak');
		} else if (appointment.poli === 'internis') {
			card.classList.add('internis');
		} else if (appointment.poli === 'bedah') {
			card.classList.add('bedah');
		} else if (appointment.poli === 'gigi') {
			card.classList.add('gigi');
		}

		let nama = document.createElement('span');
		nama.style.fontWeight = '600';
		nama.textContent = appointment.name.toUpperCase();

		let dataPasien = document.createElement('span');
		let birthday = new Date(appointment.tglLahir);
		birthday = `${birthday.getDate()}/${
			birthday.getMonth() + 1
		}/${birthday.getFullYear()}`;
		dataPasien.textContent = `${appointment.gender.toUpperCase()} - ${birthday}`;

		let poli = document.createElement('span');
		poli.style.fontWeight = '600';
		poli.textContent = `Poliklinik ${appointment.poli}`;

		let dokter = document.createElement('span');
		dokter.textContent = appointment.dokter;

		let booking = document.createElement('span');
		let bookingDate = new Date(appointment.dateBooking);
		bookingDate = `${bookingDate.getDate()}/${
			bookingDate.getMonth() + 1
		}/${bookingDate.getFullYear()}`;
		booking.textContent = `${bookingDate} - ${appointment.jam}`;

		let keluhan = document.createElement('span');
		keluhan.textContent = appointment.keluhan;

		let button = document.createElement('button');
		button.classList.add('cancel');
		button.setAttribute('id', appointment.idPengunjung);
		button.textContent = 'Cancel Appointment';
		button.addEventListener('click', handleDelete);

		card.appendChild(nama);
		card.appendChild(dataPasien);
		card.appendChild(poli);
		card.appendChild(dokter);
		card.appendChild(booking);
		card.appendChild(keluhan);
		card.appendChild(button);

		results.appendChild(card);
	}
}

// ======= Function untuk DELETE appointment

/**
 * handleDelete
 *
 * Event handler (click) untuk menghapus appointment dari db_appointments dan
 * menghapus card appointment tersebut dari DOM
 * @param event
 */
function handleDelete(event) {
	let id = event.target.id;

	let output = [];

	output = db_appointments.filter(function (value) {
		return value.idPengunjung !== id;
	});

	db_appointments = output;

	event.target.parentElement.remove();
}

// ======= Functions untuk handle close alert =======

// tambah event listener (click) untuk button close alert success
document
	.getElementById('close-alert-success')
	.addEventListener('click', function (event) {
		document.getElementById('alert-success').style.display = 'block';
	});

// tambah event listener (click) untuk button close alert warning
document
	.getElementById('close-alert-warning')
	.addEventListener('click', function (event) {
		document.getElementById('alert-warning').style.display = 'block';
	});
