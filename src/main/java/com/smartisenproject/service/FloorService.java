package com.smartisenproject.service;

import com.smartisenproject.domain.Floor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Floor.
 */
public interface FloorService {

    /**
     * Save a floor.
     *
     * @param floor the entity to save
     * @return the persisted entity
     */
    Floor save(Floor floor);

    /**
     * Get all the floors.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Floor> findAll(Pageable pageable);

    /**
     * Get the "id" floor.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Floor findOne(Long id);

    /**
     * Delete the "id" floor.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
