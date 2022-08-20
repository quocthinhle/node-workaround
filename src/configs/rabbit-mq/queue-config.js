const Exchanges = [
    {
        name: 'basic-routing',
        routeType: 'fanout',
    },
];

const Queues = [
    {
        name: 'mail-queue',
        exchange: 'basic-routing',
        routingKey: 'mail-sender',
    },
];

module.exports = {
    Queues,
    Exchanges,
};
