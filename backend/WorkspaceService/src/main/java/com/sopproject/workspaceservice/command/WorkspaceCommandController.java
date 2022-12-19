package com.sopproject.workspaceservice.command;

import com.sopproject.workspaceservice.command.rest.*;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.bson.types.ObjectId;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/workspaces")
public class WorkspaceCommandController {
    private final CommandGateway commandGateway;

    @Autowired
    public WorkspaceCommandController(CommandGateway commandGateway) {
        this.commandGateway = commandGateway;
    }

    @PostMapping
    public String createWorkspace(@RequestBody WorkspaceRestModel model) {
        CreateWorkspaceCommand command = CreateWorkspaceCommand.builder()
                ._id(new ObjectId().toString())
                .room_type(model.getRoom_type())
                .room_name(model.getRoom_name())
                .room_capacity(model.getRoom_capacity())
                .desc(model.getDesc())
                .price(model.getPrice())
                .status(model.getStatus())
                .time_rent(model.getTime_rent())
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
    public String updateWorkspace(@RequestBody WorkspaceRestModel model) {
        UpdateWorkspaceCommand command = UpdateWorkspaceCommand.builder()
                ._id(model.get_id())
                .room_type(model.getRoom_type())
                .room_name(model.getRoom_name())
                .room_capacity(model.getRoom_capacity())
                .desc(model.getDesc())
                .price(model.getPrice())
                .status(model.getStatus())
                .time_rent(model.getTime_rent())
                .build();
        String result;
        try {
            result = commandGateway.sendAndWait(command);
            return result;
        } catch (Exception e) {
            return e.getLocalizedMessage();
        }
    }

    @RabbitListener(queues = "onReserveWorkspace")
    public boolean onReserveWorkspace(String roomId) {
        SetWorkspaceStatusCommand command = SetWorkspaceStatusCommand.builder()
                ._id(roomId)
                .status("RESERVED")
                .build();
        String result;
        try {
            result = commandGateway.sendAndWait(command);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    @DeleteMapping("/{id}")
    public String deleteWorkspace(@PathVariable String id){
        DeleteWorkspaceCommand command = DeleteWorkspaceCommand.builder()
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
}

