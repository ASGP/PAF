package com.example.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.server.entity.Status;
public interface StatusRepository extends JpaRepository<Status,Integer>{

}
