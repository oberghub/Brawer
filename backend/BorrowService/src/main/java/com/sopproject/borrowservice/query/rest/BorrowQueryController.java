package com.sopproject.borrowservice.query.rest;

import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/borrow")
public class BorrowQueryController {
    @Autowired
    private QueryGateway queryGateway;

    @GetMapping("all")
    public List<BorrowRestModel> findBorrowQuery(){
        FindBorrowQuery findBorrowQuery = new FindBorrowQuery();
        List<BorrowRestModel> borrows = queryGateway
                .query(findBorrowQuery, ResponseTypes.multipleInstancesOf(BorrowRestModel.class)).join();

        return borrows;
    }
}
