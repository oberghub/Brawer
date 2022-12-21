package com.sopproject.bookservice.query;

import com.sopproject.bookservice.command.rest.ReturnBookCommand;
import com.sopproject.bookservice.core.BookEntity;
import com.sopproject.bookservice.core.data.BookRepository;
import com.sopproject.bookservice.core.event.*;
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

    @EventHandler
    public void on(BookReturnedEvent event){
        BookEntity bookEntity = new BookEntity();
        BookEntity stored = bookRepository.findByBookId(event.get_id());
        stored.setQuantity(stored.getQuantity() + event.getQuantity());
        BeanUtils.copyProperties(stored, bookEntity);
        bookRepository.save(bookEntity);
    }

    @EventHandler
    public void on(BookBorrowedEvent event){
        BookEntity bookEntity = new BookEntity();
        BookEntity stored = bookRepository.findByBookId(event.get_id());
        stored.setQuantity(stored.getQuantity() - event.getQuantity());
        BeanUtils.copyProperties(stored, bookEntity);
        bookRepository.save(bookEntity);
    }

}
