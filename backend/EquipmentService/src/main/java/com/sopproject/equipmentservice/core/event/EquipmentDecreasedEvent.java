package com.sopproject.equipmentservice.core.event;

import lombok.Data;

@Data
public class EquipmentDecreasedEvent {
    private String _id;
    private int quantity;
}
