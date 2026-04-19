
// Native fetch used

const data = {
    host: 'math.lego-sia.com',
    key: 'bbd0d9a6843c450eb3e9d811a0fd504a',
    keyLocation: 'https://math.lego-sia.com/bbd0d9a6843c450eb3e9d811a0fd504a.txt',
    urlList: ['https://math.lego-sia.com/']
};

async function test() {
    console.log('🚀 Sending test request to Bing IndexNow...');
    try {
        const response = await fetch('https://www.bing.com/indexnow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify(data)
        });
        const result = await response.text();
        console.log(`Status: ${response.status}`);
        console.log(`Response: ${result}`);
    } catch (e) {
        console.error('Error:', e.message);
    }
}

test();
