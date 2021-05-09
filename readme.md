# covid-vaccine-tracker

A Tracker to Check the availability of vaccine through pincode and buzzer in case of availability

-- Checks availability of covid vaccine in the given lists of pincodes
-- Alert you by buzzer in case vaccine is available

# Prerequisites

- (mandatory)
  - Git
  - Node
  - NPM

# To set up the application follow the below steps

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

- open config.js file
- fill out your desired pincodes
- change the duration of the checking intervals if you want (enter the values in seconds).

start the script

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

# Example Commands

- `npm start hide-output`
- `npm start mute-sound`
- `npm start hide-output mute-sound`
