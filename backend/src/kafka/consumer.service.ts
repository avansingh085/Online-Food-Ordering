// consumer.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';

@Injectable()
export class ConsumerService implements OnModuleInit {
  async onModuleInit() {
    const kafka = new Kafka({
      clientId: 'notification-service',
      brokers: ['localhost:9092'],
    });

    const consumer: Consumer = kafka.consumer({ groupId: 'notification-group' });
    await consumer.connect();
    await consumer.subscribe({ topic: 'order_created', fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(`📩 Message received:`, message.value?.toString());

        // After receiving → process it
        // Example: send notification, update cache, call Redis etc.
      },
    });
  }
}
