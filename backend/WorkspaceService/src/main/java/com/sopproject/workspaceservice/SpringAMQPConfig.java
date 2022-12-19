package com.sopproject.workspaceservice;

import com.rabbitmq.client.Channel;
import org.axonframework.extensions.amqp.eventhandling.AMQPMessageConverter;
import org.axonframework.extensions.amqp.eventhandling.spring.SpringAMQPMessageSource;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringAMQPConfig {
    @Bean
    public SpringAMQPMessageSource myQueueMessageSource(AMQPMessageConverter messageConverter) {
        return new SpringAMQPMessageSource(messageConverter) {

            @RabbitListener(queues = "onCancelReserve")
            @RabbitListener(queues = "onReserveWorkspace")
            @Override
            public void onMessage(Message message, Channel channel) {
                super.onMessage(message, channel);
            }
        };
    }
}
