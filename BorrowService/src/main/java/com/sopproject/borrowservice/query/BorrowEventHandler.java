package com.sopproject.borrowservice.query;

import com.sopproject.borrowservice.core.event.BorrowCreatedEvent;
import com.sopproject.borrowservice.core.BorrowEntity;
import com.sopproject.borrowservice.core.data.BorrowRepository;
import com.sopproject.borrowservice.core.event.BorrowUpdatedEvent;
import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class BorrowEventHandler {
    private final BorrowRepository borrowRepository;
    public BorrowEventHandler(BorrowRepository borrowRepository){
        this.borrowRepository = borrowRepository;
    }

    @EventHandler
    public void on(BorrowCreatedEvent event){
        BorrowEntity borrowEntity = new BorrowEntity();
        BeanUtils.copyProperties(event, borrowEntity);
        borrowRepository.save(borrowEntity);
        System.out.println("กูมาแล้ว ฮะฮ่า!");
    }

    @EventHandler
    public void on(BorrowUpdatedEvent event){
        BorrowEntity borrowEntity = new BorrowEntity();
        BeanUtils.copyProperties(event, borrowEntity);
        borrowRepository.save(borrowEntity);
    }
}
