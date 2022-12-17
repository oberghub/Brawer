package com.sopproject.bookservice.command;

import com.sopproject.bookservice.command.rest.CreateBookCommand;
import com.sopproject.bookservice.command.rest.DeleteBookCommand;
import com.sopproject.bookservice.command.rest.UpdateBookCommand;
import com.sopproject.bookservice.core.event.BookCreatedEvent;
import com.sopproject.bookservice.core.event.BookDeletedEvent;
import com.sopproject.bookservice.core.event.BookUpdatedEvent;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.BeanUtils;

import java.util.List;

@Aggregate
public class BookAggregate {
    @Id
    @AggregateIdentifier
    private String _id;
    private String title;
    private String desc;
    private int quantity;
    private List<String> authors;
    private String image;
    private String language;
    private List<String> genres;

    public BookAggregate(){}
    @CommandHandler
    public BookAggregate(CreateBookCommand command){
        boolean blankDataCheck = command.getTitle().isBlank() || command.getDesc().isBlank() ||
                command.getQuantity() == 0 || command.getAuthors().isEmpty() ||
                command.getImage().isBlank() || command.getLanguage().isBlank() ||
                command.getGenres().isEmpty();
        if (blankDataCheck){
            throw new IllegalArgumentException("Data cannot be blank");
        }
        BookCreatedEvent event = new BookCreatedEvent();
        BeanUtils.copyProperties(command, event);
        AggregateLifecycle.apply(event);
    }

    @CommandHandler
    public void BookAggregate(UpdateBookCommand command){
        boolean blankDataCheck = command.get_id().isBlank() || command.getTitle().isBlank() || command.getDesc().isBlank() ||
                command.getQuantity() == 0 || command.getAuthors().isEmpty() ||
                command.getImage().isBlank() || command.getLanguage().isBlank() ||
                command.getGenres().isEmpty();
        if (blankDataCheck){
            throw new IllegalArgumentException("Data cannot be blank");
        }
        BookUpdatedEvent event = new BookUpdatedEvent();
        BeanUtils.copyProperties(command, event);
        AggregateLifecycle.apply(event);
    }

    @CommandHandler
    public void BookAggregate(DeleteBookCommand command){
        boolean blankDataCheck = command.get_id().isBlank();
        if (blankDataCheck){
            throw new IllegalArgumentException("Data cannot be blank");
        }
        BookDeletedEvent event = new BookDeletedEvent();
        BeanUtils.copyProperties(command, event);
        AggregateLifecycle.apply(event);
    }

    @EventSourcingHandler
    public void on(BookCreatedEvent event){
        this._id = event.get_id();
        this.title = event.getTitle();
        this.desc = event.getDesc();
        this.quantity = event.getQuantity();
        this.authors = event.getAuthors();
        this.image = event.getImage();
        this.language = event.getLanguage();
        this.genres = event.getGenres();
        System.out.println("Create Book Id: " + this._id);
    }

    @EventSourcingHandler
    public void on(BookUpdatedEvent event){
        this._id = event.get_id();
        this.title = event.getTitle();
        this.desc = event.getDesc();
        this.quantity = event.getQuantity();
        this.authors = event.getAuthors();
        this.image = event.getImage();
        this.language = event.getLanguage();
        this.genres = event.getGenres();
        System.out.println("Update Book Id: " + this._id);
    }

    @EventSourcingHandler
    public void on(BookDeletedEvent event){
        System.out.println("Delete Book Id: " + this._id);
    }
}
