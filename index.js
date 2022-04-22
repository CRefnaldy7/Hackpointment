const akun = [
    { username: 'refnaldy', password: 'refnaldy' },
    { username: 'galih', password: 'galih' },
    { username: 'allizha', password: 'allizha' },
    { username: 'satya', password: 'satya' },
    { username: 'johan', password: 'johan' },
]

let informasiAkun = {
    refnaldy: [],
    galih: [],
    allizha: [],
    satya: [],
    johan: []
}

const jadwalDokter = [
    {
        nama: 'Darmawijoyo, dr.',
        spesialis: 'Dokter Umum', //7 days
        hari: [`Senin`, `Selasa`, `Rabu`, `Minggu`],
        jam: [8, 9, 10, 11, 14, 15, 16, 17],
    },
    {
        nama: 'Jessica Lim, dr.',
        spesialis: 'Dokter Umum', //7 days
        hari: [`Kamis`, `Jumat`, `Sabtu`],
        jam: [8, 9, 10, 11, 14, 15, 16, 17],
    },
    {
        nama: 'Arlena Rustandi, drg.',
        spesialis: 'Dokter Gigi', // 3 
        hari: [`Senin`, `Rabu`, `Jumat`],
        jam: [8, 10, 14, 16],
    },
    {
        nama: 'Edward Leonard, dr., Sp.A., M.Kes',
        spesialis: 'Spesialis Anak', //7 days
        hari: [`Senin`, `Selasa`, `Rabu`, `Minggu`],
        jam: [8, 9, 10, 11, 14, 15, 16, 17],
    },
    {
        nama: 'Harsono Budiprananta, dr., Sp.A',
        spesialis: 'Spesialis Anak', //7 days
        hari: [`Kamis`, `Jumat`, `Sabtu`],
        jam: [8, 9, 10, 11, 14, 15, 16, 17],
    },
    {
        nama: 'Dino Adriano Halim, dr., Sp.B, D.MAS',
        spesialis: 'Bedah Umum', // 3 days
        hari: [`Selasa`, `Rabu`, `Kamis`],
        jam: [10, 15],
    },
    {
        nama: 'Widiyastuti HQD, dr., Sp.OG.',
        spesialis: 'Spesialis Kandungan', // 2 hari
        hari: [`Selasa`, `Kamis`],
        jam: [10, 15],
    },
]

localStorage.setItem('akun', akun);
localStorage.setItem('informasiAkun', informasiAkun);
localStorage.setItem('jadwalDokter', jadwalDokter);


let username = '' // DOM USERNAME
let password = '' // DOM USERNAME
let statusValidasi

function validasiAkun(username, password) {
    let result = false
    for (let i = 0; i < akun.length; i++) {
        const element = akun[i];
        let usernameAsli = element.username
        let passwordAsli = element.password
        if (username === usernameAsli && password === passwordAsli) {
            result = true
        }
    }
    return result
}


let loginButton = document.getElementById('login-button')
loginButton.addEventListener('click', function (evt) {
    evt.preventDefault()
    username = document.getElementById('username').value
    password = document.getElementById('password').value
    statusValidasi = validasiAkun(username, password)
    if (!statusValidasi) {
        swal('Username atau Password tidak sesuai')
    } else {
        localStorage.setItem('username', username)
        localStorage.setItem('password', password)
        console.log(statusValidasi)
        // window.location.replace("https://sekolahkoding.com/forum/cara-direct-langsung-ke-form-pemesan-setelah-login-1524546315");
        // return false;
    }
})

function generateDokter(jadwalDokter, input) {
    let result = []
    let spesialis = input.spesialis //Dokter Gigi
    for (let i = 0; i < jadwalDokter.length; i++) {
        let perDokter = jadwalDokter[i]; //object
        let spesialisasiDokter = perDokter.spesialis //str
        if (spesialis === spesialisasiDokter) {
            result.push(perDokter)
        }
    }
    return result
}

function generateHari(jadwalDokter, input) {
    let generateDokterResult = generateDokter(jadwalDokter, input)

    let result
    let hari = input.hari//Senin
    for (let i = 0; i < generateDokterResult.length; i++) {
        let perDokter = generateDokterResult[i];
        let hariAvailable = perDokter.hari
        for (let j = 0; j < hariAvailable.length; j++) {
            let perHari = hariAvailable[j];
            if (hari === perHari) {
                result = perDokter
            }
        }
    }
    return result
}

function generateJam(jadwalDokter, input) {
    let generatedHari = generateHari(jadwalDokter, input)

    if (!generatedHari) {
        return `Dokter tidak tersedia di hari itu.`
    }

    let namaPasien = input.nama //Galih
    let umurPasien = input.umur //21
    let jamPasien = input.jam//8
    let hariPasien = input.hari
    let jamDokter = generatedHari.jam
    let result = {
        nama: namaPasien,
        umur: umurPasien,
        hari: hariPasien,
        jam: jamPasien,
        dokter: generatedHari.nama,
    }
    for (let i = 0; i < jamDokter.length; i++) {
        let perJam = jamDokter[i];
        if (perJam === jamPasien) {
            return result
        }
    }
    return `Tidak ada Dokter di jam itu.`
}

function setAppointment(jadwalDokter, input) {
    let appointmentInfo = generateJam(jadwalDokter, input)
    let hari = appointmentInfo.hari
    let jam = appointmentInfo.jam

    for (let key in informasiAkun) {
        let perAkun = informasiAkun[key]
        for (let i = 0; i < perAkun.length; i++) {
            const element = perAkun[i];
            let hariTerbook = element.hari
            let jamTerbook = element.jam

            if (hari === hariTerbook && jam === jamTerbook) {
                return undefined
            }

        }
    }

    return appointmentInfo
}


let formButton = document.getElementById('form-button')
formButton.addEventListener('click', function (evt) {
    evt.preventDefault()
    let obj = {
        nama: document.getElementById('nama').value,
        umur: document.getElementById('umur').value,
        spesialis: document.getElementById('spesialis').value,
        hari: document.getElementById('hari').value,
        jam: Number(document.getElementById('jam').value)
    }
    let appointment = setAppointment(jadwalDokter, obj)

    if (!appointment) {
        swal('Jadwal tidak tersedia')
    } else {
        informasiAkun[username].push(appointment)
        console.log(informasiAkun)
        // window.location.replace("https://sekolahkoding.com/forum/cara-direct-langsung-ke-form-pemesan-setelah-login-1524546315");
        // return false;
    }
})

let deleteButton = document.getElementById('delete-button')
deleteButton.addEventListener('click', function () {
    let hariDelete = document.getElementById('delete-hari').value
    let jamDelete = Number(document.getElementById('delete-jam').value)
    let flag = false

    for (let key in informasiAkun) {
        let perAkun = informasiAkun[key]
        for (let i = 0; i < perAkun.length; i++) {
            let element = perAkun[i]
            let hariTerbook = element.hari
            let jamTerbook = element.jam

            if (hariDelete === hariTerbook && jamDelete === jamTerbook) {
                informasiAkun[username].splice(i, 1)
                flag = true
            }
        }
    }
    
    if (!flag){
        swal('Tidak ada jadwal pada hari dan jam tersebut')
    } else {
        swal('Jadwal Anda Telah Terhapus')
    }
})












// //Output
// appointmentInfo = {
//     username: 'refnaldy',
//     nama: `Galih`,
//     umur: 21,
//     hari: `Senin`,
//     jam: 8,
//     dokter: `Arlena Rustandi, drg.`,
// }

// //Output


// let form = {
//     nama: `Galih`,
//     umur: 21,
//     spesialis: `Dokter Gigi`, //dropdown
//     hari: `Senin`, //dropdown
//     jam: 8 //dropdown
// }
// console.log(generateJam(jadwalDokter, form))