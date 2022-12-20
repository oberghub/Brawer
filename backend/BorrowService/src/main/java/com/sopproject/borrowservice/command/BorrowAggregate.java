package com.sopproject.borrowservice.command;


import com.sopproject.borrowservice.command.rest.CreateBorrowCommand;
import com.sopproject.borrowservice.command.rest.UpdateBorrowCommand;
import com.sopproject.borrowservice.core.event.BorrowCreatedEvent;
import com.sopproject.borrowservice.core.event.BorrowUpdatedEvent;
import lombok.Data;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.BeanUtils;

import java.util.ArrayList;

@Aggregate
public class BorrowAggregate {
    @AggregateIdentifier
    private String _id;
    private String status;
    private String borrow_date;
    private String due_date;
    private boolean late;
    private String userId;
    private ArrayList<String> booksId;

    public BorrowAggregate(){
    }
    @CommandHandler
    public BorrowAggregate(CreateBorrowCommand command){
        boolean blankDataCheck = command.getBorrow_date().isBlank() || command.getDue_date().isBlank() ||
                command.getStatus().isBlank() || command.getUserId().isEmpty() || command.getBooksId().size() == 0;
        if (blankDataCheck){
            throw new IllegalArgumentException("Data cannot be blank");
        }
        BorrowCreatedEvent event = new BorrowCreatedEvent();
        BeanUtils.copyProperties(command, event);
        AggregateLifecycle.apply(event);
    }
    @CommandHandler
    public void BorrowUpdateHandler(UpdateBorrowCommand command){
        boolean blankDataCheck = command.getBorrow_date().isBlank() || command.getDue_date().isBlank() ||
                command.getStatus().isBlank() || command.getUserId().isEmpty() || command.getBooksId().size() == 0;
        if (blankDataCheck){
            throw new IllegalArgumentException("Data cannot be blank");
        }
        BorrowUpdatedEvent UpdateEvent = BorrowUpdatedEvent.builder()
                ._id(command.get_id())
                .status(command.getStatus())
                .borrow_date(command.getBorrow_date())
                .due_date(command.getDue_date())
                .late(command.isLate())
                .userId(command.getUserId())
                .booksId(command.getBooksId())
                .build();
        AggregateLifecycle.apply(UpdateEvent);
    }
    @EventSourcingHandler
    public void on(BorrowCreatedEvent event){
        this._id = event.get_id();
        this.status = event.getStatus();
        this.borrow_date = event.getBorrow_date();
        this.due_date = event.getDue_date();
        this.late = event.isLate();
        this.userId = event.getUserId();
        this.booksId = event.getBooksId();
    }
    @EventSourcingHandler
    public void on(BorrowUpdatedEvent event){
        this._id = event.get_id();
        this.status = event.getStatus();
        this.late = event.isLate();
    }
}
