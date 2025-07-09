This Breweries Project uses boostraped Next.js

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000/breweries](http://localhost:3000/breweries)

## Project Considerations
State:
 - This project is using useEffect and setState because the scope did not warrant use of Redux
 - Considering the growth in scope/amount of data/scalibilty it would be worth to implment Redux as the scope grows
Filtering:
 - Using built-in JavaScript filtering allows us to reduce overhead and leverage modern JavaScript engines that are already highly optimized to execute native array methods.
 - Should the filtering logic become too verbose for niche or highly complex needs, implementing a sorting/filtering library might be necessary.



