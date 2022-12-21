package com.sopproject.bookservice.command;

import com.sopproject.bookservice.command.rest.*;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.bson.types.ObjectId;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/book")
public class BookCommandController {
    private final CommandGateway commandGateway;

    @Autowired
    public BookCommandController(CommandGateway commandGateway) {
        this.commandGateway = commandGateway;
    }

    @PostMapping
    public String createBook(@RequestBody BookRestModel model) {
        CreateBookCommand command = CreateBookCommand.builder()
                ._id(new ObjectId().toString())
                .title(model.getTitle())
                .desc(model.getDesc())
                .quantity(model.getQuantity())
                .language(model.getLanguage())
                .image(model.getImage())
                .authors(model.getAuthors())
                .genres(model.getGenres())
                .image(model.getImage())
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
    public String updateBook(@RequestBody BookRestModel model) {
        UpdateBookCommand command = UpdateBookCommand.builder()
                ._id(model.get_id())
                .title(model.getTitle())
                .desc(model.getDesc())
                .quantity(model.getQuantity())
                .language(model.getLanguage())
                .image(model.getImage())
                .authors(model.getAuthors())
                .genres(model.getGenres())
                .image(model.getImage())
                .build();

        String result;
        try {
            result = commandGateway.sendAndWait(command);
            return result;
        } catch (Exception e) {
            return e.getLocalizedMessage();
        }
    }

    @DeleteMapping("/{id}")
    public String deleteBook(@PathVariable String id) {
        DeleteBookCommand command = DeleteBookCommand.builder()
                ._id(id)
                .build();

        String result;
        try {
            result = commandGateway.sendAndWait(command);
            return result;
        } catch (Exception e) {
            return e.getLocalizedMessage();
        }
    }

    @RabbitListener(queues = "onReturnBook")
    public boolean onReturnBook(List<String> books) {
        Set<String> ids = new LinkedHashSet<>(books);
        boolean isDone = false;
        for (String id : ids) {
            int increase = Collections.frequency(books, id);
            BookRestModel model = WebClient.create()
                    .get()
                    .uri("http://localhost:8082/book-service/book/" + id)
                    .retrieve()
                    .bodyToMono(BookRestModel.class)
                    .block();

            ReturnBookCommand command = ReturnBookCommand.builder()
                    ._id(id)
                    .quantity(increase)
                    .build();
            try {
                String result = commandGateway.sendAndWait(command);
                System.out.println(result);
                isDone = true;
            } catch (Exception e) {
                e.printStackTrace();
                isDone = false;
            }
        }
        return isDone;
    }

    @RabbitListener(queues = "onBorrowBook")
    public boolean onBorrowBook(List<String> books) {
        Set<String> ids = new LinkedHashSet<>(books);
        boolean isDone = false;
        for (String id : ids) {
            int decrease = Collections.frequency(books, id);
            BookRestModel model = WebClient.create()
                    .get()
                    .uri("http://localhost:8082/book-service/book/" + id)
                    .retrieve()
                    .bodyToMono(BookRestModel.class)
                    .block();

            BorrowBookCommand command = BorrowBookCommand.builder()
                    ._id(id)
                    .quantity(decrease)
                    .build();
            try {
                String result = commandGateway.sendAndWait(command);
                System.out.println(result);
                isDone = true;
            } catch (Exception e) {
                e.printStackTrace();
                isDone = false;
            }
        }
        return isDone;
    }
}

