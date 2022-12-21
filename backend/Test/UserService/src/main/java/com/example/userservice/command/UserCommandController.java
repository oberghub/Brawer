package com.example.userservice.command;

import com.example.userservice.command.rest.CreateUserCommand;
import com.example.userservice.command.rest.DeleteUserCommand;
import com.example.userservice.command.rest.UpdateUserCommand;
import com.example.userservice.command.rest.UserRestModel;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/user")
public class UserCommandController {
    private final CommandGateway commandGateway;

    @Autowired
    public UserCommandController(CommandGateway commandGateway) {
        this.commandGateway = commandGateway;
    }

    @PostMapping
    public String createUser(@RequestBody UserRestModel model) {
        CreateUserCommand command = CreateUserCommand.builder()
                ._id(new ObjectId().toString())
                .role(model.getRole())
                .name(model.getName())
                .email(model.getEmail())
                .favouriteBooks(new ArrayList<>())
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
    public String updateUser(@RequestBody UserRestModel model) {
        UpdateUserCommand command = UpdateUserCommand.builder()
                ._id(model.get_id())
                .role(model.getRole())
                .name(model.getName())
                .email(model.getEmail())
                .favouriteBooks(model.getFavouriteBooks())
                .build();

        String result;
        try {
            result = commandGateway.sendAndWait(command);
            return "Updated User " +result;
        } catch (Exception e) {
            return e.getLocalizedMessage();
        }
    }
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable String id){
        DeleteUserCommand command = DeleteUserCommand.builder()
                ._id(id)
                .build();

        String result;
        try {
            result = commandGateway.sendAndWait(command);
            return "Deleted User " +result;
        } catch (Exception e) {
            return e.getLocalizedMessage();
        }
    }


}

