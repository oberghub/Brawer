package com.example.paymentservice.query;

import com.example.paymentservice.core.PaymentEntity;
import com.example.paymentservice.core.data.PaymentRepository;
import com.example.paymentservice.core.event.PaymentCreatedEvent;
import com.example.paymentservice.core.event.PaymentDeletedEvent;
import com.example.paymentservice.core.event.PaymentUpdatedEvent;
import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class PaymentEventHandler {

    private final PaymentRepository paymentRepository;

    public PaymentEventHandler(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    @EventHandler
    public void on(PaymentCreatedEvent event){
        PaymentEntity paymentEntity = new PaymentEntity();
        BeanUtils.copyProperties(event, paymentEntity);
        paymentRepository.save(paymentEntity);
    }
    @EventHandler
    public void on(PaymentUpdatedEvent event){
        PaymentEntity paymentEntity = new PaymentEntity();
        BeanUtils.copyProperties(event, paymentEntity);
        paymentRepository.save(paymentEntity);
    }

    @EventHandler
    public void on(PaymentDeletedEvent event){
        paymentRepository.deleteById(event.get_id());
    }
}
