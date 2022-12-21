package com.sopproject.workspaceservice.command;

import com.sopproject.workspaceservice.command.rest.CreateWorkspaceCommand;
import com.sopproject.workspaceservice.command.rest.DeleteWorkspaceCommand;
import com.sopproject.workspaceservice.command.rest.UpdateWorkspaceCommand;
import com.sopproject.workspaceservice.command.rest.WorkspaceRestModel;
import com.sopproject.workspaceservice.core.ReserveRestModel;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.bson.types.ObjectId;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

@RestController
@RequestMapping("/workspace")
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
    public boolean onReserveWorkspace(ReserveRestModel model) {
        System.out.println("onReserveWorkspace " + model.getRoomId());
        WorkspaceRestModel workspaceRestModel = WebClient.create()
                .get()
                .uri("http://localhost:8082/workspace-service/workspaces/" + model.getRoomId())
                .retrieve()
                .bodyToMono(WorkspaceRestModel.class)
                .block();

        UpdateWorkspaceCommand command = UpdateWorkspaceCommand.builder()
                ._id(workspaceRestModel.get_id())
                .room_type(workspaceRestModel.getRoom_type())
                .room_name(workspaceRestModel.getRoom_name())
                .room_capacity(workspaceRestModel.getRoom_capacity())
                .desc(workspaceRestModel.getDesc())
                .price(workspaceRestModel.getPrice())
                .status("RESERVED")
                .time_rent(workspaceRestModel.getTime_rent())
                .build();

        String result;
        try {
            result = commandGateway.sendAndWait(command);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    @RabbitListener(queues = "onCancelReserve")
    public boolean onCancelReserve(ReserveRestModel model) {
        System.out.println("onCancelReserve " + model.getRoomId());
        WorkspaceRestModel workspaceRestModel = WebClient.create()
                .get()
                .uri("http://localhost:8082/workspace-service/workspaces/" + model.getRoomId())
                .retrieve()
                .bodyToMono(WorkspaceRestModel.class)
                .block();

        UpdateWorkspaceCommand command = UpdateWorkspaceCommand.builder()
                ._id(workspaceRestModel.get_id())
                .room_type(workspaceRestModel.getRoom_type())
                .room_name(workspaceRestModel.getRoom_name())
                .room_capacity(workspaceRestModel.getRoom_capacity())
                .desc(workspaceRestModel.getDesc())
                .price(workspaceRestModel.getPrice())
                .status("AVAILABLE")
                .time_rent(workspaceRestModel.getTime_rent())
                .build();

        String result;
        try {
            result = commandGateway.sendAndWait(command);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @DeleteMapping("/{id}")
    public String deleteWorkspace(@PathVariable String id) {
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

