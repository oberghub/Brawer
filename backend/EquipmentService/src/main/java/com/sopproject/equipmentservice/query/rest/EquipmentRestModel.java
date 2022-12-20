package com.sopproject.equipmentservice.query.rest;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class EquipmentRestModel {
    private String _id;
    private String name;
    private String desc;
    private int quantity;
    private BigDecimal price;
}
