import { Text, View } from "react-native";
import alert from '../../services/alert'
import { useEffect } from "react";

export default function Home() {
    var data = {}
    const requestOptions = { 
        method: 'POST', 
        headers: {"Content-Type": "application/json", 
            "Accept": "application/json",
            "apiKey": "AJtfmzx6WGAJ71jv2p0oRKYFi3guKg8ymrS8szff7i5CYWXj3E4fsbLw7tvDzxtY",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Origin": "*"}, 

        body: JSON.stringify({"dataSource": "SPDevOpsLibrary",
        "database": "Library",
        "collection": 'books',
        "filter": null}) 
    }; 


    useEffect(() => {
        const gatherData = async () => { 
            try { 
                await fetch( 
                    'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-pjyjw/endpoint/data/v1/action/find', requestOptions) 
                    .then(response => { 
                        response.json() 
                            .then(tempdata => { 
                                alert("Post created at : ");
                                data = tempdata
                                console.log(data)
                            }); 
                    }) 
            } 
            catch (error) { 
                console.error(error); 
            } 
        } 
        gatherData();
    })

    return (
        <View
            style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            }}
        >
            <Text>HOME PAGE</Text>
            {data && <Text>Balls</Text>}
        </View>
        );

}