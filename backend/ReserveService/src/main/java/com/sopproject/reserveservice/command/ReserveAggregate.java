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

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Aggregate
public class ReserveAggregate {
    @AggregateIdentifier
    private String _id;
    private String userId;
    private String roomId;
    private List<String> equipmentsId;
    private String timestamp;
    private String reserveFrom;
    private String reserveTo;
    private String status;

    public ReserveAggregate() {
    }

    @CommandHandler
    public ReserveAggregate(CreateReserveCommand command) {
        boolean blankDataCheck = command.getUserId().isBlank() || command.getRoomId().isBlank() ||
                command.getTimestamp().isBlank() || command.getReserveFrom().isBlank() ||
                command.getReserveFrom().isBlank() || command.getStatus().isBlank();
        if (blankDataCheck) {
            throw new IllegalArgumentException("Data cannot be blank");
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime reserveFrom = LocalDateTime.parse(command.getReserveFrom(), formatter);
        LocalDateTime reserveTo = LocalDateTime.parse(command.getReserveTo(), formatter);
//        if (reserveFrom.isBefore(now)) {
//            throw new IllegalArgumentException("Invalid reserve beginning time");
//        }
//        if (reserveTo.isBefore(reserveFrom) || reserveTo.isAfter(LocalDateTime.of(now.getYear(), now.getMonth(), now.getDayOfMonth(), 22, 0))) {
//            throw new IllegalArgumentException("Invalid reserve ending time");
//        }

        ReserveCreatedEvent event = new ReserveCreatedEvent();
        BeanUtils.copyProperties(command, event);
        AggregateLifecycle.apply(event);
    }

    @CommandHandler
    public void ReserveAggregate(UpdateReserveCommand command) {
        boolean blankDataCheck = command.getUserId().isBlank() || command.getRoomId().isBlank() ||
                command.getTimestamp().isBlank() || command.getReserveFrom().isBlank() ||
                command.getReserveFrom().isBlank() || command.getStatus().isBlank() || command.get_id().isBlank();
        if (blankDataCheck) {
            throw new IllegalArgumentException("Data cannot be blank");
        }
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime reserveFrom = LocalDateTime.parse(command.getReserveFrom(), formatter);
        LocalDateTime reserveTo = LocalDateTime.parse(command.getReserveTo(), formatter);
//        if (reserveFrom.isBefore(now)) {
//            throw new IllegalArgumentException("Invalid reserve beginning time");
//        }
//        if (reserveTo.isBefore(reserveFrom) || reserveTo.isAfter(LocalDateTime.of(now.getYear(), now.getMonth(), now.getDayOfMonth(), 22, 0))) {
//            throw new IllegalArgumentException("Invalid reserve ending time");
//        }
        ReserveUpdatedEvent event = new ReserveUpdatedEvent();
        BeanUtils.copyProperties(command, event);
        AggregateLifecycle.apply(event);
    }

    @CommandHandler
    public void ReserveAggregate(DeleteReserveCommand command) {
        boolean blankDataCheck = command.get_id().isBlank();
        if (blankDataCheck) {
            throw new IllegalArgumentException("Reserve ID cannot be blank");
        }
        ReserveDeletedEvent event = new ReserveDeletedEvent();
        BeanUtils.copyProperties(command, event);
        AggregateLifecycle.apply(event);
    }

    @EventSourcingHandler
    public void on(ReserveCreatedEvent event) {
        this._id = event.get_id();
        this.userId = event.getUserId();
        this.roomId = event.getRoomId();
        this.equipmentsId = event.getEquipmentsId();
        this.timestamp = event.getTimestamp();
        this.reserveFrom = event.getReserveFrom();
        this.reserveTo = event.getReserveTo();
        System.out.println("Create Reserve Id: " + this._id);
    }

    @EventSourcingHandler
    public void on(ReserveUpdatedEvent event) {
        this.userId = event.getUserId();
        this.roomId = event.getRoomId();
        this.equipmentsId = event.getEquipmentsId();
        this.timestamp = event.getTimestamp();
        this.reserveFrom = event.getReserveFrom();
        this.reserveTo = event.getReserveTo();
        System.out.println("Update Reserve Id: " + this._id);
    }

    @EventSourcingHandler
    public void on(ReserveDeletedEvent event) {
        System.out.println("Delete Reserve Id: " + this._id);
        AggregateLifecycle.markDeleted();
    }
}
