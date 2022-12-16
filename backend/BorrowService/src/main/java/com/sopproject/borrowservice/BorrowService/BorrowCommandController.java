package com.sopproject.borrowservice.BorrowService;

import com.sopproject.borrowservice.BorrowService.command.rest.CreateBorrowCommand;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/borrow")
public class BorrowCommandController {
    @Autowired
    private CommandGateway commandGateway;

    @PostMapping
    public String createBookBorrow(@RequestBody CreateBorrowCommand model){
        return "Hi";
    }
//    @PutMapping
//    public String updateBorrowState(@RequestBody)
}
