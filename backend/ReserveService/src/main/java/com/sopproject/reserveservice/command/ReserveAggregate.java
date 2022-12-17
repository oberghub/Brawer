package com.sopproject.reserveservice.command;

import com.sopproject.reserveservice.command.rest.CreateReserveCommand;
import com.sopproject.reserveservice.command.rest.DeleteReserveCommand;
import com.sopproject.reserveservice.command.rest.UpdateReserveCommand;
import com.sopproject.reserveservice.core.event.ReserveCreatedEvent;
import com.sopproject.reserveservice.core.event.ReserveDeletedEvent;
import com.sopproject.reserveservice.core.event.ReserveUpdatedEvent;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.BeanUtils;
import org.springframework.data.annotation.Id;

import java.util.List;

@Aggregate
public class ReserveAggregate {
    @Id
    @AggregateIdentifier
    private String _id;
    private String userId;
    private String roomId;
    private List<String> equipmentsId;
    private String timestamp;
    private String reserveForm;
    private String reserveTo;
    private String status;

    public ReserveAggregate(){}
    @CommandHandler
    public ReserveAggregate(CreateReserveCommand command){
        boolean blankDataCheck = command.getUserId().isBlank() || command.getRoomId().isBlank() ||
                command.getTimestamp().isBlank() || command.getReserveForm().isBlank() ||
                command.getReserveForm().isBlank() || command.getStatus().isBlank();
        if (blankDataCheck){
            throw new IllegalArgumentException("Data cannot be blank");
        }
        ReserveCreatedEvent event = new ReserveCreatedEvent();
        BeanUtils.copyProperties(command, event);
        AggregateLifecycle.apply(event);
    }

    @CommandHandler
    public void ReserveAggregate(UpdateReserveCommand command){
        boolean blankDataCheck = command.getUserId().isBlank() || command.getRoomId().isBlank() ||
                command.getTimestamp().isBlank() || command.getReserveForm().isBlank() ||
                command.getReserveForm().isBlank() || command.getStatus().isBlank() || command.get_id().isBlank();
        if (blankDataCheck){
            throw new IllegalArgumentException("Data cannot be blank");
        }
        ReserveUpdatedEvent event = new ReserveUpdatedEvent();
        BeanUtils.copyProperties(command, event);
        AggregateLifecycle.apply(event);
    }

    @CommandHandler
    public void ReserveAggregate(DeleteReserveCommand command){
        boolean blankDataCheck = command.get_id().isBlank();
        if (blankDataCheck){
            throw new IllegalArgumentException("Reserve ID cannot be blank");
        }
        ReserveDeletedEvent event = new ReserveDeletedEvent();
        BeanUtils.copyProperties(command, event);
        AggregateLifecycle.apply(event);
    }

    @EventSourcingHandler
    public void on(ReserveCreatedEvent event){
        this._id = event.get_id();
        this.userId = event.getUserId();
        this.roomId = event.getRoomId();
        this.equipmentsId = event.getEquipmentsId();
        this.timestamp = event.getTimestamp();
        this.reserveForm = event.getReserveForm();
        this.reserveTo = event.getReserveTo();
        System.out.println("Create Reserve Id: " + this._id);
    }

    @EventSourcingHandler
    public void on(ReserveUpdatedEvent event){
        this.userId = event.getUserId();
        this.roomId = event.getRoomId();
        this.equipmentsId = event.getEquipmentsId();
        this.timestamp = event.getTimestamp();
        this.reserveForm = event.getReserveForm();
        this.reserveTo = event.getReserveTo();
        System.out.println("Update Reserve Id: " + this._id);
    }

    @EventSourcingHandler
    public void on(ReserveDeletedEvent event){
        System.out.println("Delete Reserve Id: " + this._id);
        AggregateLifecycle.markDeleted();
    }
}
