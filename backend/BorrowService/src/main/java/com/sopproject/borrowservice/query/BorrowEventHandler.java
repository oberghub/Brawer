package com.sopproject.borrowservice.query;

import com.sopproject.borrowservice.core.event.BorrowCreatedEvent;
import com.sopproject.borrowservice.core.BorrowEntity;
import com.sopproject.borrowservice.core.data.BorrowRepository;
import com.sopproject.borrowservice.core.event.BorrowUpdatedEvent;
import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BorrowEventHandler {
    @Autowired
    private BorrowRepository borrowRepository;

    @EventHandler
    public void on(BorrowCreatedEvent event){
        BorrowEntity borrowEntity = new BorrowEntity();
        BeanUtils.copyProperties(event, borrowEntity);
        borrowRepository.save(borrowEntity);
    }

    @EventHandler
    public void on(BorrowUpdatedEvent event){
        BorrowEntity borrowEntity = new BorrowEntity();
        BeanUtils.copyProperties(event, borrowEntity);
        borrowRepository.save(borrowEntity);
    }
}
