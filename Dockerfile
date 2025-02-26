# Folosește o imagine oficială Node.js ca bază
FROM node:20

# Setează directorul de lucru
WORKDIR /app

# Copiază fișierele necesare
COPY package*.json ./

# Instalează dependențele
RUN npm install

# Copiază codul aplicației
COPY . .

# Expune portul 3000
EXPOSE 3001

# Comanda de start
CMD ["node", "server.js"]