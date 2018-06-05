package com.smartisenproject.service.impl;

import com.smartisenproject.service.BrightnessService;
import com.smartisenproject.domain.Brightness;
import com.smartisenproject.repository.BrightnessRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Brightness.
 */
@Service
@Transactional
public class BrightnessServiceImpl implements BrightnessService {

    private final Logger log = LoggerFactory.getLogger(BrightnessServiceImpl.class);

    private final BrightnessRepository brightnessRepository;

    public BrightnessServiceImpl(BrightnessRepository brightnessRepository) {
        this.brightnessRepository = brightnessRepository;
    }

    /**
     * Save a brightness.
     *
     * @param brightness the entity to save
     * @return the persisted entity
     */
    @Override
    public Brightness save(Brightness brightness) {
        log.debug("Request to save Brightness : {}", brightness);
        return brightnessRepository.save(brightness);
    }

    /**
     * Get all the brightnesses.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Brightness> findAll(Pageable pageable) {
        log.debug("Request to get all Brightnesses");
        return brightnessRepository.findAll(pageable);
    }

    /**
     * Get one brightness by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Brightness findOne(Long id) {
        log.debug("Request to get Brightness : {}", id);
        return brightnessRepository.findOne(id);
    }

    /**
     * Delete the brightness by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Brightness : {}", id);
        brightnessRepository.delete(id);
    }
}
