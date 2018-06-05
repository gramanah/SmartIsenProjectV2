package com.smartisenproject.service;

import com.smartisenproject.domain.Temperature;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Temperature.
 */
public interface TemperatureService {

    /**
     * Save a temperature.
     *
     * @param temperature the entity to save
     * @return the persisted entity
     */
    Temperature save(Temperature temperature);

    /**
     * Get all the temperatures.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Temperature> findAll(Pageable pageable);

    /**
     * Get the "id" temperature.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Temperature findOne(Long id);

    /**
     * Delete the "id" temperature.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
