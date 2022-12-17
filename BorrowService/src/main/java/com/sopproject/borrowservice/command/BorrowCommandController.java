package com.sopproject.borrowservice.command;

import com.sopproject.borrowservice.command.rest.BorrowRestModel;
import com.sopproject.borrowservice.command.rest.CreateBorrowCommand;
import com.sopproject.borrowservice.command.rest.UpdateBorrowCommand;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.bson.types.ObjectId;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/borrow")
public class BorrowCommandController {
    private final CommandGateway commandGateway;
    private BorrowCommandController(CommandGateway commandGateway){
        this.commandGateway = commandGateway;
    }

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
            System.out.println("กูมาแล้ว");
            return result;
        } catch (Exception e) {
            return e.getLocalizedMessage();
        }
    }

    @PutMapping
    public String updateBorrowState(@RequestBody BorrowRestModel model){
        UpdateBorrowCommand command = UpdateBorrowCommand.builder()
                ._id(model.get_id())
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
}
