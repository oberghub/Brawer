package com.sopproject.equipmentservice.query;

import com.sopproject.equipmentservice.core.EquipmentEntity;
import com.sopproject.equipmentservice.core.data.EquipmentRepository;
import com.sopproject.equipmentservice.core.event.EquipmentCreatedEvent;
import com.sopproject.equipmentservice.core.event.EquipmentDeletedEvent;
import com.sopproject.equipmentservice.core.event.EquipmentUpdatedEvent;
import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class EquipmentEventHandler {

    private final EquipmentRepository equipmentRepository;

    public EquipmentEventHandler(EquipmentRepository equipmentRepository) {
        this.equipmentRepository = equipmentRepository;
    }

    @EventHandler
    public void on(EquipmentCreatedEvent event){
        EquipmentEntity equipmentEntity = new EquipmentEntity();
        BeanUtils.copyProperties(event, equipmentEntity);
        equipmentRepository.save(equipmentEntity);
    }
    @EventHandler
    public void on(EquipmentUpdatedEvent event){
        EquipmentEntity equipmentEntity = new EquipmentEntity();
        BeanUtils.copyProperties(event, equipmentEntity);
        equipmentRepository.save(equipmentEntity);
    }
    @EventHandler
    public void on(EquipmentDeletedEvent event){
        equipmentRepository.deleteById(event.get_id());
    }

}
