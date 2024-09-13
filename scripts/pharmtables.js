"use strict"

console.log("Loading pharmtables.js")

let opioid_table = [
    {
        name: "Buprenorphin (s.l.)",
        doses: [0.4, 0.8, 1.2, 1.6, 2, 2.4, 2.8, 3.2, 3.2, 3.6, 4],
        isPlaster: false
    },
    {
        name: "Buprenorphin (s.c., i.m., i.v.)",
        doses: [0.3, 0.6, 0.9, 1.2, 1.5, 1.8, 2.1, 2.4, 3, "high", "high"],
        isPlaster: false
    },
    {
        name: "Buprenorphin TTS (mg/24h)",
        doses: ["low", 0.84, 1.26, 1.68, "high", "high", "high", "high", "high", "high", "high"],
        isPlaster: true
    },
    {
        name: "Buprenorphin TTS (&#181;g/h)",
        doses: ["low", 35, 52,5, 70, "high", "high", "high", "high", "high", "high", "high"],
        isPlaster: true
    },
    {
        name: "Dihydrocodein (oral)",
        doses: [120, 240, 360, "high", "high", "high", "high", "high", "high", "high", "high"],
        isPlaster: false
    },
    {
        name: "Fentanyl TTS (mg/24h)",
        doses: [0.3, 0.6, null, 1.2, null, 1.8, null, 2.4, 3, null, 9],
        isPlaster: true
    },
    {
        name: "Fentanyl TTS (&#181;g/h",
        doses: [12, 25, null, 50, null, 75, null, 100, 125, null, 375],
        isPlaster: true
    },
    {
        name: "Hydromorphon (oral)",
        doses: [4, 8, 12, 16, 20, 24, 28, 32, 40, 80, 120],
        isPlaster: false
    },
    {
        name: "Hydromorphon (s.c./i.v.)",
        doses: [1.5, 3, 4.5, 6, 7.5, 9, 10.5, 12, 13.5, "high", "high"],
        isPlaster: false
    },
    {
        name: "L-Methadon (oral)",
        doses: [7.5, "titration", "titration", "titration", "titration", "titration", "titration", "titration", "titration", "titration", "titration"],
        isPlaster: false
    },
    {
        name: "Morphin (oral/rektal)",
        doses: [30, 60, 90, 120, 150, 180, 210, 240, 300, 600, 900],
        isPlaster: false
    },
    {
        name: "Morphin (s.c./i.m./i.v.)",
        doses: [10, 20, 30, 40, 50, 60, 70, 80, 100, 200, 300],
        isPlaster: false
    },
    {
        name: "Oxycodon (oral)",
        doses: [20, 40, 60, 80, 100, 120, 140, 160, 200, "high", "high"],
        isPlaster: false
    },
    {
        name: "Pethidin (i.v.)",
        doses: [75, 150, 225, 300, "high", "high", "high", "high", "high", "high", "high"],
        isPlaster: false
    },
    {
        name: "Piritramid (i.v./i.m./s.c.)",
        doses: [15, 30, 35, 60, "high", "high", "high", "high", "high", "high", "high"],
        isPlaster: false
    },
    {
        name: "Tapentadol (oral)",
        doses: [100, 200, 300, 400, 500, "high", "high", "high", "high", "high", "high"],
        isPlaster: false
    },
    {
        name: "Tilidin/Naloxon (oral)",
        doses: [150, 300, 450, 600, "high", "high", "high", "high", "high", "high", "high"],
        isPlaster: false
    },
    {
        name: "Tramadol (oral/rektal)",
        doses: [150, 300, 450, 600, "high", "high", "high", "high", "high", "high", "high"],
        isPlaster: false
    },
    {
        name: "Tramadol (s.c./i.m./i.v.)",
        doses: [100, 200, 300, 400, 500, "high", "high", "high", "high", "high"],
        isPlaster: false
    }
];

for (let opioid of opioid_table) {
    if(opioid.doses.length !== 11) {
        console.error("Opioid length test Failed!");
    }
}

let sartan_table = [
    {
        name: "Azilsartan medoxomil",
        doses: []
    },
    {
        name: "Candesartan cilexetil",
        doses: []
    },
    {
        name: "Eprosartan",
        doses: []
    },
    {
        name: "Irbesartan",
        doses: []
    },
    {
        name: "Losartan",
        doses: []
    },
    {
        name: "Olmesartan medoxomil",
        doses: []
    },
    {
        name: "Telmisartan",
        doses: []
    },
    {
        name: "Valsartan",
        doses: []
    },
]