package com.sopproject.borrowservice.BorrowService.query.rest;

import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/borrows")
public class BorrowQueryController {
    @Autowired
    private QueryGateway queryGateway;

    @GetMapping("all")
    public List<BorrowRestModel> findBooksQuery(){
        FindBorrowQuery findBooksQuery = new FindBorrowQuery();
        List<BorrowRestModel> borrows = queryGateway
                .query(findBooksQuery, ResponseTypes.multipleInstancesOf(BorrowRestModel.class)).join();

        return borrows;
    }
}
