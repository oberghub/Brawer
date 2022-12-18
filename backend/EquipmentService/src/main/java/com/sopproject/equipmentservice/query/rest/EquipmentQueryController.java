package com.sopproject.equipmentservice.query.rest;

import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/equipments")
public class EquipmentQueryController {
    @Autowired
    private QueryGateway queryGateway;

    @GetMapping("all")
    public List<EquipmentRestModel> findEquipmentsQuery(){
        EquipmentQuery findEquipmentsQuery = new EquipmentQuery();
        List<EquipmentRestModel> Equipments = queryGateway
                .query(findEquipmentsQuery, ResponseTypes.multipleInstancesOf(EquipmentRestModel.class)).join();

        return Equipments;
    }
}
