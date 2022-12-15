package com.sopproject.bookservice.command;

import com.sopproject.bookservice.command.rest.CreateBookCommand;
import com.sopproject.bookservice.command.rest.CreateBookRestModel;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/books")
public class BookCommandController {
    private final CommandGateway commandGateway;

    @Autowired
    public BookCommandController(CommandGateway commandGateway) {
        this.commandGateway = commandGateway;
    }

    @PostMapping
    public String createBooks(@RequestBody CreateBookRestModel model){
        CreateBookCommand command = CreateBookCommand.builder()
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
        try{
            result = commandGateway.sendAndWait(command);
            return result;
        }
        catch (Exception e){
            return e.getLocalizedMessage();
        }
    }
}

