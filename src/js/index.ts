//Kald på rest
let baseUrl: string = "http://recordsrest.azurewebsites.net/api/records"

// import axios, {
//     AxiosRespone,
//     AxiosError
// } from "../../node_modules/axios/index"

interface IRecords{
    id: number,
    title: string,
    artist: string,
    yop: number,
    albumRating: number
}





new Vue({
    // TypeScript compiler complains about Vue because the CDN link to Vue is in the html file.
    // Before the application runs this TypeScript file will be compiled into bundle.js
    // which is included at the bottom of the html file.
    el: "#app",








    
    data: {
        name: "",
        greeting: ""
    },
    methods: {
        sayHello() {
            console.log("Say Hello " + this.name)
            if (this.name == "") {
                this.greeting = "Hello NoName"
            }
            else {
                this.greeting = "Hello " + this.name
            }
        }
    }
})