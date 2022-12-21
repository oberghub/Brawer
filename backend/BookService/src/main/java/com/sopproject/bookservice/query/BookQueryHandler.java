package com.sopproject.bookservice.query;

import com.sopproject.bookservice.core.BookEntity;
import com.sopproject.bookservice.core.data.BookRepository;
import com.sopproject.bookservice.query.rest.BookRestModel;
import com.sopproject.bookservice.query.rest.FindBookByIdQuery;
import com.sopproject.bookservice.query.rest.FindBooksQuery;
import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookQueryHandler {

    private final BookRepository bookRepository;
    public BookQueryHandler(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @QueryHandler
    List<BookRestModel> findBooks(FindBooksQuery query){
        List<BookRestModel> bookRestModels = new ArrayList<>();
        List<BookEntity> storedBooks = bookRepository.findAll();
        for (BookEntity bookEntity: storedBooks){
            BookRestModel bookRestModel = new BookRestModel();
            BeanUtils.copyProperties(bookEntity, bookRestModel);
            bookRestModels.add(bookRestModel);
        }
        return bookRestModels;
    }
    @QueryHandler
    BookRestModel findBookById(FindBookByIdQuery query){
        BookRestModel bookRestModel = new BookRestModel();
        BookEntity storedBook = bookRepository.findByBookId(query.get_id());
        BeanUtils.copyProperties(storedBook, bookRestModel);

        return bookRestModel;
    }
}
