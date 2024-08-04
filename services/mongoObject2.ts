export class MongoObject2 {
    apiKey = String(process.env.EXPO_PUBLIC_API_KEY);
    baseUrl: string;
    headers: HeadersInit;
    data: { dataSource: string; database: string; collection: string };

    constructor(collection = "Testing") {
        this.baseUrl = "https://ap-southeast-1.aws.data.mongodb-api.com/app/data-pjyjw/endpoint/data/v1/action/";
        this.headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "apiKey": this.apiKey,
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Origin": "*"
        };
        this.data = {
            dataSource: "SPDevOpsLibrary",
            database: "Library",
            collection: collection
        };
    }

    private async makeRequest(endpoint: string, body: object) {
        const requestOptions = {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(body)
        };

        return fetch(this.baseUrl + endpoint, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .catch(error => {
                console.error(error);
                return { "Error": error };
            });
    }

    public async getItems(filter: object = {}) {
        const body = { ...this.data, filter };
        return this.makeRequest("find", body).then(data => data.documents);
    }

    public async listItems() {
        const items = await this.getItems();
        console.log(items);
    }

    public async insertItem(doc: object) {
        const body = { ...this.data, document: doc };
        return this.makeRequest("insertOne", body);
    }

    public async setItem(search: object, doc: object) {
        const body = {
            ...this.data,
            filter: search,
            update: { "$set": doc }
        };
        return this.makeRequest("updateOne", body);
    }

    public async unsetItem(search: object, field: string) {
        const body = {
            ...this.data,
            filter: search,
            update: { "$unset": { [field]: "" } }
        };
        return this.makeRequest("updateOne", body);
    }

    public async appendItem(search: object, doc: object) {
        const body = {
            ...this.data,
            filter: search,
            update: { "$addToSet": doc }
        };
        return this.makeRequest("updateOne", body);
    }
}

// Usage example
const db = new MongoObject2('books2');
db.listItems();
