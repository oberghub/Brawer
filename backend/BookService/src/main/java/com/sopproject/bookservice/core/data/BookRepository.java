package com.sopproject.bookservice.core.data;

import com.sopproject.bookservice.core.BookEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends MongoRepository<BookEntity, String> {
    @Query("{_id:'?0'}")
    BookEntity findByBookId(String _id);
}
