package com.sopproject.equipmentservice.query;

import com.sopproject.equipmentservice.core.EquipmentEntity;
import com.sopproject.equipmentservice.core.data.EquipmentRepository;
import com.sopproject.equipmentservice.core.event.*;
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
    public void on(EquipmentIncreasedEvent event){
        EquipmentEntity equipmentEntity = new EquipmentEntity();
        EquipmentEntity increased = equipmentRepository.findEquipmentById(event.get_id());
        increased.setQuantity(increased.getQuantity() + event.getQuantity());
        BeanUtils.copyProperties(increased, equipmentEntity);
        equipmentRepository.save(equipmentEntity);
    }

    @EventHandler
    public void on(EquipmentDecreasedEvent event){
        EquipmentEntity equipmentEntity = new EquipmentEntity();
        EquipmentEntity decreased = equipmentRepository.findEquipmentById(event.get_id());
        decreased.setQuantity(decreased.getQuantity() - event.getQuantity());
        BeanUtils.copyProperties(decreased, equipmentEntity);
        equipmentRepository.save(equipmentEntity);
    }
    @EventHandler
    public void on(EquipmentDeletedEvent event){
        equipmentRepository.deleteById(event.get_id());
    }

}
