let informasiAkun = JSON.parse(localStorage.getItem('informasiAkun'))

// let informasiAkun = {
//     refnaldy: [{ nama: 'ref', jam: 5 , hari: 'Senin'}],
//     galih: [],
//     allizha: [],
//     satya: [],
//     johan: []
// }


for (let key in informasiAkun) {
    let element = informasiAkun[key]
    for (let i = 0; i < element.length; i++) {
        let perJanji = element[i]
        let nama = perJanji.nama
        let dokter = perJanji.dokter
        let jam = perJanji.jam
        let hari = perJanji.hari

        // console.log(dokter, jam, hari)

        let table = document.getElementById('table-body')
        // let newData = document.createElement('tr')
        // table.appendChild(newData)
        table.innerHTML += `<tr>
            <td>${i + 1}</td>
            <td>${nama}</td>
            <td>${dokter}</td>
            <td>${jam}</td>
            <td>${hari}</td>
        </tr>`
    }
}


