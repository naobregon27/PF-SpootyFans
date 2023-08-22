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
            },
            multicolor_text: {
               "0%":{color: "#9CFF00"},
               "50%":{color: "#FFC6F3"},
               "100%":{color: "#88C5F9"}
            },
            burbujas: {
               "0%": {
                  top: "-10%",
                  opacity: "1",
               },
               "10%":{transform: "translateX(40px)"},
               "20%":{transform: "translateX(-20px)"},
               "30%":{transform: "translateX(40px)"},
               "40%":{transform: "translateX(-20px)"},
               "50%":{transform: "translateX(40px)"},
               "60%":{transform: "translateX(-20px)"},
               "70%":{transform: "translateX(40px)"},
               "80%":{transform: "translateX(-20px)"},
               "90%":{transform: "translateX(40px)"},
               "100%": {
                  top: "100%",
                  opacity: "0",
                  transform: "translateY(-3)"
               }
            }
         },
         animation: {
            transitionimageone: "transition_image_one 8s ease-in-out infinite",
            transitionimagetwo: "transition_image_two 8s ease-in-out infinite",
            text_scrolling: "text_scrolling 5s linear infinite",
            loader_animation: "loader_animation 8s ease-in-out infinite",
            loader_text_animation: "loader_text_animation 3s linear infinite",
            multicolor_text:"multicolor_text 5s ease-in-out infinite",
            burbujas: "burbujas 15s ease-in-out infinite 0.5s",
            burbujas1: "burbujas 15s ease-in-out infinite 2s",
            burbujas2: "burbujas 15s ease-in-out infinite 1.5s",
            burbujas3: "burbujas 15s ease-in-out infinite ",
            burbujas4: "burbujas 15s ease-in-out infinite ",
         },
      },
   },

};
