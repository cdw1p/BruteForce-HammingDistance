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
        return 'Strings do not have equal length'
    }
}

(async () => {
    try {
        // console.log(hammingDistance('kata1', 'kata2'))
        await HeaderLogo()
        const timeStart = new Date()
        const resData = []
        const string = readlineSync.question('[?] Masukan Kalimat: ')
        const filter = [
            { kategori: 'Olahraga', tag: ['balapan', 'motogp', 'balap', 'bola', 'basket', 'sepak', 'lapangan'] },
            { kategori: 'Politik', tag: ['partai', 'pemilu', 'pilkada', 'pemilihan', 'dpr', 'dpd', 'dprd', 'jokowi', 'prabowo'] },
            { kategori: 'Gaming', tag: ['point blank', 'dota 2', 'mobile legend', 'free fire', 'lost saga', 'pertandingan esport', 'esport', 'gamers'] }
        ]
        
        console.log(`\n[@ ${new Date()-timeStart}ms] Program dimulai...`.green)
        console.log(`[@ ${new Date()-timeStart}ms] Memulai untuk menganalisis...`.green)
        console.log(`--- Kalimat memliki jumlah kata sebanyak ${string.split(' ').length} kata...`.yellow)
        console.log(`--- Berhasil memuat ${filter.length} kategori yaitu :${filter.map(item => ` ${item.kategori}`)}`.yellow)

        for (var i=0; i<filter.length; i++) {
            filter[i].tag.map(async item => {
                var pattern = new RegExp(item, 'gi')
                var match = string.match(pattern)
                if (match) {
                    resData.push({
                        kategori: filter[i].kategori,
                        tag: item
                    })
                }
            })
        }

        console.log(`--- Program menemukan patern/pola sebagai berikut :`.yellow)
        resData.map(item => console.log(`\t-> Kata "${`${item.tag}`.bgRed}" (termasuk kategori ${`${item.kategori}`.bgRed})`))
        console.log(`\n[@ ${new Date()-timeStart}ms] Program selesai dijalankan ${symbols.success}`.green)
    } catch(e) {
        console.error(e)
    }
})()