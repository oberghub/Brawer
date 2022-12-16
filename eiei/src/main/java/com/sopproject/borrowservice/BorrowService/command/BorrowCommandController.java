package com.sopproject.borrowservice.BorrowService.command;

import com.sopproject.borrowservice.BorrowService.command.rest.BorrowRestModel;
import com.sopproject.borrowservice.BorrowService.command.rest.CreateBorrowCommand;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/borrow")
public class BorrowCommandController {
    @Autowired
    private CommandGateway commandGateway;

    @PostMapping
    public String createBookBorrow(@RequestBody BorrowRestModel model){
        CreateBorrowCommand command = CreateBorrowCommand.builder()
                ._id(new ObjectId().toString())
                .status(model.getStatus())
                .borrow_date(model.getBorrow_date())
                .due_date(model.getDue_date())
                .late(model.isLate())
                .userId(model.getUserId())
                .booksId(model.getBooksId())
                .build();
        String result;
        try {
            result = commandGateway.sendAndWait(command);
            return result;
        } catch (Exception e) {
            return e.getLocalizedMessage();
        }
    }
//    @PutMapping
//    public String updateBorrowState(@RequestBody)
}
