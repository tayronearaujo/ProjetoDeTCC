import http.server
import socketserver
import threading
import signal

class CORSRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def start_server():
    PORT = 8080
    with socketserver.TCPServer(("", PORT), CORSRequestHandler) as httpd:
        print("Servindo na porta", PORT)
        httpd.serve_forever()

def keep_alive():
    while True:
        pass

def stop_server(signal, frame):
    print("Parando o servidor...")
    httpd.shutdown()
    httpd.server_close()

# Inicia o servidor em uma thread separada
server_thread = threading.Thread(target=start_server)
server_thread.start()

# Mantém o servidor ativo em outra thread
keep_alive_thread = threading.Thread(target=keep_alive)
keep_alive_thread.start()

# Configura o sinal para parar o servidor
signal.signal(signal.SIGINT, stop_server)

# Aguarda até o encerramento do servidor
server_thread.join()