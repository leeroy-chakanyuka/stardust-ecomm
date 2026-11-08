package stardust.shop.controller;

import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import stardust.shop.service.CategoryService;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

class CategoryControllerTest {

    private final CategoryService service = mock(CategoryService.class);
    private final CategoryController controller = new CategoryController(service);

    @Test
    void getCategoriesUsesRequestedPaginationAndDescendingSort() {
        when(service.getAll(any(Pageable.class))).thenReturn(List.of());

        var response = controller.getCategories(2, 25, "name", "DESC");

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(List.of(), response.getBody());
        ArgumentCaptor<Pageable> argument = ArgumentCaptor.forClass(Pageable.class);
        verify(service).getAll(argument.capture());
        Pageable pageable = argument.getValue();
        assertEquals(2, pageable.getPageNumber());
        assertEquals(25, pageable.getPageSize());
        assertEquals(Sort.Direction.DESC, pageable.getSort().getOrderFor("name").getDirection());
    }

    @Test
    void defaultParametersUseFirstPageAndAscendingUuid() {
        when(service.getAll(any(Pageable.class))).thenReturn(List.of());

        controller.getCategories(0, 10, "uuid", "asc");

        ArgumentCaptor<Pageable> argument = ArgumentCaptor.forClass(Pageable.class);
        verify(service).getAll(argument.capture());
        Pageable pageable = argument.getValue();
        assertEquals(0, pageable.getPageNumber());
        assertEquals(10, pageable.getPageSize());
        assertEquals(Sort.Direction.ASC, pageable.getSort().getOrderFor("uuid").getDirection());
    }

    @Test
    void rejectsNegativePageNumber() {
        assertBadRequest("pageNo", -1, 10, "uuid", "asc");
    }

    @Test
    void rejectsZeroAndNegativePageSizes() {
        assertBadRequest("pageSize", 0, 0, "uuid", "asc");
        assertBadRequest("pageSize", 0, -1, "uuid", "asc");
    }

    @Test
    void rejectsPageSizeAboveLimit() {
        assertBadRequest("pageSize", 0, 101, "uuid", "asc");
    }

    @Test
    void allowsMaximumPageSize() {
        when(service.getAll(any(Pageable.class))).thenReturn(List.of());

        controller.getCategories(0, 100, "uuid", "asc");

        ArgumentCaptor<Pageable> argument = ArgumentCaptor.forClass(Pageable.class);
        verify(service).getAll(argument.capture());
        assertEquals(100, argument.getValue().getPageSize());
    }

    @Test
    void rejectsUnsupportedOrBlankSortField() {
        assertBadRequest("sortBy", 0, 10, "nonexistent", "asc");
        assertBadRequest("sortBy", 0, 10, "", "asc");
        assertBadRequest("sortBy", 0, 10, null, "asc");
    }

    @Test
    void rejectsUnsupportedOrBlankSortDirection() {
        assertBadRequest("sortOrder", 0, 10, "uuid", "sideways");
        assertBadRequest("sortOrder", 0, 10, "uuid", "");
        assertBadRequest("sortOrder", 0, 10, "uuid", null);
    }

    private void assertBadRequest(String field, int pageNo, int pageSize,
                                  String sortBy, String sortOrder) {
        ResponseStatusException error = assertThrows(ResponseStatusException.class,
            () -> controller.getCategories(pageNo, pageSize, sortBy, sortOrder));
        assertEquals(HttpStatus.BAD_REQUEST, error.getStatusCode());
        assertTrue(error.getReason().contains(field));
        verifyNoInteractions(service);
    }
}
