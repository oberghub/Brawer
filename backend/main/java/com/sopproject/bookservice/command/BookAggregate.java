package com.sopproject.bookservice.command;

import com.sopproject.bookservice.command.rest.CreateBookCommand;
import com.sopproject.bookservice.core.event.BookCreatedEvent;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.BeanUtils;

import java.util.List;

@Aggregate
public class BookAggregate {
    @AggregateIdentifier
    private String _id;
    private String title;
    private String desc;
    private int quantity;
    private List<String> authors;
    private String image;
    private String language;
    private List<String> genres;

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
        System.out.println("Book Id: " + this._id);
    }
}
