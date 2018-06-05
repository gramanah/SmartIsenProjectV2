package com.smartisenproject.service.impl;

import com.smartisenproject.service.TemperatureService;
import com.smartisenproject.domain.Temperature;
import com.smartisenproject.repository.TemperatureRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Temperature.
 */
@Service
@Transactional
public class TemperatureServiceImpl implements TemperatureService {

    private final Logger log = LoggerFactory.getLogger(TemperatureServiceImpl.class);

    private final TemperatureRepository temperatureRepository;

    public TemperatureServiceImpl(TemperatureRepository temperatureRepository) {
        this.temperatureRepository = temperatureRepository;
    }

    /**
     * Save a temperature.
     *
     * @param temperature the entity to save
     * @return the persisted entity
     */
    @Override
    public Temperature save(Temperature temperature) {
        log.debug("Request to save Temperature : {}", temperature);
        return temperatureRepository.save(temperature);
    }

    /**
     * Get all the temperatures.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Temperature> findAll(Pageable pageable) {
        log.debug("Request to get all Temperatures");
        return temperatureRepository.findAll(pageable);
    }

    /**
     * Get one temperature by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Temperature findOne(Long id) {
        log.debug("Request to get Temperature : {}", id);
        return temperatureRepository.findOne(id);
    }

    /**
     * Delete the temperature by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Temperature : {}", id);
        temperatureRepository.delete(id);
    }
}
