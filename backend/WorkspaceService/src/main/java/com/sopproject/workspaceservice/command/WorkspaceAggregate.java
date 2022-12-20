package com.sopproject.workspaceservice.command;

import com.sopproject.workspaceservice.command.rest.*;
import com.sopproject.workspaceservice.core.event.WorkspaceCreatedEvent;
import com.sopproject.workspaceservice.core.event.WorkspaceDeletedEvent;
import com.sopproject.workspaceservice.core.event.WorkspaceUpdatedEvent;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.BeanUtils;

import java.util.List;

@Aggregate
public class WorkspaceAggregate {
    @AggregateIdentifier
    private String _id;
    private String room_type;
    private String room_name;
    private List<String> room_capacity;
    private int price;
    private String desc;
    private List<TimeRentModel> time_rent;
    private String status;

    public WorkspaceAggregate(){}
    @CommandHandler
    public WorkspaceAggregate(CreateWorkspaceCommand command){
        boolean blankDataCheck = command.getRoom_type().isBlank() || command.getDesc().isBlank() ||
                command.getPrice() == 0 || command.getRoom_name().isEmpty() ||
                command.getRoom_capacity().isEmpty() || command.getStatus().isEmpty();
        if (blankDataCheck){
            throw new IllegalArgumentException("Data cannot be blank");
        }
        WorkspaceCreatedEvent event = new WorkspaceCreatedEvent();
        BeanUtils.copyProperties(command, event);
        AggregateLifecycle.apply(event);
    }

    @CommandHandler
    public void WorkspaceAggregate(UpdateWorkspaceCommand command){
        boolean blankDataCheck = command.getRoom_type().isBlank() || command.getDesc().isBlank() ||
                command.getPrice() == 0 || command.getRoom_name().isEmpty() ||
                command.getRoom_capacity().isEmpty() || command.getStatus().isEmpty();
        if (blankDataCheck){
            throw new IllegalArgumentException("Data cannot be blank");
        }
        WorkspaceUpdatedEvent event = new WorkspaceUpdatedEvent();
        BeanUtils.copyProperties(command, event);
        AggregateLifecycle.apply(event);
    }

    @CommandHandler
    public void WorkspaceAggregate(DeleteWorkspaceCommand command){
        boolean blankDataCheck = command.get_id().isBlank();
        if (blankDataCheck){
            throw new IllegalArgumentException("Data cannot be blank");
        }
        WorkspaceDeletedEvent event = new WorkspaceDeletedEvent();
        BeanUtils.copyProperties(command, event);
        AggregateLifecycle.apply(event);
    }

    @EventSourcingHandler
    public void on(WorkspaceCreatedEvent event){
        this._id = event.get_id();
        this.room_type = event.getRoom_type();
        this.room_name = event.getRoom_name();
        this.room_capacity = event.getRoom_capacity();
        this.desc = event.getDesc();
        this.price = event.getPrice();
        this.status = event.getStatus();
        this.time_rent = event.getTime_rent();
        System.out.println("Create WorkSpace Id: " + this._id);
    }

    @EventSourcingHandler
    public void on(WorkspaceUpdatedEvent event){
        this._id = event.get_id();
        this.room_type = event.getRoom_type();
        this.room_name = event.getRoom_name();
        this.room_capacity = event.getRoom_capacity();
        this.desc = event.getDesc();
        this.price = event.getPrice();
        this.status = event.getStatus();
        this.time_rent = event.getTime_rent();
        System.out.println("Update WorkSpace Id: " + this._id);
    }


    @EventSourcingHandler
    public void on(WorkspaceDeletedEvent event){
        System.out.println("Delete WorkSpace Id: " + this._id);
        AggregateLifecycle.markDeleted();
    }
}
