<h1 align="center">Welcome to covid-vaccine-tracker 👋</h1>

A Tracker to Check the availability of vaccine through pincode and buzzer in case of availability

### 🏠 [Homepage](https://github.com/ayu023ban/covid-vaccine-tracker#readme)

### 🌐 [Web Interface](https://ayu023ban.github.io/covid-vaccine-tracker/)

## Prerequisites
- Git
- Node
- NPM

## Install

- Clone the repository through https or ssh

**ssh version**

```
git clone git@github.com:ayu023ban/covid-vaccine-tracker.git
```

**https_version**

```
git clone https://github.com/ayu023ban/covid-vaccine-tracker.git
```

- Install the dependencies

```
npm install
```

alternatively you can also use

```
yarn install
```
## Set Configurations
- open config.js file
- fill out your desired pincodes
- change the duration of the checking intervals if you want (enter the values in seconds).

## Usage

```
npm start
```

alternatively you can also use

```
yarn start
```

## Flags

- ### hide-output
  hides the message of trying again and again and only show result if it has found vaccine.
- ### mute-sound
  mutes the buzzer sound on finding the vaccine.

## Example Commands

- `npm start hide-output`
- `npm start mute-sound`
- `npm start hide-output mute-sound`


### Link to the web interface: https://ayu023ban.github.io/covid-vaccine-tracker/

### Code of the web interface is in `web` branch

***
## Author

👤 **ayush bansal**

* Website: http://ayu023ban.github.io
* Github: [@ayu023ban](https://github.com/ayu023ban)

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [ayush bansal](https://github.com/ayu023ban).<br />
This project is [ISC](https://github.com/ayu023ban/covid-vaccine-tracker/blob/master/LICENSE) licensed.
