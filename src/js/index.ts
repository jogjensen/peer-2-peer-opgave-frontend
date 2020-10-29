import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"

interface IRecords {
    id: number,
    title: string,
    artist: string,
    yop: number,
    albumRating: number,
}
//comment
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
        inputData: { id: 0, title: "", artist: "", yop: 0, albumRating: 0 },
        addMessage: "",
        idToDelete: "",
        deleteMessage: "",
        idToUpdate: null,
        updateData: { id: 0, title: "", artist: "", yop: 0, albumRating: 0 },
        updateMessage: "",
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
        deleteRecordById(id: number): void {
            let uri: string = baseUrl + "/" + id
            console.log("deleteRecordById " + uri)
            axios.delete<number>(uri)   
                .then((response: AxiosResponse<number>) => {
                    console.log("deleteRecordById result " + response.data)
                    if (response.data == 1) {
                        this.deleteMessage = "Record deleted"
                        this.getAndShowAllRecords()
                    } else {
                        this.deleteMessage = "No such record"
                    }
                })
                .catch((error: AxiosError) => {
                    alert(error.message)
                })
        },

        updateRecord(id: number): void {
            let uri: string = baseUrl + "/" + id
            console.log("update record " + uri)
            console.log(this.updateData)
            axios.put<number>(uri, this.updateData)
                .then((response: AxiosResponse<number>) => {
                    if (response.data == 1) {
                        this.updateMessage = "Record updated"
                        this.getAndShowAllRecords()
                    } else {
                        this.updateMessage = "No such Records"
                    }
                })
                .catch((error: AxiosError) => {
                    alert(error.message)
                })
        }
    }

})

        
