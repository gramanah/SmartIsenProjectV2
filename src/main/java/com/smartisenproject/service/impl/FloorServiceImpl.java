package com.smartisenproject.service.impl;

import com.smartisenproject.service.FloorService;
import com.smartisenproject.domain.Floor;
import com.smartisenproject.repository.FloorRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Floor.
 */
@Service
@Transactional
public class FloorServiceImpl implements FloorService {

    private final Logger log = LoggerFactory.getLogger(FloorServiceImpl.class);

    private final FloorRepository floorRepository;

    public FloorServiceImpl(FloorRepository floorRepository) {
        this.floorRepository = floorRepository;
    }

    /**
     * Save a floor.
     *
     * @param floor the entity to save
     * @return the persisted entity
     */
    @Override
    public Floor save(Floor floor) {
        log.debug("Request to save Floor : {}", floor);
        return floorRepository.save(floor);
    }

    /**
     * Get all the floors.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Floor> findAll(Pageable pageable) {
        log.debug("Request to get all Floors");
        return floorRepository.findAll(pageable);
    }

    /**
     * Get one floor by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Floor findOne(Long id) {
        log.debug("Request to get Floor : {}", id);
        return floorRepository.findOne(id);
    }

    /**
     * Delete the floor by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Floor : {}", id);
        floorRepository.delete(id);
    }
}
