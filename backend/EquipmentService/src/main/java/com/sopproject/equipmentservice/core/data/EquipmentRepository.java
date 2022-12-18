package com.sopproject.equipmentservice.core.data;

import com.sopproject.equipmentservice.core.EquipmentEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EquipmentRepository extends MongoRepository<EquipmentEntity, String> {
    @Query("{name:'?0'}")
    EquipmentEntity findByName(String name);
    @Query("{EquipmentId:'?0'}")
    EquipmentEntity findByEquipmentId(String EquipmentId);
}
