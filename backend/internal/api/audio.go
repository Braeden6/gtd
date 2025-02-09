package api

import (
	"fmt"
	"io"
	"net/http"

	"github.com/braeden6/gtd/internal/service"
	"github.com/labstack/echo/v4"
)

type AudioHandler struct {
	audioService *service.AudioService
}

func NewAudioHandler(audioService *service.AudioService) *AudioHandler {
	return &AudioHandler{
		audioService: audioService,
	}
}

func (h *AudioHandler) RegisterRoutes(g *echo.Group) {
	audio := g.Group("/audio")
	audio.GET("/:id/stream", h.StreamAudio)
	audio.POST("/upload", h.UploadAudio)
}

// StreamAudio godoc
// @Summary Stream audio by ID
// @Description Stream audio by ID
// @Tags audio
// @Accept json
// @Produce audio/mpeg
// @Param id path string true "Audio ID"
// @Success 200 {file} file
// @Router /audio/{id}/stream [get]
func (h *AudioHandler) StreamAudio(c echo.Context) error {
	id := c.Param("id")

	stream, err := h.audioService.StreamAudio(c.Request().Context(), id)
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "Audio not found")
	}
	defer stream.Close()
	c.Response().Header().Set("Content-Type", "audio/mpeg")
	c.Response().Header().Set("Transfer-Encoding", "chunked")
	_, err = io.Copy(c.Response().Writer, stream)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, fmt.Sprintf("Streaming error: %v", err))
	}

	return nil
}

// UploadAudio godoc
// @Summary Upload an audio file
// @Description Upload a new audio file
// @Tags audio
// @Accept multipart/form-data
// @Produce json
// @Param file formData file true "Audio file"
// @Success 200 {object} map[string]string
// @Router /audio/upload [post]
func (h *AudioHandler) UploadAudio(c echo.Context) error {
	// Get the file from the request
	file, err := c.FormFile("file")
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Failed to get file from request")
	}

	// Open the uploaded file
	src, err := file.Open()
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to open uploaded file")
	}
	defer src.Close()

	// Pass to service layer to handle storage
	id, err := h.audioService.UploadAudio(c.Request().Context(), src, file.Filename)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, fmt.Sprintf("Failed to save audio: %v", err))
	}

	return c.JSON(http.StatusOK, map[string]string{
		"id":      id,
		"message": "Audio uploaded successfully",
	})
}
