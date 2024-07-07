import alert from './alert'

export async function getBooks() {
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
        "collection": 'books',
        "filter": null}) 
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
                return { "balls": "somethring wrong" };
            });
    
} 

export async function getUsers(search:object = {}) { 
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
                return { "balls": "somethring wrong" };
            });
    
} 

export async function createUser(doc:object = {}) { 
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
                console.log(response)
                return response.json();
            })
            .then(data => {
                console.log(data)
                return data.documents;
            })
            .catch(error => {
                console.error(error);
                return { "balls": "somethring wrong" };
            });
    
} 