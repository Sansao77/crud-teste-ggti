# Usa uma imagem oficial Node.js como base
FROM node

# Define o diretório de trabalho na imagem
WORKDIR /app

# Copia os arquivos package.json e package-lock.json
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Expõe a porta do container
EXPOSE 4200

# Comando para iniciar a aplicação
CMD ["npm", "start"]
