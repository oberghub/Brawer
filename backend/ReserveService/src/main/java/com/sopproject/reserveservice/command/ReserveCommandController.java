package com.sopproject.reserveservice.command;

import com.sopproject.reserveservice.command.rest.CreateReserveCommand;
import com.sopproject.reserveservice.command.rest.DeleteReserveCommand;
import com.sopproject.reserveservice.command.rest.ReserveRestModel;
import com.sopproject.reserveservice.command.rest.UpdateReserveCommand;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.bson.types.ObjectId;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reserve")
public class ReserveCommandController {
    private final CommandGateway commandGateway;

    @Autowired
    private RabbitTemplate rabbitTemplate;

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
                .reserveFrom(model.getReserveFrom())
                .reserveTo(model.getReserveTo())
                .timestamp(model.getTimestamp())
                .status(model.getStatus())
                .build();

        String result;
        try {
//            Object rabbit = rabbitTemplate.convertSendAndReceive("ReserveExchange", "reserve", model.getRoomId());
//            if (!(boolean)rabbit){
//                return "Rabbitmq Create Reserve Error";
//            }
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
                .reserveFrom(model.getReserveFrom())
                .reserveTo(model.getReserveTo())
                .timestamp(model.getTimestamp())
                .status(model.getStatus())
                .build();

        String result;
        try {
            if(model.getStatus().equals("CANCELLED") || model.getStatus().equals("TIMEOUT")){
                Object rabbit = rabbitTemplate.convertSendAndReceive("ReserveExchange", "cancel", model.getRoomId());
                if (!(boolean)rabbit){
                    return "Rabbitmq Cancel Reserve Error";
                }
            }
            result = commandGateway.sendAndWait(command);
            return "Updated Reserve " +result;
        } catch (Exception e) {
            return e.getLocalizedMessage();
        }
    }
    @DeleteMapping("/{id}")
    public String deleteReserve(@PathVariable String id){
        DeleteReserveCommand command = DeleteReserveCommand.builder()
                ._id(id)
                .build();

        String result;
        try {
            result = commandGateway.sendAndWait(command);
            return "Deleted Reserve " +id;
        } catch (Exception e) {
            return e.getLocalizedMessage();
        }
    }
}

