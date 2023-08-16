/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         fontFamily: {
            custom: ["'Anek Telugu', sans-serif"],
         },
         keyframes: {
            transition_image_one: {
               "0%": {
                  opacity: 1,
               },
               "50%": {
                  opacity: 0,
               },
               "100%": {
                  opacity: 1,
               },
            },
            transition_image_two: {
               "0%": {
                  opacity: 0,
               },
               "50%": {
                  opacity: 1,
               },
               "100%": {
                  opacity: 0,
               },
            },
            text_scrolling:{
               "0%":{
                  left: "0%",
               },
               "100%":{
                  left: "-100%",
               }
            },
            loader_animation: {
               "0%":{width: "3%"},
               "50%":{width: "100%"},
               "100%":{width: "3%"},
            },
            loader_text_animation: {
               "0%":{width: "0%"},
               "50%":{width: "100%"},
               "100%":{width: "0%"},
            }
         },
         animation: {
            transitionimageone: "transition_image_one 8s ease-in-out infinite",
            transitionimagetwo: "transition_image_two 8s ease-in-out infinite",
            text_scrolling: "text_scrolling 5s linear infinite",
            loader_animation: "loader_animation 8s ease-in-out infinite",
            loader_text_animation: "loader_text_animation 3s linear infinite"
         },
      },
   },

};
