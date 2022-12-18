package com.sopproject.equipmentservice.query.rest;

import lombok.Data;

import java.util.List;

@Data
public class EquipmentRestModel {
    private String _id;
    private String name;
    private String desc;
    private Integer price;
}
