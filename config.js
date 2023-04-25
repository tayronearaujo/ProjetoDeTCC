const config = [
    {
        "name": "Objects behavior visual analysis system",
        "serverDirectory": "http://127.0.0.1:5501/index.html",
        "destinationApiFiles": "http://localhost:8080/diretorioBackend/",
        "defaultParameters": [
            {
                "description": "Arquivo de vídeo formato:",
                "extension": ".mp4",
                "required": true
            },
            {
                "description": "Arquivo com sua análise de frames formato:",
                "extension": ".json",
                "required": false
            }
        ]
    },
    {
        "name": "Visual analysis system X",
        "serverDirectory": "http://127.0.0.1:5501/index.html",
        "destinationApiFiles": "",
        "defaultParameters": [
            {
                "description": "Arquivo formato excel:",
                "extension": ".exl"
            },
            {
                "description": "Arquivo de imagens",
                "extension": ".png"
            }
        ]
    },
    {
        "name": "Visual analysis system Y",
        "serverDirectory": "http://127.0.0.1:5501/index.html",
        "destinationApiFiles": "",
        "defaultParameters": [
            {
                "description": "Arquivo formato texto:",
                "extension": ".txt"
            },
            {
                "description": "Arquivo com sua análise de frames formato:",
                "extension": ".py"
            }
        ]
    }
]



//"destinationApiFiles": "http://127.0.0.1:5500/diretorioBackend/"