import { Kafka, Producer, logLevel, Message } from 'kafkajs';

interface IProduceProps {
  topic: string;
  messages: Message[];
}

class KafkaProducer {
  private producer: Producer;

  constructor() {
    const kafka = new Kafka({
      clientId: 'api',
      brokers: ['localhost:9092'],
      logLevel: logLevel.WARN
    });

    this.producer = kafka.producer();
  }

  async produce ({ topic, messages }: IProduceProps) {
    await this.producer.connect();

    await this.producer.send({
      topic,
      messages
    });

    await this.producer.disconnect();
  }
}

export default KafkaProducer;
