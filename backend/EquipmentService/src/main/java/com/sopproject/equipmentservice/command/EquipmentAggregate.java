package com.sopproject.equipmentservice.command;

import com.sopproject.equipmentservice.command.rest.CreateEquipmentCommand;
import com.sopproject.equipmentservice.command.rest.DeleteEquipmentCommand;
import com.sopproject.equipmentservice.command.rest.UpdateEquipmentCommand;
import com.sopproject.equipmentservice.core.event.EquipmentCreatedEvent;
import com.sopproject.equipmentservice.core.event.EquipmentDeletedEvent;
import com.sopproject.equipmentservice.core.event.EquipmentUpdatedEvent;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.BeanUtils;

@Aggregate
public class EquipmentAggregate {
    @AggregateIdentifier
    private String _id;
    private String name;
    private String desc;
    private Integer price;


    public EquipmentAggregate(){}
    @CommandHandler
    public EquipmentAggregate(CreateEquipmentCommand command){
        boolean blankDataCheck = command.getName().isBlank() || command.getDesc().isBlank() ||
                command.getPrice().equals(null);
        if (blankDataCheck){
            throw new IllegalArgumentException("Data cannot be blank");
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

    @EventSourcingHandler
    public void on(EquipmentCreatedEvent event){
        this._id = event.get_id();
        this.name = event.getName();
        this.desc = event.getDesc();
        this.price = event.getPrice();
        System.out.println("Create Equipment Id: " + this._id);
    }

    @EventSourcingHandler
    public void on(EquipmentUpdatedEvent event){
        this._id = event.get_id();
        this.name = event.getName();
        this.desc = event.getDesc();
        this.price = event.getPrice();
        System.out.println("Update Equipment Id: " + this._id);
    }

    @EventSourcingHandler
    public void on(EquipmentDeletedEvent event){
        System.out.println("Delete Equipment Id: " + this._id);
        AggregateLifecycle.markDeleted();
    }
}
