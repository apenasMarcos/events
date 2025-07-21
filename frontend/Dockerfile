# Etapa 1: Buildar a aplicação Angular
FROM node:20-alpine as build-stage

WORKDIR /app

# Copia package.json e package-lock.json (ou yarn.lock) para instalar dependências
COPY package.json ./
# Se você usa package-lock.json, copie-o também:
# COPY package-lock.json ./
RUN npm install --silent # Instala as dependências

# Copia o restante do código fonte
COPY . .

# Compila a aplicação Angular para produção
# Substitua '<nome-da-sua-pasta-do-projeto-angular>' pelo nome da pasta que o ng build gera
# Ex: /app/dist/seu-projeto-angular
RUN npm run build --configuration=production --output-path=./dist/eventmanager_frontend

# Etapa 2: Servir a aplicação com Nginx
FROM nginx:alpine as production-stage

# Copia a configuração personalizada do Nginx (CRUCIAL para SPAs como Angular)
# Certifique-se de criar este arquivo na sua pasta frontend/
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos de build do Angular para o diretório de serviço do Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

# Comando padrão para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
