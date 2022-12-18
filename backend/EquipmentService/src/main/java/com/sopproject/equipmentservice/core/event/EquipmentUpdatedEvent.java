package com.sopproject.equipmentservice.core.event;

import lombok.Data;

import java.util.List;

@Data
public class EquipmentUpdatedEvent {
    private String _id;
    private String name;
    private String desc;
    private Integer price;
}
