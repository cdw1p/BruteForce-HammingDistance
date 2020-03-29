'use strict'

const readlineSync  = require('readline-sync')
const symbols = require('log-symbols')
require('colors')

const HeaderLogo = () => {
    console.log(`
    _                 __            
    |_) __   _|_ _    |_  _  __ _  _ 
    |_) | |_| |_(/_   |  (_) | (_ (/_
    |
    | String Matching & Hamming Distance
    | - by Kelompok 15
    | * Cahyo Dwi Putro (1461900333)
    ----------------------------------\n`)
}

function hammingDistance(stringA, stringB) {
    let result = 0
    if (stringA.length == stringB.length) {
        for (let i=0; i<stringA.length; i++) {
            if (stringA[i].toLowerCase() != stringB[i].toLowerCase()) {
                result++
            }
        }
        return result
    } else {
        return false
    }
}

const sum = (array) => {
    const sumArray = array.reduce((prevValue, currentValue) => {
        return prevValue + currentValue.panjang
    }, 0)
    return { tag: array[0].tag, jumlah: sumArray }
}


(async () => {
    try {
        await HeaderLogo()
        const resData = []
        const dataHD  = []
        const totalHD = []
        const string = readlineSync.question('[?] Masukan Kalimat: ')
        const filter = [
            { kategori: 'Olahraga', tag: ['balapan', 'motogp', 'balap', 'bola', 'basket', 'sepak', 'lapangan'] },
            { kategori: 'Politik', tag: ['partai', 'pemilu', 'pilkada', 'pemilihan', 'dpr', 'dpd', 'dprd', 'mpr', 'jokowi', 'prabowo'] },
            { kategori: 'Gaming', tag: ['point blank', 'dota 2', 'mobile legend', 'free fire', 'lost saga', 'pertandingan esport', 'esport', 'gamers'] }
        ]

        console.log(`\n[*] Program dimulai...`.green)
        console.log(`[*] Memulai untuk menganalisis...`.green)
        console.log(`--- Kalimat memliki jumlah kata sebanyak ${string.split(' ').length} kata...`.yellow)
        console.log(`--- Berhasil memuat ${filter.length} kategori yaitu :${filter.map(item => ` ${item.kategori}`)}`.yellow)

        for (var i=0; i<filter.length; i++) {
            filter[i].tag.map(async item => {
                var pattern = new RegExp(item, 'gi')
                var match = string.match(pattern)
                if (match) {
                    resData.push({ kategori: filter[i].kategori, tag: item })
                }
            })
        }

        console.log(`--- Program menemukan patern/pola sebagai berikut :`.yellow)
        resData.map(item => console.log(`\t-> Kata "${`${item.tag}`.bgRed}" (termasuk kategori ${`${item.kategori}`.bgRed})`))

        console.log(`\n[*] Menghitung hamming distance...`.green)
        string.split(' ').map(kata => {
            resData.map(item => {
                let check = hammingDistance(kata, item.tag)
                if (check) {
                    dataHD.push({ tag: item.tag, panjang: check })
                }
            })
        })

        resData.map(data => {
            const newArray = dataHD.filter(element =>  element.tag == data.tag)
            const resultSum = sum(newArray)
            console.log(`\t-> Kata "${`${resultSum.tag}`.bgRed}" memiliki hamming distance sebanyak ${`${resultSum.jumlah}`.bold.cyan}`)
        })

        console.log(`\n[*] Program selesai dijalankan ${symbols.success}`.green)
    } catch(e) {
        console.error(e)
    }
})()