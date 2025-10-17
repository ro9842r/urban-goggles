export function mockSentimentAPI(text) {
    return new Promise((resolve)=> {
        setTimeout(()=>{
          const sentiments = ["positive", "negative", "neutral"];
          const random = sentiments[Math.floor(Math.random() * sentiments.length)]
          
          resolve({
            label: random, probability: Math.random().toFixed(2)
          })
        }, 1000);
    })
}
