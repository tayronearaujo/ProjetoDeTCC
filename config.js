const config = [
    {
        "name": "Objects behavior visual analysis system",
        "serverDirectory": "http://localhost:8080/objects-behavior-visual-analysis-system/",
        "destinationApiFiles": "http://localhost:8080/tcc/src/modules/videoProcess/uploadFiles/",
        "defaultParameters": [
            {
                "description": "Arquivo de vídeo formato:",
                "extension": ".mp4",
                "required": true
            },
            {
                "description": "Arquivo com sua análise de frames formato:",
                "extension": ".json",
                "required": true
            }
        ]
    },
    {
        "name": "Visual analysis system X",
        "serverDirectory": "http://127.0.0.1:5555/index.html",
        "destinationApiFiles": "",
        "defaultParameters": [
            {
                "description": "Arquivo formato excel:",
                "extension": ".exl",
                "required": true
            },
            {
                "description": "Arquivo de imagens",
                "extension": ".png",
                "required": true
            }
        ]
    },
    {
        "name": "Visual analysis system Y",
        "serverDirectory": "http://127.0.0.1:5556/index.html",
        "destinationApiFiles": "",
        "defaultParameters": [
            {
                "description": "Arquivo formato texto:",
                "extension": ".txt",
                "required": true
            },
            {
                "description": "Arquivo com sua análise de frames formato:",
                "extension": ".py",
                "required": true
            }
        ]
    }
]