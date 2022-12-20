package com.sopproject.equipmentservice.core.event;

import lombok.Data;

@Data
public class EquipmentIncreasedEvent {
    private String _id;
    private int quantity;
}
