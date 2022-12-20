package com.sopproject.equipmentservice.core;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.math.BigDecimal;

@Data
@Document("equipments")
public class EquipmentEntity implements Serializable {
    @Id
    private String _id;
    private String name;
    private String desc;
    private int quantity;
    private BigDecimal price;

}
