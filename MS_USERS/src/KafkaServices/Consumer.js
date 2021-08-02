const { Kafka, logLevel } = require('kafkajs');

const CreateClient = require('../services/CreateClient');

class Consumer {
  consumer;

  constructor(groupId) {
    const kafka = new Kafka({
      clientId: 'MS_USERS',
      brokers: ['localhost:9092'],
      logLevel: logLevel.WARN,
    });

    this.consumer = kafka.consumer({ groupId });
  }

  async consume(topic) {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: topic, fromBeginning: true });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        if (message.value !== undefined) {
          const data = JSON.parse(message.value);

          const service = new CreateClient();

          await service.execute(data);
        }
      },
    });
  }
}

module.exports = Consumer;
