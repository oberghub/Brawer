package com.sopproject.workspaceservice.query;

import com.sopproject.workspaceservice.core.WorkspaceEntity;
import com.sopproject.workspaceservice.core.data.WorkspaceRepository;
import com.sopproject.workspaceservice.core.event.WorkspaceCreatedEvent;
import com.sopproject.workspaceservice.core.event.WorkspaceDeletedEvent;
import com.sopproject.workspaceservice.core.event.WorkspaceUpdatedEvent;
import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class WorkspaceEventHandler {

    private final WorkspaceRepository workspaceRepository;

    public WorkspaceEventHandler(WorkspaceRepository workspaceRepository) {
        this.workspaceRepository = workspaceRepository;
    }

    @EventHandler
    public void on(WorkspaceCreatedEvent event){
        WorkspaceEntity workspaceEntity = new WorkspaceEntity();
        BeanUtils.copyProperties(event, workspaceEntity);
        workspaceRepository.save(workspaceEntity);
    }
    @EventHandler
    public void on(WorkspaceUpdatedEvent event){
        WorkspaceEntity workspaceEntity = new WorkspaceEntity();
        BeanUtils.copyProperties(event, workspaceEntity);
        workspaceRepository.save(workspaceEntity);
    }
    @EventHandler
    public void on(WorkspaceDeletedEvent event){
        workspaceRepository.deleteById(event.get_id());
    }

}
