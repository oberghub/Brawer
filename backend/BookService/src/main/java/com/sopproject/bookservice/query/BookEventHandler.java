package com.sopproject.bookservice.query;

import com.sopproject.bookservice.core.BookEntity;
import com.sopproject.bookservice.core.data.BookRepository;
import com.sopproject.bookservice.core.event.BookCreatedEvent;
import com.sopproject.bookservice.core.event.BookDeletedEvent;
import com.sopproject.bookservice.core.event.BookUpdatedEvent;
import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class BookEventHandler {

    private final BookRepository bookRepository;

    public BookEventHandler(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @EventHandler
    public void on(BookCreatedEvent event){
        BookEntity bookEntity = new BookEntity();
        BeanUtils.copyProperties(event, bookEntity);
        bookRepository.save(bookEntity);
    }
    @EventHandler
    public void on(BookUpdatedEvent event){
        BookEntity bookEntity = new BookEntity();
        BeanUtils.copyProperties(event, bookEntity);
        bookRepository.save(bookEntity);
    }
    @EventHandler
    public void on(BookDeletedEvent event){
        bookRepository.deleteById(event.get_id());
    }

}
