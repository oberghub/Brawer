package com.sopproject.equipmentservice.command;

import com.sopproject.equipmentservice.command.rest.CreateEquipmentCommand;
import com.sopproject.equipmentservice.command.rest.EquipmentRestModel;
import com.sopproject.equipmentservice.command.rest.DeleteEquipmentCommand;
import com.sopproject.equipmentservice.command.rest.UpdateEquipmentCommand;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public String deleteEquipment(@PathVariable String id){
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
}

