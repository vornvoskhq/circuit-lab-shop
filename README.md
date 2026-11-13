# Circuit Lab Shop

Build a website ("Circuit Complete") to sell electronic components.

The site needs an easy to navigate, stylish, and hypermodern engineering aesthetic with an accessible Stripe payment system, shopping cart, and search/filter controls.

Current stock is radio electronics parts populated from github.com/vornvoskhq/compwar with product images, header photos, and spec sheets:

- Variable Capacitors: Cardwell ZR-75-AS, Dual Gang 289-42, Dual Gang 922111-2 (575pF), Hammarlund ES-675536-9, Johnson KS-16471L1, Knight 1255, Triple Gang 153210
- Semiconductors & Power: 1N5402 Rectifier Diodes, PN2907A Transistor, LM317 Voltage Regulator
- Electromechanical: Illuminated blue rocker switches

The inventory should be well organized, displaying key characteristics from the spec sheets (ratings, capacitance range, surge current, tolerances) directly on the component cards, with a way for customers to view the full spec sheets and datasheets.

Also include upcoming categories:

- Industrial electronics, CAN bus tools, physical and electronic entry tools, counter surveillance electronics

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3474e566-2c4e-4cd0-afac-ea3940854c4f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
