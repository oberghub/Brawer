package com.sopproject.bookservice.query.rest;

import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/book")
public class BookQueryController {
    @Autowired
    private QueryGateway queryGateway;

    @GetMapping("all")
    public List<BookRestModel> findBooksQuery(){
        FindBooksQuery findBooksQuery = new FindBooksQuery();
        List<BookRestModel> books = queryGateway
                .query(findBooksQuery, ResponseTypes.multipleInstancesOf(BookRestModel.class)).join();

        return books;
    }

    @GetMapping("/{id}")
    public BookRestModel findBookByIdQuery(@PathVariable String id){
        FindBookByIdQuery findBookByIdQuery = new FindBookByIdQuery();
        findBookByIdQuery.set_id(id);
        BookRestModel book = queryGateway
                .query(findBookByIdQuery, ResponseTypes.instanceOf(BookRestModel.class)).join();

        return book;
    }
}
