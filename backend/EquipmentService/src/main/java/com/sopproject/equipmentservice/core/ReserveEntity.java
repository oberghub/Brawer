package com.sopproject.equipmentservice.core;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class ReserveEntity implements Serializable {
    private String _id;
    private String userId;
    private String roomId;
    private List<String> equipmentsId;
    private String timestamp;
    private String reserveFrom;
    private String reserveTo;
    private String status;

}
