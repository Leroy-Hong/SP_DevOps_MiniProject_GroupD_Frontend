export class mongoObject {
    apiKey: string;
    constructor (apiKey: string) {
        this.apiKey = apiKey;
    }

    public async getBooks(search:object = {}) {
        const apiKey = this.apiKey
        const requestOptions = { 
            method: 'POST', 
            headers: {"Content-Type": "application/json", 
                "Accept": "application/json",
                "apiKey": apiKey,
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                "Access-Control-Allow-Methods": "POST",
                "Access-Control-Allow-Origin": "*"}, 
        
            body: JSON.stringify({"dataSource": "SPDevOpsLibrary",
            "database": "Library",
            "collection": 'books',
            "filter": search}) 
        }; 
    
        return fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/data-pjyjw/endpoint/data/v1/action/find', requestOptions) 
                .then(response => { 
                    if (!response.ok) {
                        throw new Error("HTTP error! status: ${response.status}")
                    }
                    return response.json();
                })
                .then(data => {
                    return data.documents;
                })
                .catch(error => {
                    console.error(error);
                    return { "Error": error };
                });
        
    } 

    public async getUsers(search:object = {}) { 
        const apiKey = String(process.env.EXPO_PUBLIC_API_KEY)
        const requestOptions = { 
            method: 'POST', 
            headers: {"Content-Type": "application/json", 
                "Accept": "application/json",
                "apiKey": apiKey,
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                "Access-Control-Allow-Methods": "POST",
                "Access-Control-Allow-Origin": "*"}, 
        
            body: JSON.stringify({"dataSource": "SPDevOpsLibrary",
            "database": "Library",
            "collection": 'users',
            "filter": search}) 
        }; 
    
        return fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/data-pjyjw/endpoint/data/v1/action/find', requestOptions) 
                .then(response => { 
                    if (!response.ok) {
                        throw new Error("HTTP error! status: ${response.status}")
                    }
                    return response.json();
                })
                .then(data => {
                    return data.documents;
                })
                .catch(error => {
                    console.error(error);
                    return { "Error": error };
                });
        
    } 


    public async createUser(doc:object = {}) { 
        const apiKey = String(process.env.EXPO_PUBLIC_API_KEY)
        const requestOptions = { 
            method: 'POST', 
            headers: {"Content-Type": "application/json", 
                "Accept": "application/json",
                "apiKey": apiKey,
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                "Access-Control-Allow-Methods": "POST",
                "Access-Control-Allow-Origin": "*"}, 
        
            body: JSON.stringify({"dataSource": "SPDevOpsLibrary",
            "database": "Library",
            "collection": 'users',
            "document": doc}) 
        }; 
    
        return fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/data-pjyjw/endpoint/data/v1/action/insertOne', requestOptions) 
                .then(response => { 
                    if (!response.ok) {
                        throw new Error("HTTP error! status: ${response.status}")
                    }
                    return response.json();
                })
                .catch(error => {
                    console.error(error);
                    return { "Error": error };
                });
        
    } 
}