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

localStorage.setItem('akun', JSON.stringify(akun));
localStorage.setItem('informasiAkun', JSON.stringify(informasiAkun));
localStorage.setItem('jadwalDokter', JSON.stringify(jadwalDokter));


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
        localStorage.setItem('statusValidasi', statusValidasi)
        console.log(statusValidasi)
        window.location.replace("home.html");
        return false;
    }
})