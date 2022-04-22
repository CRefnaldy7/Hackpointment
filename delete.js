let informasiAkun = JSON.parse(localStorage.getItem("informasiAkun"))
let username = localStorage.getItem('username')

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
                localStorage.setItem("informasiAkun", JSON.stringify(informasiAkun))
                flag = true
            }
        }
    }
    
    if (!flag){
        swal('Tidak ada jadwal pada hari dan jam tersebut')
    } else {
        swal('Jadwal Anda Telah Terhapus')
        localStorage.setItem('informasiAkun', JSON.stringify(informasiAkun))
    }
})