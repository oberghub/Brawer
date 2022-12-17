package com.sopproject.reserveservice.command;

import com.sopproject.reserveservice.command.rest.CreateReserveCommand;
import com.sopproject.reserveservice.command.rest.DeleteReserveCommand;
import com.sopproject.reserveservice.command.rest.ReserveRestModel;
import com.sopproject.reserveservice.command.rest.UpdateReserveCommand;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reserve")
public class ReserveCommandController {
    private final CommandGateway commandGateway;

    @Autowired
    public ReserveCommandController(CommandGateway commandGateway) {
        this.commandGateway = commandGateway;
    }

    @PostMapping
    public String createReserve(@RequestBody ReserveRestModel model) {
        CreateReserveCommand command = CreateReserveCommand.builder()
                ._id(new ObjectId().toString())
                .userId(model.getUserId())
                .roomId(model.getRoomId())
                .equipmentsId(model.getEquipmentsId())
                .reserveForm(model.getReserveForm())
                .reserveTo(model.getReserveTo())
                .timestamp(model.getTimestamp())
                .status(model.getStatus())
                .build();
        String result;
        try {
            result = commandGateway.sendAndWait(command);
            return "Created Reserve " + result;
        } catch (Exception e) {
            return e.getLocalizedMessage();
        }
    }

    @PutMapping
    public String updateReserve(@RequestBody ReserveRestModel model) {
        UpdateReserveCommand command = UpdateReserveCommand.builder()
                ._id(model.get_id())
                .userId(model.getUserId())
                .roomId(model.getRoomId())
                .equipmentsId(model.getEquipmentsId())
                .reserveForm(model.getReserveForm())
                .reserveTo(model.getReserveTo())
                .timestamp(model.getTimestamp())
                .status(model.getStatus())
                .build();

        String result;
        try {
            result = commandGateway.sendAndWait(command);
            return "Updated Reserve " +result;
        } catch (Exception e) {
            return e.getLocalizedMessage();
        }
    }
    @DeleteMapping
    public String deleteReserve(@RequestBody ReserveRestModel model){
        DeleteReserveCommand command = DeleteReserveCommand.builder()
                ._id(model.get_id())
                .build();

        String result;
        try {
            result = commandGateway.sendAndWait(command);
            return "Deleted Reserve " +result;
        } catch (Exception e) {
            return e.getLocalizedMessage();
        }
    }
}

