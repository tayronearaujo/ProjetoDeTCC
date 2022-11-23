import os
import cv2

def handleInitFile():
    if os.path.isdir(dirPathName): 
        try:
            os.rmdir(dirPathName)
            # print("File deleted !")  

        except OSError as e:
            print(f"Error:{ e.strerror}")
   
    os.mkdir(dirPathName)
    # print("File created!") 

# dirPathName = '../../backend/frames'
dirPathName = 'C:/Users/Tayrone/Desktop/ufu/Tcc/tcc/src/backend/frames'
handleInitFile()
vidcap = cv2.VideoCapture('video.mp4')
count = 0
while True:
    success,image = vidcap.read()
    if not success:
        break
    cv2.imwrite(os.path.join(dirPathName,"frame{:d}.png".format(count)), image)
    count += 1

print(count)
# print("{} images are extacted in {}.".format(count,dirPathName))

