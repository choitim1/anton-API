FROM cypress/browsers:node14.16.0-chrome90-ff88
RUN mkdir /app
WORKDIR /app
COPY ./package.json /app
COPY ./cypress.json /app
COPY ./package-lock.json /app
COPY ./cypress ./cypress
COPY ./js_examples ./js_examples
RUN npm install


ENTRYPOINT ["npm", "run", "alltests"]
CMD [""]

# Используем базовый образ Windows Server Core
#FROM mcr.microsoft.com/windows/servercore:ltsc2019
#
## Устанавливаем необходимые пакеты и зависимости
#SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]
#
## Установка Chocolatey
#RUN Set-ExecutionPolicy Bypass -Scope Process -Force; \
#    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; \
#    iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
#
## Установка Node.js и Cypress
#RUN choco install nodejs-lts -y
#RUN npm install -g cypress
#
## Установка браузера Chrome
#RUN choco install googlechrome -y
#
## Копирование исходных файлов тестов в контейнер
#COPY . /app
#WORKDIR /app
#
## Запуск Cypress в режиме GUI
#CMD ["cypress", "open"]
