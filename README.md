# Coffee Shop Web Application
This is a coffee shop web application build with React and Aws amplify as backend. It consists of a 
home page, product detail page and a checkout screen.
<br />
This webapp is hosted on aws amplify. [See the demo](https://stagging.d263mi7ea5qb6k.amplifyapp.com/).
> ⚠️ The images on the webpage might take while to load because they have not been compressed and 
> optimized by a CDN. Ideally in production a CDN will be used to serve image assets
> 
## Technologies & Languages
- [x] React v18.2.0
- [x] Amplify v5.0.5
- [x] Typescript v4.9.4
- [x] Sass v1.56.2

## Plugins & Tools
- [Formik](https://formik.org/)
- [React redux](https://react-redux.js.org/)
- [react-icons](https://react-icons.github.io/react-icons)
- [react-toastify](https://fkhadra.github.io/react-toastify/introduction)
- [Tailwind CSS](https://tailwindcss.com/)
- WebStorm Code Editor

## Screenshots
<img style="width: 49.5%;display: inline-block;"  alt="Screen Shot 1" src="https://user-images.githubusercontent.com/25336761/207642075-58dd6cbc-b133-41f4-acc7-27ec62985cf4.png">
<img style="width: 49.5%;display: inline-block;"  alt="Screen Shot 1" src="https://user-images.githubusercontent.com/25336761/207642110-62487cc4-de37-4a68-88cb-7db5391c084b.png">
<img style="width: 49.5%;display: inline-block;"  alt="Screen Shot 1" src="https://user-images.githubusercontent.com/25336761/207642145-08352c4a-59dc-492e-beae-c616d8fac833.png">
<img style="width: 49.5%;display: inline-block;"  alt="Screen Shot 1" src="https://user-images.githubusercontent.com/25336761/207642217-40d6209a-6391-4038-a773-5fd7c76a09fb.png">
<img style="width: 49.5%;display: inline-block;"  alt="Screen Shot 1" src="https://user-images.githubusercontent.com/25336761/207642289-84d9cb13-9468-4079-8b80-43ea42222526.png">


## Project structure
```
-───amplify
-───node_modules
-───public
-───src
│   └───components
│   |   │   Button.tsx
│   |   │   Cart.tsx
│   |   │   Header.tsx
│   |   │   Input.tsx
│   |   │   Layout.tsx
│   |   │   QuantityInput.tsx
│   |   │   SkeletonLoader.tsx
│   └───data
│   └───models
│   └───pages
│   |   │   Checkout.tsx
│   |   │   Home.tsx
│   |   │   Product.tsx
│   └───routes
│   └───store
│   └───styles
│   index.tsx  
│   index.scss
│   package.json
```
### src/components
Reusable independent bits of code which are used in all the pages.
- `Button.tsx`:  A custom HTML button with loading function
- `Cart.tsx`: Cart modal with floating action button toggle
- `Header.tsx`: Toolbar component
- `Input.tsx`: A custom input element with validation states
- `QuantityInput.tsx`: An input field used to set the quantity of the product
- `SkeletonLoader.tsx`: This loader is displayed on a page while data is being fetched from the backend

### src/pages
- `Home.tsx` Home screen
- `Product.tsx` Product detail screen
- `Checkout.tsx` Checkout screen
