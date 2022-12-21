package com.sopproject.equipmentservice.command;

import com.sopproject.equipmentservice.command.rest.*;
import com.sopproject.equipmentservice.core.ReserveRestModel;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.bson.types.ObjectId;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.Set;

@RestController
@RequestMapping("/equipment")
public class EquipmentCommandController {
    private final CommandGateway commandGateway;

    @Autowired
    public EquipmentCommandController(CommandGateway commandGateway) {
        this.commandGateway = commandGateway;
    }

    @PostMapping
    public String createEquipment(@RequestBody EquipmentRestModel model) {
        CreateEquipmentCommand command = CreateEquipmentCommand.builder()
                ._id(new ObjectId().toString())
                .name(model.getName())
                .desc(model.getDesc())
                .price(model.getPrice())
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
    public String updateEquipment(@RequestBody EquipmentRestModel model) {
        UpdateEquipmentCommand command = UpdateEquipmentCommand.builder()
                ._id(model.get_id())
                .name(model.getName())
                .desc(model.getDesc())
                .price(model.getPrice())
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
    public String deleteEquipment(@PathVariable String id) {
        DeleteEquipmentCommand command = DeleteEquipmentCommand.builder()
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

    @RabbitListener(queues = "onReserveWorkspace")
    public boolean onReserveWorkspace(ReserveRestModel model) {
        System.out.println("onReserveWorkspace " + model.getEquipmentsId());
        Set<String> ids = new LinkedHashSet<>(model.getEquipmentsId());
        boolean isDone = false;
        for (String id : ids) {
            int decrease = Collections.frequency(model.getEquipmentsId(), id);
//            EquipmentRestModel equipmentRestModel = WebClient.create()
//                    .get()
//                    .uri("http://localhost:8082/equipment-service/equipment/" + id)
//                    .retrieve()
//                    .bodyToMono(EquipmentRestModel.class)
//                    .block();

            QtyDecreaseCommand command = QtyDecreaseCommand.builder()
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

    @RabbitListener(queues = "onCancelReserve")
    public boolean onCancelReserve(ReserveRestModel model) {
        System.out.println("onCancelReserve " + model.getEquipmentsId());
        Set<String> ids = new LinkedHashSet<>(model.getEquipmentsId());
        boolean isDone = false;
        for (String id : ids) {
            int increase = Collections.frequency(model.getEquipmentsId(), id);
//            EquipmentRestModel equipmentRestModel = WebClient.create()
//                    .get()
//                    .uri("http://localhost:8082/equipment-service/equipment/" + id)
//                    .retrieve()
//                    .bodyToMono(EquipmentRestModel.class)
//                    .block();

            QtyIncreaseCommand command = QtyIncreaseCommand.builder()
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
}

