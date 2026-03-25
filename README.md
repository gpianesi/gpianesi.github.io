# Trabbrella
Trabbrella is a website prototype for a travel beach umbrella product. I decided to create this website since the product is an actual idea that came to my mind during a beach day. I wouldn't mind in the future to really try to develop this product, so i though it would be worthy to try setting up a website.
The website simulates an ecommerce experience, the browsing of the product, the choice of the color, and the management of the cart. The project currently still hasn't a backend for the payment processing, given this is a prototype and it doesn't exist a real product to sell.
I started with a paper sketch, then a digital mockup presented in Assessment 1, and then used Figma tools to get a better understanding of the final design. For the coding part I used VS Code with Claude Sonnet 4.6 to help me write it, using what we covered in the course as a knowledge base and guidelines. I tried to actually understand the coding, and did some parts myself, rather than just copy-pasting blindly.
## Technologies used
The base technologies used are **HTML**, **CSS** and **JavaScript**, but on top of that:
- **React** let me break the UI into components so each piece of the page lives in its own file. It also handles state, so when you add something to the cart only the relevant parts of the page update instead of reloading everything.
- **TypeScript** instead of plain JavaScript. There is a lot of data being passed around between components (cart state, product info, etc.) and TypeScript catches type mismatches in the editor before you even run the code, which saved me a lot of time.
- **Tailwind CSS** instead of writing separate CSS files and constantly switching back and forth, styling things directly in the markup. It also keeps the visual consistent by picking from a set of predefined values for the spacing and colors, instead of choosing individual numbers.
- **Vite** as the build tool. It compiles TypeScript into regular JavaScript, bundles everything for production, and runs the dev server. Without a build tool none of the other technologies would work together. Vite was the easiest to set up and has native support for React and TypeScript out of the box.
- **Radix UI** for interactive components like the cart drawer, buttons and labels. Building accessible components from scratch is a lot of work, and Radix handles all of that out of the box.
## Project structure
```
gpianesi.github.io/
├── index.html              # where the app loads
├── vite.config.ts          # build setup
├── package.json            # dependencies and scripts
├── public/                 # static assets
├── docs/                   # what github pages serves
└── src/
    ├── main.tsx            # hooks React into index.html
    ├── styles/             # all the css files
    └── app/
        ├── App.tsx         # top level component, routing and cart live here
        ├── context/        # cart state
        └── components/     # one file per page section
            └── ui/         # small reusable pieces built on Radix UI
```
## Responsive design
The layout adapts to different screen sizes using Tailwind's responsive prefixes. I tested it on a few desktop monitors and on mobile, and from my tests, all the components re-rearrange depending on screen width.
## Version control
I tried to keep commits small with descriptive commits messages, so the history is easy to follow just by looking at them. Being the initial phase of the project, i commited directly into main, but for best practices the next features should be developed in a separate branch, tested, and then merged into main.
## Testing
I still haven't setup automated testing, but we could implement tools like Selenium to validate the new changes and run regression tests. For now, being at the early stage of development, i think it would be more useful to let real users test the website, navigate it, adding items to the cart, and get their feedbacks on the whole experience, to later tune the website.
## Running the website
To execute the build you first need Node.js 18+.
Execute the following commands to run the website locally:
```
npm i
npm run dev
```
The app will run locally at http://localhost:5173.
To build for production execute:
`npm run build`
## Next Steps
1) correct the footer section, as of now, not all the sections if clicked redirect to the correct page
2) get feedbacks from real users, to fix potential bugs, or elements creating bad user experience
