FROM hectorbastida/loopback


# Create app directory
RUN mkdir /app
WORKDIR /app

# Install app dependencies
COPY package.json /app
RUN npm install

# Copy files to  app directory
COPY . /app

# Define run script
CMD [ "npm", "start" ]