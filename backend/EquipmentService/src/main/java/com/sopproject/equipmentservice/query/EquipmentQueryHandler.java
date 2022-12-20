package com.sopproject.equipmentservice.query;

import com.sopproject.equipmentservice.core.EquipmentEntity;
import com.sopproject.equipmentservice.core.data.EquipmentRepository;
import com.sopproject.equipmentservice.query.rest.EquipmentQuery;
import com.sopproject.equipmentservice.query.rest.EquipmentRestModel;
import com.sopproject.equipmentservice.query.rest.FindEquipmentByIdQuery;
import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EquipmentQueryHandler {

    private final EquipmentRepository equipmentRepository;
    public EquipmentQueryHandler(EquipmentRepository equipmentRepository) {
        this.equipmentRepository = equipmentRepository;
    }

    @QueryHandler
    List<EquipmentRestModel> findEquipments(EquipmentQuery query){
        List<EquipmentRestModel> equipmentRestModels = new ArrayList<>();
        List<EquipmentEntity> storedEquipments = equipmentRepository.findAll();
        for (EquipmentEntity equipmentEntity : storedEquipments){
            EquipmentRestModel equipmentRestModel = new EquipmentRestModel();
            BeanUtils.copyProperties(equipmentEntity, equipmentRestModel);
            equipmentRestModels.add(equipmentRestModel);
        }
        return equipmentRestModels;
    }

    @QueryHandler
    EquipmentRestModel findEquipmentById(FindEquipmentByIdQuery query){
        EquipmentRestModel equipmentRestModel = new EquipmentRestModel();
        EquipmentEntity equipment = equipmentRepository.findEquipmentById(query.getId());
        BeanUtils.copyProperties(equipment, equipmentRestModel);

        return equipmentRestModel;
    }
}
