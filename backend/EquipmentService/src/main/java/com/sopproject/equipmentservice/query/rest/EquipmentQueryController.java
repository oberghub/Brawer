package com.sopproject.equipmentservice.query.rest;

import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/equipment")
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

    @GetMapping("/{id}")
    public EquipmentRestModel findWorkspaceById(@PathVariable String id){
        FindEquipmentByIdQuery findEquipmentByIdQuery = new FindEquipmentByIdQuery();
        findEquipmentByIdQuery.setId(id);
        EquipmentRestModel equipment = queryGateway
                .query(findEquipmentByIdQuery, ResponseTypes.instanceOf(EquipmentRestModel.class)).join();

        return equipment;
    }

    @GetMapping("/ids/{ids}")
    public List<EquipmentRestModel> findEquipmentsByIdsQuery(@PathVariable("ids") List<String> idList){
        FindEquimentsByIdsQuery findEquimentsByIdsQuery = new FindEquimentsByIdsQuery();
        findEquimentsByIdsQuery.setIdList(idList);
        List<EquipmentRestModel> models = queryGateway
                .query(findEquimentsByIdsQuery, ResponseTypes.multipleInstancesOf(EquipmentRestModel.class)).join();
        return models;
    }
}
