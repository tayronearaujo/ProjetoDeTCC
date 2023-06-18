import os
import cv2
import shutil
import json

# def load_config(config_file_path):
#     try:
#         with open(config_file_path) as config_file:
#             config_data = json.load(config_file)
#         return config_data
#     except FileNotFoundError:
#         print(f"Erro: Arquivo '{config_file_path}' não encontrado.")
#     except json.JSONDecodeError:
#         print(f"Erro: Arquivo '{config_file_path}' contém um formato JSON inválido.")
#     except Exception as e:
#         print(f"Erro: Ocorreu um erro ao ler o arquivo '{config_file_path}': {str(e)}")

# def handleInitFile(dirPathName):
#     if os.path.isdir(dirPathName):
#         try:
#             # os.rmdir(dirPathName)
#             shutil.rmtree(dirPathName)
#             print(f"Limpando diretório...")
#         except OSError as e:
#             print(f"Erro: {e.strerror}")
#     try:
#         os.makedirs(dirPathName)
#         print(f"Diretório '{dirPathName}' criado com sucesso.")
#     except OSError as e:
#         print(f"Erro ao criar o diretório '{dirPathName}': {e.strerror}")


# def capture_frames(video_path, output_dir):
#     vidcap = cv2.VideoCapture(video_path)
#     count = 0

#     while True:
#         success, image = vidcap.read()
#         if not success:
#             break

#         frame_path = os.path.join(output_dir, f"frame{count}.png")
#         cv2.imwrite(frame_path, image)
#         count += 1

#     print(f"Total de imagens criadas: {count}!")


# script_dir = os.path.dirname(os.path.abspath(__file__))
# config_file_path = os.path.join(script_dir, 'userDirectory.json')
# config = load_config(config_file_path)

# dirPathName = config['dirPathName']
# videoPathName = config['videoPathName']

# dirPathName = 'C:/Users/Tayrone/Desktop/ufu/Tcc/server/objects-behavior-visual-analysis-system/uploadFiles/frames'
# videoPathName = 'C:/Users/Tayrone/Desktop/ufu/Tcc/server/objects-behavior-visual-analysis-system/uploadFiles/video.mp4'
# handleInitFile(dirPathName)
# capture_frames(videoPathName, dirPathName)


import os
import cv2
import shutil

def load_config(config_file_path):
    try:
        with open(config_file_path) as config_file:
            config_data = json.load(config_file)
        return config_data
    except FileNotFoundError:
        print(f"Erro: Arquivo não encontrado.")
    except json.JSONDecodeError:
        print(f"Erro: Arquivo contém um formato JSON inválido.")
    except Exception as e:
        print(f"Erro: Ocorreu um erro ao ler o arquivo '{config_file_path}': {str(e)}")

def handleInitFile(dirPathName):
    if os.path.isdir(dirPathName):
        try:
            # os.rmdir(dirPathName)
            shutil.rmtree(dirPathName)
            print(f"Limpando diretório...")
        except OSError as e:
            print(f"Erro: {e.strerror}")
    try:
        os.makedirs(dirPathName)
        print(f"Diretório criado com sucesso.")
    except OSError as e:
        print(f"Erro ao criar o diretório '{dirPathName}': {e.strerror}")

def capture_frames(video_path, output_dir):
    vidcap = cv2.VideoCapture(video_path)
    count = 0

    while True:
        success, image = vidcap.read()
        if not success:
            break

        frame_path = os.path.join(output_dir, f"frame{count}.png")
        cv2.imwrite(frame_path, image)
        count += 1

    print(f"Total de imagens criadas: {count}!")


script_dir = os.path.dirname(os.path.abspath(__file__))
config_file_path = os.path.join(script_dir, 'userDirectory.json')
config = load_config(config_file_path)

dirPathName = config['dirPathName']
videoPathName = config['videoPathName']


handleInitFile(dirPathName)
capture_frames(videoPathName, dirPathName)

