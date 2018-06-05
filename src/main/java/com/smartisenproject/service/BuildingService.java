package com.smartisenproject.service;

import com.smartisenproject.domain.Building;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Building.
 */
public interface BuildingService {

    /**
     * Save a building.
     *
     * @param building the entity to save
     * @return the persisted entity
     */
    Building save(Building building);

    /**
     * Get all the buildings.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Building> findAll(Pageable pageable);

    /**
     * Get the "id" building.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Building findOne(Long id);

    /**
     * Delete the "id" building.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
