FROM cypress/browsers:node14.16.0-chrome90-ff88
RUN mkdir /app
WORKDIR /app
COPY ./package.json /app
COPY ./cypress.json /app
COPY ./package-lock.json /app
COPY ./cypress ./cypress
COPY ./js_examples ./js_examples
RUN npm install


ENTRYPOINT ["npm", "run", "test"]
CMD [""]