package com.sopproject.equipmentservice.command.rest;

import lombok.Data;

@Data
public class EquipmentRestModel {
    private String _id;
    private String name;
    private String desc;
    private Integer price;
}
