const request = require("request-promise-native")
const WRITE_KEY = "Ei8TaXpSNIOIh3qyobyHVeFpz6GTVkJf"
const TOKEN = Buffer.from(`${WRITE_KEY}:`).toString('base64')

async function main(){
    let failureCount = 0
    let successCount = 0
    let attempts = 100
    let startTime = new Date().getTime()
    const USER_ID = Math.floor(Math.random()*1000000)
    for (let i = 0; i< attempts; i ++){
        const options = {
            headers: {
                Authorization: `Basic ${TOKEN}`
            },
            body: {
                "userId": USER_ID,
                "event": "test",
                "properties": {
                    count: i
                },
            },
            uri: "https://api.segment.io/v1/track",
            method: "POST",
            json: true
        }
        try{
            let res = await request(options);
            console.log(`success count: ${i}`)
            successCount++
        } catch(e){
            console.log(`failure count: ${i}`)
            failureCount++
        }
    }
    console.log(`userId: ${USER_ID}`)
    let totalTime = Math.floor((new Date().getTime() - startTime) / 1000)
    console.log(`Total attempts: ${attempts}, Success Rate ${successCount/attempts}`)
    console.log(`Total time elapsed: ${totalTime} seconds`)
}
main()