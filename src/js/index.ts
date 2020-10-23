import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"

interface IRecords {
    id: number,
    title: string,
    artist: string,
    yop: number,
    albumRating: number
}

//Kald på rest
let baseUrl: string = "https://recordsrest.azurewebsites.net/api/records"


new Vue({
    // TypeScript compiler complains about Vue because the CDN link to Vue is in the html file.
    // Before the application runs this TypeScript file will be compiled into bundle.js
    // which is included at the bottom of the html file.
    el: "#app",

    data: {
        name: "",
        greeting: "",
        records: [],
        id: "",
        record: null,
        inputData: {id: 0,title: "", artist: "", yop: 0, albumRating: 0 },
        addMessage: "",
    },
    created(): void {
        console.log("created")
        this.getAndShowAllRecords();
    },

    methods: {
        getAndShowAllRecords(): void {
            axios.get<IRecords[]>(baseUrl)
                .then((response: AxiosResponse<IRecords[]>) => {
                    this.records = response.data
                })
                .catch((error: AxiosError) => {
                    alert(error.message)
                })
        },

        getRecordById(id: number): void {
            let uri: string = baseUrl + "/" + id
            console.log("getRecordById: " + uri)
            axios.get<IRecords>(uri)
                .then((response: AxiosResponse<IRecords>) => {
                    this.record = response.data
                })
                .catch((error: AxiosError) => {
                    alert(error.message)
                })
        },
        addRecord(): void {
            console.log("addRecord")
            axios.post<number>(baseUrl, this.inputData)
                .then((response: AxiosResponse<number>) => {
                    this.addMessage = "Record added"
                    this.getAndShowAllRecords()
                })
                .catch((error: AxiosError) => {
                    alert(error.message)
                })
        },

        },
    }
,)