package com.sopproject.borrowservice.BorrowService.command;


import com.sopproject.borrowservice.BorrowService.command.rest.CreateBorrowCommand;
import com.sopproject.borrowservice.BorrowService.core.BorrowCreatedEvent;
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
    @EventSourcingHandler
    public void on(BorrowCreatedEvent event){
        this._id = event.get_id();
        this.status = event.getStatus();
        this.borrow_date = event.getBorrow_date();
        this.due_date = event.getDue_date();
        this.late = event.isLate();
        this.userId = event.getUserId();
        this.booksId = event.getBooksId();
        System.out.println("Created Borrow Id: " + this._id);
    }
}
