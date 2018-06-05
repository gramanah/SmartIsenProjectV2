package com.smartisenproject.service;

import com.smartisenproject.domain.Brightness;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Brightness.
 */
public interface BrightnessService {

    /**
     * Save a brightness.
     *
     * @param brightness the entity to save
     * @return the persisted entity
     */
    Brightness save(Brightness brightness);

    /**
     * Get all the brightnesses.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Brightness> findAll(Pageable pageable);

    /**
     * Get the "id" brightness.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Brightness findOne(Long id);

    /**
     * Delete the "id" brightness.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
