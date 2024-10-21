# Ridge Runners Duck Racing Application

This is a web application that demonstrates duck race using Vue.js and TailwindCSS.

## Sections

The application has three different sections:

### Racing Track

This section contains eight race tracks. The countdown begins by pressing the "Start Race" button in the Header. When the countdown is over, the race of the ducks starts. The speed of the racers changes randomly at random time intervals until the race is over. When the last racer completes the race, the top three ranked racers are displayed.

### Leaderboard

In this section, the rankings of the racers live are shown together with their lane numbers.

### Racing Lane Settings

This dialog window opens when the settings icon in the Footer is pressed. It has racer name and lane color setting for each race lane. Changed settings are reflected directly on the race track, but are saved in localStorage when the save button is pressed.

## Getting Started

To get started you can simply clone this `ridge-runners-duck-racing` repository and install the dependencies.

Clone the `ridge-runners-duck-racing` repository using git:

```bash
git clone https://github.com/aaronbean/ridge-runners-duck-racing.git
cd ridge-runners-duck-racing
```

Install dependencies with this command:

```bash
npm install
```

Run the application with this command:

```bash
npm run dev
```

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/)
- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [TailwindCSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

### Built With:

- [Vue.js](https://vuejs.org/)
- [TailwindCSS](https://tailwindcss.com/)
