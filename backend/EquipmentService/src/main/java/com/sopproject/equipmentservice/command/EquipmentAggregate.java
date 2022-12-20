package com.sopproject.equipmentservice.command;

import com.sopproject.equipmentservice.command.rest.*;
import com.sopproject.equipmentservice.core.event.*;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.BeanUtils;

import java.math.BigDecimal;

@Aggregate
public class EquipmentAggregate {
    @AggregateIdentifier
    private String _id;
    private String name;
    private String desc;
    private int quantity;
    private BigDecimal price;


    public EquipmentAggregate(){}
    @CommandHandler
    public EquipmentAggregate(CreateEquipmentCommand command){
        int isLessThanZero = command.getPrice().compareTo(BigDecimal.ZERO);
        boolean blankDataCheck = command.getName().isBlank() || command.getDesc().isBlank() ||
                command.getPrice().equals(null) || (isLessThanZero < 0);
        if (blankDataCheck){
            throw new IllegalArgumentException("Data cannot be blank");
        }
        if (command.getQuantity() < 0){
            throw new IllegalArgumentException("Quantity cannot be less than 0");
        }
        EquipmentCreatedEvent event = new EquipmentCreatedEvent();
        BeanUtils.copyProperties(command, event);
        AggregateLifecycle.apply(event);
    }

    @CommandHandler
    public void EquipmentAggregate(UpdateEquipmentCommand command){
        boolean blankDataCheck = command.getName().isBlank() || command.getDesc().isBlank() ||
                command.getPrice().equals(null);
        if (blankDataCheck){
            throw new IllegalArgumentException("Data cannot be blank");
        }
        if (command.getQuantity() < 0){
            throw new IllegalArgumentException("Quantity cannot be less than 0");
        }
        EquipmentUpdatedEvent event = new EquipmentUpdatedEvent();
        BeanUtils.copyProperties(command, event);
        AggregateLifecycle.apply(event);
    }

    @CommandHandler
    public void EquipmentAggregate(DeleteEquipmentCommand command){
        boolean blankDataCheck = command.get_id().isBlank();
        if (blankDataCheck){
            throw new IllegalArgumentException("Data cannot be blank");
        }
        EquipmentDeletedEvent event = new EquipmentDeletedEvent();
        BeanUtils.copyProperties(command, event);
        AggregateLifecycle.apply(event);
    }

    @CommandHandler
    public void EquipmentAggregate(QtyIncreaseCommand command){
        boolean blankDataCheck = command.get_id().isBlank();
        if (blankDataCheck){
            throw new IllegalArgumentException("Data cannot be blank");
        }
        if(command.getQuantity() < 0){
            throw new IllegalArgumentException("Quantity cannot be less than 0");
        }
        EquipmentIncreasedEvent event = new EquipmentIncreasedEvent();
        BeanUtils.copyProperties(command, event);
        AggregateLifecycle.apply(event);
    }

    @CommandHandler
    public void EquipmentAggregate(QtyDecreaseCommand command){
        boolean blankDataCheck = command.get_id().isBlank();
        if (blankDataCheck){
            throw new IllegalArgumentException("Data cannot be blank");
        }
        if(command.getQuantity() < 0){
            throw new IllegalArgumentException("Quantity cannot be less than 0");
        }
        if(command.getQuantity() > this.quantity){
            throw new IllegalArgumentException("Decreasing quantity cannot be more than remaining qty");
        }
        EquipmentDecreasedEvent event = new EquipmentDecreasedEvent();
        BeanUtils.copyProperties(command, event);
        AggregateLifecycle.apply(event);
    }

    @EventSourcingHandler
    public void on(EquipmentCreatedEvent event){
        this._id = event.get_id();
        this.name = event.getName();
        this.desc = event.getDesc();
        this.price = event.getPrice();
        this.quantity = event.getQuantity();
        System.out.println("Create Equipment Id: " + this._id);
    }

    @EventSourcingHandler
    public void on(EquipmentUpdatedEvent event){
        this._id = event.get_id();
        this.name = event.getName();
        this.desc = event.getDesc();
        this.price = event.getPrice();
        this.quantity = event.getQuantity();
        System.out.println("Update Equipment Id: " + this._id);
    }

    @EventSourcingHandler
    public void on(EquipmentIncreasedEvent event){
        this._id = event.get_id();
        this.quantity += event.getQuantity();
        System.out.println("Increase Equipment Id: " + this._id);
    }

    @EventSourcingHandler
    public void on(EquipmentDecreasedEvent event){
        this._id = event.get_id();
        this.quantity -= event.getQuantity();
        System.out.println("Decrease Equipment Id: " + this._id);
    }

    @EventSourcingHandler
    public void on(EquipmentDeletedEvent event){
        System.out.println("Delete Equipment Id: " + this._id);
        AggregateLifecycle.markDeleted();
    }
}
