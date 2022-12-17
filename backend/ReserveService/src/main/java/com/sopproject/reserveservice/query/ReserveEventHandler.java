package com.sopproject.reserveservice.query;

import com.sopproject.reserveservice.core.ReserveEntity;
import com.sopproject.reserveservice.core.data.ReserveRepository;
import com.sopproject.reserveservice.core.event.ReserveCreatedEvent;
import com.sopproject.reserveservice.core.event.ReserveDeletedEvent;
import com.sopproject.reserveservice.core.event.ReserveUpdatedEvent;
import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class ReserveEventHandler {

    private final ReserveRepository reserveRepository;

    public ReserveEventHandler(ReserveRepository reserveRepository) {
        this.reserveRepository = reserveRepository;
    }

    @EventHandler
    public void on(ReserveCreatedEvent event){
        ReserveEntity reserveEntity = new ReserveEntity();
        BeanUtils.copyProperties(event, reserveEntity);
        reserveRepository.save(reserveEntity);
    }
    @EventHandler
    public void on(ReserveUpdatedEvent event){
        ReserveEntity reserveEntity = new ReserveEntity();
        BeanUtils.copyProperties(event, reserveEntity);
        reserveRepository.save(reserveEntity);
    }
    @EventHandler
    public void on(ReserveDeletedEvent event){
        reserveRepository.deleteById(event.get_id());
    }

}
