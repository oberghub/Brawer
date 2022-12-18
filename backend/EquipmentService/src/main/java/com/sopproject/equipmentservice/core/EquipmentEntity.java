package com.sopproject.equipmentservice.core;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.List;

@Data
@Document("equipments")
public class EquipmentEntity implements Serializable {
    @Id
    private String _id;
    private String name;
    private String desc;
    private Integer price;

}
