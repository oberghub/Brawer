package com.sopproject.borrowservice.command;

import com.sopproject.borrowservice.command.rest.BorrowRestModel;
import com.sopproject.borrowservice.command.rest.CreateBorrowCommand;
import com.sopproject.borrowservice.command.rest.UpdateBorrowCommand;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/borrow")
public class BorrowCommandController {
    private CommandGateway commandGateway;

    @Autowired
    private BorrowCommandController(CommandGateway commandGateway) {
        this.commandGateway = commandGateway;
    }

    @PostMapping
    public String createBookBorrow(@RequestBody BorrowRestModel model) {
        List<String> booksId = new ArrayList<>();
        for (String bookId: model.getBooksId()) {
            booksId.add(bookId);
        }
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

    @PutMapping
    public String updateBorrowState(@RequestBody BorrowRestModel model) {
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



//    cron every day = 0 0 0 * * ?
//    cron every minute = "0 * * ? * *"
    @Scheduled(cron = "0 * * ? * *")
    public void onDayPast() {
        System.out.println("Doing cron job");
        List<BorrowRestModel> borrowRestModelList = WebClient.create()
                .get()
                .uri("http://localhost:8082/borrow-service/borrow/all")
                .retrieve()
                .bodyToFlux(BorrowRestModel.class)
                .collectList()
                .block();

        LocalDate now = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        for (BorrowRestModel borrowRestModel : borrowRestModelList) {
            LocalDate dueDate = LocalDate.parse(borrowRestModel.getDue_date(), formatter);
            if (!borrowRestModel.getStatus().equals("RETURNED") &&
                    !borrowRestModel.isLate() &&
                    dueDate.isBefore(LocalDate.of(now.getYear(), now.getMonth(), now.getDayOfMonth()))) {
                borrowRestModel.setLate(true);
                UpdateBorrowCommand command = UpdateBorrowCommand.builder()
                        ._id(borrowRestModel.get_id())
                        .status(borrowRestModel.getStatus())
                        .borrow_date(borrowRestModel.getBorrow_date())
                        .due_date(borrowRestModel.getDue_date())
                        .late(borrowRestModel.isLate())
                        .userId(borrowRestModel.getUserId())
                        .booksId(borrowRestModel.getBooksId())
                        .build();
                String result;
                try {
                    result = commandGateway.sendAndWait(command);
                    System.out.println("Updated Borrow Status" +result);
                } catch (Exception e) {
                    System.out.println(e.getLocalizedMessage());;
                }

            }
        }

    }
}
