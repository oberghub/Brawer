package com.example.userservice.command;

import com.example.userservice.command.rest.CreateUserCommand;
import com.example.userservice.command.rest.DeleteUserCommand;
import com.example.userservice.command.rest.UpdateUserCommand;
import com.example.userservice.core.event.UserCreatedEvent;
import com.example.userservice.core.event.UserDeletedEvent;
import com.example.userservice.core.event.UserUpdatedEvent;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.BeanUtils;

import java.util.List;

@Aggregate
public class UserAggregate {
    @AggregateIdentifier
    private String _id;
    private String name;
    private String email;
    private String role;
    private List<String> favouriteBooks;

    public UserAggregate(){}
    @CommandHandler
    public UserAggregate(CreateUserCommand command){
        boolean blankDataCheck = command.getName().isBlank() || command.getEmail().isBlank() ||
                command.getRole().isBlank();
        if (blankDataCheck){
            throw new IllegalArgumentException("Data cannot be blank");
        }
        UserCreatedEvent event = new UserCreatedEvent();
        BeanUtils.copyProperties(command, event);
        AggregateLifecycle.apply(event);
    }

    @CommandHandler
    public void UserAggregate(UpdateUserCommand command){
        boolean blankDataCheck = command.getName().isBlank() || command.getEmail().isBlank() ||
                command.getRole().isBlank() || command.get_id().isBlank();
        if (blankDataCheck){
            throw new IllegalArgumentException("Data cannot be blank");
        }
        UserUpdatedEvent event = new UserUpdatedEvent();
        BeanUtils.copyProperties(command, event);
        AggregateLifecycle.apply(event);
    }

    @CommandHandler
    public void UserAggregate(DeleteUserCommand command){
        boolean blankDataCheck = command.get_id().isBlank();
        if (blankDataCheck){
            throw new IllegalArgumentException("User ID cannot be blank");
        }
        UserDeletedEvent event = new UserDeletedEvent();
        BeanUtils.copyProperties(command, event);
        AggregateLifecycle.apply(event);
    }

    @EventSourcingHandler
    public void on(UserCreatedEvent event){
        this._id = event.get_id();
        this.name = event.getName();
        this.email = event.getEmail();
        this.role = event.getRole();
        this.favouriteBooks = event.getFavouriteBooks();
        System.out.println("Create User Id: " + this._id);
    }

    @EventSourcingHandler
    public void on(UserUpdatedEvent event){
        this.name = event.getName();
        this.email = event.getEmail();
        this.role = event.getRole();
        this.favouriteBooks = event.getFavouriteBooks();
        System.out.println("Update User Id: " + this._id);
    }

    @EventSourcingHandler
    public void on(UserDeletedEvent event){
        System.out.println("Delete User Id: " + this._id);
        AggregateLifecycle.markDeleted();
    }
}
