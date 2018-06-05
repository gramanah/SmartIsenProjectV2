package com.smartisenproject.web.rest;

import com.smartisenproject.SmartIsenProjectV2App;

import com.smartisenproject.domain.Room;
import com.smartisenproject.repository.RoomRepository;
import com.smartisenproject.service.RoomService;
import com.smartisenproject.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.smartisenproject.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the RoomResource REST controller.
 *
 * @see RoomResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SmartIsenProjectV2App.class)
public class RoomResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    private static final Boolean DEFAULT_WINDOWS = false;
    private static final Boolean UPDATED_WINDOWS = true;

    private static final Boolean DEFAULT_DOOR = false;
    private static final Boolean UPDATED_DOOR = true;

    private static final Boolean DEFAULT_HEATER = false;
    private static final Boolean UPDATED_HEATER = true;

    private static final Boolean DEFAULT_LIGHT = false;
    private static final Boolean UPDATED_LIGHT = true;

    private static final Boolean DEFAULT_PRESENCE = false;
    private static final Boolean UPDATED_PRESENCE = true;

    private static final Float DEFAULT_GLOBAL_TEMPERATURE = 1F;
    private static final Float UPDATED_GLOBAL_TEMPERATURE = 2F;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private RoomService roomService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRoomMockMvc;

    private Room room;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RoomResource roomResource = new RoomResource(roomService);
        this.restRoomMockMvc = MockMvcBuilders.standaloneSetup(roomResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Room createEntity(EntityManager em) {
        Room room = new Room()
            .name(DEFAULT_NAME)
            .active(DEFAULT_ACTIVE)
            .windows(DEFAULT_WINDOWS)
            .door(DEFAULT_DOOR)
            .heater(DEFAULT_HEATER)
            .light(DEFAULT_LIGHT)
            .presence(DEFAULT_PRESENCE)
            .globalTemperature(DEFAULT_GLOBAL_TEMPERATURE);
        return room;
    }

    @Before
    public void initTest() {
        room = createEntity(em);
    }

    @Test
    @Transactional
    public void createRoom() throws Exception {
        int databaseSizeBeforeCreate = roomRepository.findAll().size();

        // Create the Room
        restRoomMockMvc.perform(post("/api/rooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(room)))
            .andExpect(status().isCreated());

        // Validate the Room in the database
        List<Room> roomList = roomRepository.findAll();
        assertThat(roomList).hasSize(databaseSizeBeforeCreate + 1);
        Room testRoom = roomList.get(roomList.size() - 1);
        assertThat(testRoom.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testRoom.isActive()).isEqualTo(DEFAULT_ACTIVE);
        assertThat(testRoom.isWindows()).isEqualTo(DEFAULT_WINDOWS);
        assertThat(testRoom.isDoor()).isEqualTo(DEFAULT_DOOR);
        assertThat(testRoom.isHeater()).isEqualTo(DEFAULT_HEATER);
        assertThat(testRoom.isLight()).isEqualTo(DEFAULT_LIGHT);
        assertThat(testRoom.isPresence()).isEqualTo(DEFAULT_PRESENCE);
        assertThat(testRoom.getGlobalTemperature()).isEqualTo(DEFAULT_GLOBAL_TEMPERATURE);
    }

    @Test
    @Transactional
    public void createRoomWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = roomRepository.findAll().size();

        // Create the Room with an existing ID
        room.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRoomMockMvc.perform(post("/api/rooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(room)))
            .andExpect(status().isBadRequest());

        // Validate the Room in the database
        List<Room> roomList = roomRepository.findAll();
        assertThat(roomList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRooms() throws Exception {
        // Initialize the database
        roomRepository.saveAndFlush(room);

        // Get all the roomList
        restRoomMockMvc.perform(get("/api/rooms?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(room.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].windows").value(hasItem(DEFAULT_WINDOWS.booleanValue())))
            .andExpect(jsonPath("$.[*].door").value(hasItem(DEFAULT_DOOR.booleanValue())))
            .andExpect(jsonPath("$.[*].heater").value(hasItem(DEFAULT_HEATER.booleanValue())))
            .andExpect(jsonPath("$.[*].light").value(hasItem(DEFAULT_LIGHT.booleanValue())))
            .andExpect(jsonPath("$.[*].presence").value(hasItem(DEFAULT_PRESENCE.booleanValue())))
            .andExpect(jsonPath("$.[*].globalTemperature").value(hasItem(DEFAULT_GLOBAL_TEMPERATURE.doubleValue())));
    }

    @Test
    @Transactional
    public void getRoom() throws Exception {
        // Initialize the database
        roomRepository.saveAndFlush(room);

        // Get the room
        restRoomMockMvc.perform(get("/api/rooms/{id}", room.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(room.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.windows").value(DEFAULT_WINDOWS.booleanValue()))
            .andExpect(jsonPath("$.door").value(DEFAULT_DOOR.booleanValue()))
            .andExpect(jsonPath("$.heater").value(DEFAULT_HEATER.booleanValue()))
            .andExpect(jsonPath("$.light").value(DEFAULT_LIGHT.booleanValue()))
            .andExpect(jsonPath("$.presence").value(DEFAULT_PRESENCE.booleanValue()))
            .andExpect(jsonPath("$.globalTemperature").value(DEFAULT_GLOBAL_TEMPERATURE.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRoom() throws Exception {
        // Get the room
        restRoomMockMvc.perform(get("/api/rooms/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRoom() throws Exception {
        // Initialize the database
        roomService.save(room);

        int databaseSizeBeforeUpdate = roomRepository.findAll().size();

        // Update the room
        Room updatedRoom = roomRepository.findOne(room.getId());
        // Disconnect from session so that the updates on updatedRoom are not directly saved in db
        em.detach(updatedRoom);
        updatedRoom
            .name(UPDATED_NAME)
            .active(UPDATED_ACTIVE)
            .windows(UPDATED_WINDOWS)
            .door(UPDATED_DOOR)
            .heater(UPDATED_HEATER)
            .light(UPDATED_LIGHT)
            .presence(UPDATED_PRESENCE)
            .globalTemperature(UPDATED_GLOBAL_TEMPERATURE);

        restRoomMockMvc.perform(put("/api/rooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRoom)))
            .andExpect(status().isOk());

        // Validate the Room in the database
        List<Room> roomList = roomRepository.findAll();
        assertThat(roomList).hasSize(databaseSizeBeforeUpdate);
        Room testRoom = roomList.get(roomList.size() - 1);
        assertThat(testRoom.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testRoom.isActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testRoom.isWindows()).isEqualTo(UPDATED_WINDOWS);
        assertThat(testRoom.isDoor()).isEqualTo(UPDATED_DOOR);
        assertThat(testRoom.isHeater()).isEqualTo(UPDATED_HEATER);
        assertThat(testRoom.isLight()).isEqualTo(UPDATED_LIGHT);
        assertThat(testRoom.isPresence()).isEqualTo(UPDATED_PRESENCE);
        assertThat(testRoom.getGlobalTemperature()).isEqualTo(UPDATED_GLOBAL_TEMPERATURE);
    }

    @Test
    @Transactional
    public void updateNonExistingRoom() throws Exception {
        int databaseSizeBeforeUpdate = roomRepository.findAll().size();

        // Create the Room

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRoomMockMvc.perform(put("/api/rooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(room)))
            .andExpect(status().isCreated());

        // Validate the Room in the database
        List<Room> roomList = roomRepository.findAll();
        assertThat(roomList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRoom() throws Exception {
        // Initialize the database
        roomService.save(room);

        int databaseSizeBeforeDelete = roomRepository.findAll().size();

        // Get the room
        restRoomMockMvc.perform(delete("/api/rooms/{id}", room.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Room> roomList = roomRepository.findAll();
        assertThat(roomList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Room.class);
        Room room1 = new Room();
        room1.setId(1L);
        Room room2 = new Room();
        room2.setId(room1.getId());
        assertThat(room1).isEqualTo(room2);
        room2.setId(2L);
        assertThat(room1).isNotEqualTo(room2);
        room1.setId(null);
        assertThat(room1).isNotEqualTo(room2);
    }
}
