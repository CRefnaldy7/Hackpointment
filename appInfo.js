let dataSekarang = JSON.parse(localStorage.getItem('dataSekarang'))
let username = localStorage.getItem('username')
let informasiAkun = JSON.parse(localStorage.getItem('informasiAkun'))

let nama = document.getElementById('nama')
let umur = document.getElementById('umur')
let hari = document.getElementById('hari')
let jam = document.getElementById('jam')

for (let i = 0; i < informasiAkun[username]; i++){
    let element = informasiAkun[username][i]
    console.log(element)
    let hariTerbook = element.hari
    let jamTerbook = element.jam
    if (hariTerbook === hari && jamTerbook === jam){
        dokter.innerText = element.dokter
    }
}


nama.innerText = dataSekarang.nama
umur.innerText = dataSekarang.umur
hari.innerText = dataSekarang.hari
jam.innerText = dataSekarang.jam
dokter.innerText = dataSekarang.dokter
