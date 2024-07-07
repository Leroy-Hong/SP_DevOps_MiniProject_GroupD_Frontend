import alert from './alert'

export async function getBooks() { 
    const requestOptions = { 
        method: 'POST', 
        headers: {"Content-Type": "application/json", 
            "Accept": "application/json",
            "apiKey": "APIKEYHERE",
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
    const requestOptions = { 
        method: 'POST', 
        headers: {"Content-Type": "application/json", 
            "Accept": "application/json",
            "apiKey": "APIKEYHERE",
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