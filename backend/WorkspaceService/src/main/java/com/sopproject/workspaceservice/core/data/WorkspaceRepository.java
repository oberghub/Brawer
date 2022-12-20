package com.sopproject.workspaceservice.core.data;

import com.sopproject.workspaceservice.core.WorkspaceEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkspaceRepository extends MongoRepository<WorkspaceEntity, String> {
    @Query("{room_type:'?0'}")
    WorkspaceEntity findByWorkspaceRoom_type(String room_type);

    @Query("{_id: '?0'}")
    WorkspaceEntity findWorkspaceById(String _id);
}
