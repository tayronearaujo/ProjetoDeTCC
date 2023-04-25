import os
import cv2

def handleInitFile():
    if os.path.isdir(dirPathName): 
        try:
            os.rmdir(dirPathName)
        except OSError as e:
            print(f"Error:{ e.strerror}")
    
    os.mkdir(dirPathName)
   
dirPathName = 'C:/Users/Tayrone/Desktop/ufu/Tcc/objects-behavior-visual-analysis-system/uploadFiles/frames'
videoPathName = 'C:/Users/Tayrone/Desktop/ufu/Tcc/objects-behavior-visual-analysis-system/uploadFiles/video.mp4'
handleInitFile()

vidcap = cv2.VideoCapture(videoPathName)
count = 0
while True:
    success,image = vidcap.read()
    if not success:
        break
    cv2.imwrite(os.path.join(dirPathName,"frame{:d}.png".format(count)), image)
    count += 1

print(count)


