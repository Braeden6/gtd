package api

import (
	"net/http"

	"github.com/braeden6/gtd/internal/domain"
	"github.com/braeden6/gtd/internal/service"
	"github.com/labstack/echo/v4"
)

type InboxHandler struct {
	service *service.InboxService
}

func NewInboxHandler(service *service.InboxService) *InboxHandler {
	return &InboxHandler{service: service}
}

func (h *InboxHandler) RegisterRoutes(g *echo.Group) {
	inbox := g.Group("/inbox")
	inbox.POST("", h.Create)
	inbox.GET("", h.List)
	inbox.GET("/:id", h.GetByID)
	inbox.PUT("/:id", h.Update)
	inbox.DELETE("/:id", h.Delete)
}

// Create godoc
// @Summary Create inbox item
// @Description Create a new inbox item
// @Tags inbox
// @Accept json
// @Produce json
// @Param item body domain.InboxItem true "Inbox Item"
// @Success 201 {object} domain.InboxItem
// @Router /inbox [post]
func (h *InboxHandler) Create(c echo.Context) error {
	var item domain.InboxItem
	if err := c.Bind(&item); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	item.UserID = "40c8bdda-fc65-41d9-a29b-f5e4d2407dad"

	if err := h.service.CreateInboxItem(c.Request().Context(), &item); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusCreated, item)
}

// List godoc
// @Summary List inbox items
// @Description Get all inbox items for the user
// @Tags inbox
// @Accept json
// @Produce json
// @Success 200 {array} domain.InboxItem
// @Router /inbox [get]
func (h *InboxHandler) List(c echo.Context) error {
	// TODO: Get from auth context
	userID := "40c8bdda-fc65-41d9-a29b-f5e4d2407dad"

	items, err := h.service.ListInboxItems(c.Request().Context(), userID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, items)
}

// GetByID godoc
// @Summary Get inbox item by ID
// @Description Get a single inbox item by its ID
// @Tags inbox
// @Accept json
// @Produce json
// @Param id path string true "Inbox Item ID"
// @Success 200 {object} domain.InboxItem
// @Router /inbox/{id} [get]
func (h *InboxHandler) GetByID(c echo.Context) error {
	id := c.Param("id")

	item, err := h.service.GetInboxItem(c.Request().Context(), id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	if item == nil {
		return c.NoContent(http.StatusNotFound)
	}

	return c.JSON(http.StatusOK, item)
}

// Update godoc
// @Summary Update inbox item
// @Description Update an existing inbox item
// @Tags inbox
// @Accept json
// @Produce json
// @Param id path string true "Inbox Item ID"
// @Param item body domain.InboxItem true "Inbox Item"
// @Success 200 {object} domain.InboxItem
// @Router /inbox/{id} [put]
func (h *InboxHandler) Update(c echo.Context) error {
	id := c.Param("id")

	var item domain.InboxItem
	if err := c.Bind(&item); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}
	item.ID = id

	if err := h.service.UpdateInboxItem(c.Request().Context(), &item); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, item)
}

// Delete godoc
// @Summary Delete inbox item
// @Description Delete an inbox item
// @Tags inbox
// @Accept json
// @Produce json
// @Param id path string true "Inbox Item ID"
// @Success 204 "No Content"
// @Router /inbox/{id} [delete]
func (h *InboxHandler) Delete(c echo.Context) error {
	id := c.Param("id")

	if err := h.service.DeleteInboxItem(c.Request().Context(), id); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.NoContent(http.StatusNoContent)
}
