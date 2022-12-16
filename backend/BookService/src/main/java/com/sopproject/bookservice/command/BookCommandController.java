package com.sopproject.bookservice.command;

import com.sopproject.bookservice.command.rest.CreateBookCommand;
import com.sopproject.bookservice.command.rest.BookRestModel;
import com.sopproject.bookservice.command.rest.DeleteBookCommand;
import com.sopproject.bookservice.command.rest.UpdateBookCommand;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/books")
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
    @DeleteMapping
    public String deleteBook(@RequestBody BookRestModel model){
        DeleteBookCommand command = DeleteBookCommand.builder()
                ._id(model.get_id())
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
