package com.sopproject.reserveservice.command;

import com.sopproject.reserveservice.command.rest.CreateReserveCommand;
import com.sopproject.reserveservice.command.rest.DeleteReserveCommand;
import com.sopproject.reserveservice.command.rest.ReserveRestModel;
import com.sopproject.reserveservice.command.rest.UpdateReserveCommand;
import com.sopproject.reserveservice.core.ReserveEntity;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.bson.types.ObjectId;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

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
        ReserveEntity entity = new ReserveEntity();
        BeanUtils.copyProperties(command, entity);
        String result;
        try {
            Object rabbit = rabbitTemplate.convertSendAndReceive("ReserveExchange", "reserve", entity);
            System.out.println(rabbit);
            if (!(boolean)rabbit){
                return "Rabbitmq Create Reserve Error";
            }
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

        ReserveEntity entity = new ReserveEntity();
        BeanUtils.copyProperties(command, entity);
        String result;
        try {
            if(model.getStatus().equals("CANCELLED") || model.getStatus().equals("TIMEOUT")){
                Object rabbit = rabbitTemplate.convertSendAndReceive("ReserveExchange", "cancel", entity);
                System.out.println(rabbit);
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

    //    cron every hour = "0 0 * ? * *"
//    cron every minute = "0 * * ? * *"
    @Scheduled(cron = "0 * * ? * *")
    public void onHourPast() {
        System.out.println("Doing cron job");
        List<ReserveRestModel> reserveRestModelList = WebClient.create()
                .get()
                .uri("http://localhost:8082/reserve-service/reserve/all")
                .retrieve()
                .bodyToFlux(ReserveRestModel.class)
                .collectList()
                .block();
//        System.out.println(reserveRestModelList);
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        for (ReserveRestModel reserveRestModel : reserveRestModelList) {
            LocalDateTime reserveTo = LocalDateTime.parse(reserveRestModel.getReserveTo(), formatter);
            if (!reserveRestModel.getStatus().equals("TIMEOUT") &&
                    reserveTo.isBefore(LocalDateTime.of(now.getYear(), now.getMonth(), now.getDayOfMonth(), now.getHour(), now.getMinute(), now.getSecond()))) {
                reserveRestModel.setStatus("TIMEOUT");
                UpdateReserveCommand command = UpdateReserveCommand.builder()
                        ._id(reserveRestModel.get_id())
                        .userId(reserveRestModel.getUserId())
                        .roomId(reserveRestModel.getRoomId())
                        .equipmentsId(reserveRestModel.getEquipmentsId())
                        .reserveFrom(reserveRestModel.getReserveFrom())
                        .reserveTo(reserveRestModel.getReserveTo())
                        .timestamp(reserveRestModel.getTimestamp())
                        .status(reserveRestModel.getStatus())
                        .build();
                String result;
                try {
                    result = commandGateway.sendAndWait(command);
                    System.out.println("Updated Reserve Status" +result);
                } catch (Exception e) {
                    System.out.println(e.getLocalizedMessage());;
                }

            }
        }

    }
}

