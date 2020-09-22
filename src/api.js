// Get Revenue Data

export const getRevenue = async () => {
    let revenueResponse = await fetch("https://api.jsonbin.io/b/5f69d06c65b18913fc511ae8/3", {
        method: 'GET',
        headers: {
            "secret-key": "$2b$10$RLi89aTLWEdIlq6r6Gzq1eKSjrRQi6JplO8trMu9KM.HT9s02tR/C"
        }
    })
    const res = await revenueResponse.json();
    return res.stats
}