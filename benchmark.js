const Benchmark = require('benchmark');
const axios = require('axios').default;

const suite = new Benchmark.Suite;

const emailWithoutQueue = async () => {
    const url = 'http://localhost:3000/api/test/send-email';
    const request = await axios.post(url, {
        data: {
            to: 'roshan321.lol@gmail.com',
            text: '',
            subject: '',
            html: '',
        },
    });
    return request.data;
};

const emailWithQueue = async () => {
    const url = 'http://localhost:3000/api/test/queue-email';
    const request = await axios.post(url, {
        data: {
            to: 'roshan321.lol@gmail.com',
            text: '',
            subject: '',
            html: '',
        },
    });
    return request.data;
};

suite.add('RegExp#test', () => {
    /o/.test('Hello World!');
})
    .add('String#indexOf', () => {
        'Hello World!'.indexOf('o') > -1;
    })
    // add listeners
    .on('cycle', (event) => {
        console.log(String(event.target));
    })
    .on('complete', function () {
        console.log(`Fastest is ${this.filter('fastest').map('name')}`);
    })
    // run async
    .run({ async: true });
