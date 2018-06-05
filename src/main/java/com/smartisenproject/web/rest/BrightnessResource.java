package com.smartisenproject.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.smartisenproject.domain.Brightness;
import com.smartisenproject.service.BrightnessService;
import com.smartisenproject.web.rest.errors.BadRequestAlertException;
import com.smartisenproject.web.rest.util.HeaderUtil;
import com.smartisenproject.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Brightness.
 */
@RestController
@RequestMapping("/api")
public class BrightnessResource {

    private final Logger log = LoggerFactory.getLogger(BrightnessResource.class);

    private static final String ENTITY_NAME = "brightness";

    private final BrightnessService brightnessService;

    public BrightnessResource(BrightnessService brightnessService) {
        this.brightnessService = brightnessService;
    }

    /**
     * POST  /brightnesses : Create a new brightness.
     *
     * @param brightness the brightness to create
     * @return the ResponseEntity with status 201 (Created) and with body the new brightness, or with status 400 (Bad Request) if the brightness has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/brightnesses")
    @Timed
    public ResponseEntity<Brightness> createBrightness(@RequestBody Brightness brightness) throws URISyntaxException {
        log.debug("REST request to save Brightness : {}", brightness);
        if (brightness.getId() != null) {
            throw new BadRequestAlertException("A new brightness cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Brightness result = brightnessService.save(brightness);
        return ResponseEntity.created(new URI("/api/brightnesses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /brightnesses : Updates an existing brightness.
     *
     * @param brightness the brightness to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated brightness,
     * or with status 400 (Bad Request) if the brightness is not valid,
     * or with status 500 (Internal Server Error) if the brightness couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/brightnesses")
    @Timed
    public ResponseEntity<Brightness> updateBrightness(@RequestBody Brightness brightness) throws URISyntaxException {
        log.debug("REST request to update Brightness : {}", brightness);
        if (brightness.getId() == null) {
            return createBrightness(brightness);
        }
        Brightness result = brightnessService.save(brightness);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, brightness.getId().toString()))
            .body(result);
    }

    /**
     * GET  /brightnesses : get all the brightnesses.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of brightnesses in body
     */
    @GetMapping("/brightnesses")
    @Timed
    public ResponseEntity<List<Brightness>> getAllBrightnesses(Pageable pageable) {
        log.debug("REST request to get a page of Brightnesses");
        Page<Brightness> page = brightnessService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/brightnesses");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /brightnesses/:id : get the "id" brightness.
     *
     * @param id the id of the brightness to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the brightness, or with status 404 (Not Found)
     */
    @GetMapping("/brightnesses/{id}")
    @Timed
    public ResponseEntity<Brightness> getBrightness(@PathVariable Long id) {
        log.debug("REST request to get Brightness : {}", id);
        Brightness brightness = brightnessService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(brightness));
    }

    /**
     * DELETE  /brightnesses/:id : delete the "id" brightness.
     *
     * @param id the id of the brightness to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/brightnesses/{id}")
    @Timed
    public ResponseEntity<Void> deleteBrightness(@PathVariable Long id) {
        log.debug("REST request to delete Brightness : {}", id);
        brightnessService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
