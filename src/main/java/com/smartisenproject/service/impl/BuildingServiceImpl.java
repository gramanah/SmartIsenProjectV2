package com.smartisenproject.service.impl;

import com.smartisenproject.service.BuildingService;
import com.smartisenproject.domain.Building;
import com.smartisenproject.repository.BuildingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Building.
 */
@Service
@Transactional
public class BuildingServiceImpl implements BuildingService {

    private final Logger log = LoggerFactory.getLogger(BuildingServiceImpl.class);

    private final BuildingRepository buildingRepository;

    public BuildingServiceImpl(BuildingRepository buildingRepository) {
        this.buildingRepository = buildingRepository;
    }

    /**
     * Save a building.
     *
     * @param building the entity to save
     * @return the persisted entity
     */
    @Override
    public Building save(Building building) {
        log.debug("Request to save Building : {}", building);
        return buildingRepository.save(building);
    }

    /**
     * Get all the buildings.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Building> findAll(Pageable pageable) {
        log.debug("Request to get all Buildings");
        return buildingRepository.findAll(pageable);
    }

    /**
     * Get one building by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Building findOne(Long id) {
        log.debug("Request to get Building : {}", id);
        return buildingRepository.findOne(id);
    }

    /**
     * Delete the building by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Building : {}", id);
        buildingRepository.delete(id);
    }
}
