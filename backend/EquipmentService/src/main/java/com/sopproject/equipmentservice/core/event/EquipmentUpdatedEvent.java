package com.sopproject.equipmentservice.core.event;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class EquipmentUpdatedEvent {
    private String _id;
    private String name;
    private String desc;
    private int quantity;
    private BigDecimal price;
}
