package com.example.paymentservice.command;

import com.example.paymentservice.command.rest.CreatePaymentCommand;
import com.example.paymentservice.command.rest.DeletePaymentCommand;
import com.example.paymentservice.command.rest.UpdatePaymentCommand;
import com.example.paymentservice.core.event.PaymentCreatedEvent;
import com.example.paymentservice.core.event.PaymentDeletedEvent;
import com.example.paymentservice.core.event.PaymentUpdatedEvent;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;
import org.checkerframework.checker.units.qual.C;
import org.springframework.beans.BeanUtils;

@Aggregate
public class PaymentAggregate {
    @AggregateIdentifier
    private String _id;
    private String userId;
    private String reserveId;
    private String timestamp;
    private String status;
    private double price;

    public PaymentAggregate() {
    }

    @CommandHandler
    public PaymentAggregate(CreatePaymentCommand command){
        boolean blankDataCheck = command.getUserId().isBlank() || command.getReserveId().isBlank() ||
                command.getTimestamp().isBlank() || command.getStatus().isBlank() || command.getPrice() == 0;
        if(blankDataCheck){
            throw new IllegalArgumentException("Data cannot be blank");
        }
        PaymentCreatedEvent event = new PaymentCreatedEvent();
        BeanUtils.copyProperties(command,event);
        AggregateLifecycle.apply(event);

    }

    @CommandHandler
    public void PaymentAggregate(UpdatePaymentCommand command){
        boolean blankDataCheck = command.get_id().isBlank() || command.getUserId().isBlank() || command.getReserveId().isBlank() ||
                command.getTimestamp().isBlank() || command.getStatus().isBlank() || command.getPrice() == 0;
        if(blankDataCheck){
            throw new IllegalArgumentException("Data cannot be blank");
        }
        PaymentUpdatedEvent event = new PaymentUpdatedEvent();
        BeanUtils.copyProperties(command,event);
        AggregateLifecycle.apply(event);

    }

    @CommandHandler
    public void PaymentAggregate(DeletePaymentCommand command){
        boolean blankDataCheck = command.get_id().isBlank();
        if (blankDataCheck){
            throw new IllegalArgumentException("Data cannot be blank");
        }
        PaymentDeletedEvent event = new PaymentDeletedEvent();
        BeanUtils.copyProperties(command,event);
        AggregateLifecycle.apply(event);
    }


    @EventSourcingHandler
    public void on(PaymentCreatedEvent event){
        this._id = event.get_id();
        this.userId = event.getUserId();
        this.reserveId = event.getReserveId();
        this.timestamp = event.getTimestamp();
        this.status = event.getStatus();
        this.price = event.getPrice();
        System.out.println("Add Payment Id "+this._id);
    }

    @EventSourcingHandler
    public void on(PaymentUpdatedEvent event){
        this._id = event.get_id();
        this.userId = event.getUserId();
        this.reserveId = event.getReserveId();
        this.timestamp = event.getTimestamp();
        this.status = event.getStatus();
        this.price = event.getPrice();
        System.out.println("Update Payment Id "+this._id);
    }

    @EventSourcingHandler
    public void on(PaymentDeletedEvent event){
        System.out.println("Delete Payment Id "+this._id);
        AggregateLifecycle.markDeleted();
    }
}
