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

let jadwalDokter = JSON.parse(localStorage.getItem('jadwalDokter'))
let informasiAkun = JSON.parse(localStorage.getItem('informasiAkun'))
let username = localStorage.getItem('username')


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
    // console.log(obj.nama, obj.umur, obj.spesialis, obj.hari, obj.jam)
    let appointment = setAppointment(jadwalDokter, obj)
    console.log(appointment)
    if (typeof appointment !== 'string'){
        obj.dokter = appointment.dokter
        localStorage.setItem('dataSekarang', JSON.stringify(obj))
    
        informasiAkun[username].push(appointment)
        // informasiAkun.refnaldy.push(appointment)
        console.log(informasiAkun)
        localStorage.setItem('informasiAkun', JSON.stringify(informasiAkun))
        window.location.replace("appInfo.html");
        return false;
    } else {
        swal("Jadwal tidak tersedia");
    }
})